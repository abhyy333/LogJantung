/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Heart, ShieldAlert, Activity, UserCheck, Mail, Lock, User, Key, ArrowRight } from 'lucide-react';

interface AuthProps {
  onSuccess: (mockUser?: any) => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Email Auth States
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err: any) {
      console.error("Google Authentication error:", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Proses login dibatalkan karena jendela pop-up ditutup.');
      } else {
        setErrorMsg(`Gagal masuk menggunakan Google Account: ${err.message || err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon lengkapi email dan kata sandi Anda.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal harus terdiri dari 6 karakter.');
      return;
    }
    if (isRegister && !name.trim()) {
      setErrorMsg('Mohon isi nama lengkap Anda untuk pendaftaran profil.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      if (isRegister) {
        // Register new user
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, {
          displayName: name.trim()
        });
        onSuccess();
      } else {
        // Login existing user
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess();
      }
    } catch (err: any) {
      console.error("Email Auth Error:", err);
      let friendlyMessage = 'Terjadi kesalahan sistem autentikasi.';
      switch (err.code) {
        case 'auth/invalid-email':
          friendlyMessage = 'Format alamat email tidak valid.';
          break;
        case 'auth/user-disabled':
          friendlyMessage = 'Akun ini telah dinonaktifkan oleh administrator.';
          break;
        case 'auth/user-not-found':
          friendlyMessage = 'Akun email tidak terdaftar. Silakan pilih tab "Daftar Baru" di bawah.';
          break;
        case 'auth/wrong-password':
          friendlyMessage = 'Kata sandi salah. Silakan periksa kembali.';
          break;
        case 'auth/email-already-in-use':
          friendlyMessage = 'Email ini sudah terdaftar. Silakan masuk menggunakan kata sandi Anda.';
          break;
        case 'auth/weak-password':
          friendlyMessage = 'Sandi terlalu lemah. Minimal 6 karakter.';
          break;
        case 'auth/invalid-credential':
        case 'auth/invalid-login-credentials':
          friendlyMessage = 'Kredensial salah atau email belum didaftarkan.';
          break;
        default:
          friendlyMessage = err.message || friendlyMessage;
      }
      setErrorMsg(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Direct local Guest Mode (completely reliable offline-friendly state)
      onSuccess({
        uid: 'guest_tamu_jantung',
        email: 'tamu.logjantung@gmail.com',
        isAnonymous: true,
        displayName: 'Tamu Jantung'
      });
    } catch (err: any) {
      console.error("Local Guest Mode error:", err);
      setErrorMsg('Gagal mengaktifkan mode tamu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md" id="auth-form-card">
        <div className={`bg-white shadow-lg rounded-3xl border transition-all duration-300 overflow-hidden ${
          isRegister ? 'border-emerald-200 ring-4 ring-emerald-500/5' : 'border-slate-200 ring-4 ring-slate-500/5'
        }`}>
          {/* Subtle Accent Bar */}
          <div className={`h-2 w-full transition-all duration-300 ${
            isRegister ? 'bg-emerald-500' : 'bg-slate-700'
          }`} />

          <div className="py-8 px-6 sm:px-8 space-y-6">
            {/* Minimal App Title */}
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                LogJantung
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                {isRegister ? 'Silakan buat akun pemantauan baru' : 'Masuk untuk mengelola kesehatan jantung'}
              </p>
            </div>

            {/* Visual Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl gap-1" id="auth-mode-switcher">
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setErrorMsg(null);
                }}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  !isRegister
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Key className={`h-3.5 w-3.5 ${!isRegister ? 'text-slate-700' : 'text-slate-400'}`} />
                <span>Masuk</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setErrorMsg(null);
                }}
                className={`py-2.5 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isRegister
                    ? 'bg-white text-emerald-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className={`h-3.5 w-3.5 ${isRegister ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>Daftar Akun</span>
              </button>
            </div>

            {errorMsg && (
              <div id="auth-error-alert" className="bg-rose-50 border border-rose-150 text-rose-900 p-3.5 rounded-xl text-xs flex items-start space-x-2.5 text-left">
                <ShieldAlert className="h-5 w-5 flex-shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-bold">Informasi</p>
                  <p className="text-rose-800 mt-0.5">{errorMsg}</p>
                </div>
              </div>
            )}

            {/* Email / Password Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-550 mb-1 uppercase tracking-wider">
                    Nama Lengkap
                  </label>
                  <div className="relative rounded-xl">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required={isRegister}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Hubert Cent"
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 text-slate-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs font-medium transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-slate-555 mb-1 uppercase tracking-wider">
                  Alamat Email
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className={`block w-full pl-9 pr-3 py-2.5 border border-slate-200 text-slate-850 rounded-xl focus:outline-none focus:ring-2 text-xs font-medium transition-all placeholder:text-slate-300 ${
                      isRegister ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-slate-700 focus:border-slate-750'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-555 mb-1 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <div className="relative rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`block w-full pl-9 pr-3 py-2.5 border border-slate-200 text-slate-850 rounded-xl focus:outline-none focus:ring-2 text-xs font-medium transition-all placeholder:text-slate-300 ${
                      isRegister ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-slate-700 focus:border-slate-750'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-sm active:scale-98 cursor-pointer disabled:opacity-50 ${
                  isRegister
                    ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
                    : 'bg-slate-800 hover:bg-slate-905 active:bg-black'
                }`}
              >
                {loading ? (
                  <span className="flex items-center space-x-1.5">
                    <Activity className="h-3.5 w-3.5 animate-spin" />
                    <span>Memproses...</span>
                  </span>
                ) : (
                  <>
                    <span>{isRegister ? 'Buat Akun' : 'Masuk'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Alternative Methods */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                id="auth-guest-btn"
                onClick={handleGuestLogin}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl border border-dashed border-slate-200 text-xs font-bold text-slate-500 hover:text-slate-800 hover:border-slate-350 transition-all cursor-pointer"
              >
                <span>Masuk Sementara sebagai Tamu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notification */}
        <div id="auth-security-notice" className="text-center mt-6 text-slate-400 text-[10px] leading-relaxed font-semibold">
          Data kesehatan dan rekam medis tensi darah Anda dilindungi secara privat.
        </div>
      </div>
    </div>
  );
}
