/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, ShieldAlert, Check, X, Filter } from 'lucide-react';
import { DIET_GUIDE_DATA } from '../data/education';

export default function DietGuide() {
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Makanan Pokok', 'Lauk Pauk', 'Sayur-mayur', 'Buah-buahan', 'Pelengkap', 'Camilan / Pengolah', 'Bumbu dapur', 'Minuman'];

  const filteredData = filterCategory === 'Semua' 
    ? DIET_GUIDE_DATA 
    : DIET_GUIDE_DATA.filter(item => item.category === filterCategory);

  const filterButtonClasses = (cat: string) => {
    const isSelected = filterCategory === cat;
    return `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
      isSelected 
        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
        : 'bg-white border-slate-300 text-slate-650 hover:bg-slate-100 hover:text-slate-800'
    }`;
  };

  return (
    <div className="space-y-6 animate-fade-in" id="diet-guide-standalone">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-800 flex items-center space-x-2">
          <ClipboardList className="h-7 w-7 text-emerald-500" />
          <span>Panduan Nutrisi Diet Kardiovaskular</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Daftar anjuran makanan pelindung pembuluh koroner dan larangan lemak jenuh/natrium berlebih.
        </p>
      </div>

      {/* Category filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-250 shadow-sm space-y-3">
        <div className="flex items-center space-x-1 text-xs font-extrabold uppercase tracking-widest text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Saring Berdasarkan Kategori Makanan:</span>
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              id={`filter-diet-button-${cat}`}
              onClick={() => setFilterCategory(cat)}
              className={filterButtonClasses(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Standalone Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Anjuran (Do's) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-250 shadow-md space-y-4">
          <h3 className="font-extrabold text-base text-emerald-700 flex items-center space-x-2 border-b border-slate-200 pb-3 uppercase tracking-wider">
            <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-emerald-50 text-emerald-700">
              <Check className="h-5 w-5 stroke-[2.5]" />
            </span>
            <span>Makanan diAnjurkan (Sangat Baik)</span>
          </h3>

          <div className="space-y-4">
            {filteredData.filter(item => item.status === 'Anjuran').length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Tidak ada makanan anjuran dalam kategori ini.</p>
            ) : (
              filteredData.filter(item => item.status === 'Anjuran').map((item, idx) => (
                <div key={idx} className="p-4 bg-emerald-50/30 rounded-xl border border-emerald-100 flex items-start space-x-3 hover:shadow-md transition-all">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900">{item.name}</span>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase border border-emerald-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">{item.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Larangan (Don'ts) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-250 shadow-md space-y-4">
          <h3 className="font-extrabold text-base text-red-750 flex items-center space-x-2 border-b border-slate-105 pb-3 uppercase tracking-wider">
            <span className="flex items-center justify-center h-7 w-7 rounded-lg bg-red-50 text-red-700">
              <X className="h-5 w-5 stroke-[2.5]" />
            </span>
            <span>Makanan diBatasi / diHindari (Bahaya)</span>
          </h3>

          <div className="space-y-4">
            {filteredData.filter(item => item.status === 'Larangan').length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Tidak ada makanan larangan dalam kategori ini.</p>
            ) : (
              filteredData.filter(item => item.status === 'Larangan').map((item, idx) => (
                <div key={idx} className="p-4 bg-red-50/30 rounded-xl border border-red-100 flex items-start space-x-3 hover:shadow-md transition-all">
                  <ShieldAlert className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="font-bold text-sm text-slate-900">{item.name}</span>
                      <span className="bg-red-100 text-red-800 font-bold text-[9px] px-2 py-0.5 rounded-md uppercase border border-red-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">{item.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
