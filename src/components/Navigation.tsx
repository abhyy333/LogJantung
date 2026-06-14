/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Sun, Moon, LogOut, Heart, User, Activity, BookOpen, HelpCircle, ClipboardList } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface NavigationProps {
  currentUser: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  profileName: string;
}

export default function Navigation({
  currentUser,
  activeTab,
  setActiveTab,
  onLogout,
  profileName
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'beranda', label: 'Beranda', icon: Heart },
    { id: 'tensi', label: 'Riwayat Tensi', icon: Activity },
    { id: 'edukasi', label: 'Edukasi', icon: BookOpen },
    { id: 'kuis', label: 'Kuis', icon: HelpCircle },
    { id: 'panduan', label: 'Panduan Diet', icon: ClipboardList },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <nav id="app-nav" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <Heart className="h-7 w-7 text-emerald-600 fill-emerald-500/20 animate-pulse" id="nav-brand-icon" />
            <span id="nav-brand-text" className="font-sans font-bold text-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 bg-clip-text text-transparent">
              LogJantung
            </span>
            <span className="hidden sm:inline-block bg-emerald-50 text-emerald-700 text-xs px-2.5 py-0.5 rounded-full font-bold border border-emerald-100">
              Modul Mandiri PJK
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-desktop-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100 font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {currentUser && (
              <>
                <div className="h-6 w-[1px] bg-slate-200 mx-2" />
                <div className="flex items-center space-x-2 pl-2">
                  <span className="text-xs font-semibold text-slate-600 max-w-[120px] truncate" id="nav-user-greeting">
                    {profileName || (currentUser.isAnonymous ? 'Tamu' : currentUser.email?.split('@')[0])}
                  </span>
                  <button
                    id="nav-logout-btn-desktop"
                    onClick={onLogout}
                    className="p-2 rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-mobile-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-750 font-bold border border-emerald-100'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          {currentUser && (
            <div className="pt-4 border-t border-slate-200 mt-2">
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-500">Masuk sebagai:</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">
                    {profileName || (currentUser.isAnonymous ? 'Tamu Jantung' : currentUser.email)}
                  </p>
                </div>
                <button
                  id="nav-logout-btn-mobile"
                  onClick={onLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-600 hover:bg-emerald-55 hover:text-emerald-700 text-sm font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
