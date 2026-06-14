/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Activity, BookOpen, ClipboardList, TrendingUp, ShieldAlert, Award } from 'lucide-react';

interface LandingPageProps {
  onGoToTensi: () => void;
  onGoToEdukasi: () => void;
  onGoToDiet: () => void;
  onGoToKuis: () => void;
  profileName: string;
}

export default function LandingPage({
  onGoToTensi,
  onGoToEdukasi,
  onGoToDiet,
  onGoToKuis,
  profileName
 }: LandingPageProps) {
  return (
    <div className="space-y-10" id="landing-page-container">
      {/* Hero Section */}
      <div id="hero-section" className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-md border border-emerald-500/20">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10 pointer-events-none">
          <Heart className="w-80 h-80 stroke-[1.5]" />
        </div>

        <div className="relative max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Heart className="h-4 w-4 fill-white animate-pulse text-rose-300" />
            <span>Klinik Mandiri Kardio</span>
          </div>

          <h1 id="hero-title" className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight leading-tight">
            Selamat Datang, {profileName || 'Sobat Sehat'}!
          </h1>

          <p id="hero-subtitle" className="text-sm sm:text-lg text-emerald-50 opacity-95 leading-relaxed max-w-xl font-medium">
            Sistem pemantauan mandiri kardiovaskular khusus bagi penyintas Jantung Koroner. Catat tensi darah Anda secara harian, pelajari nutrisi ideal, dan uji pengetahuan Anda secara akurat.
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="cta-catat-tensi"
              onClick={onGoToTensi}
              className="px-6 py-3.5 bg-white text-emerald-700 font-bold rounded-xl shadow-md hover:bg-emerald-50 active:scale-98 transition-all font-sans text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Activity className="h-5 w-5 animate-pulse text-emerald-650" />
              <span>Catat Tensi Sekarang</span>
            </button>
            <button
              id="cta-pelajari-diet"
              onClick={onGoToDiet}
              className="px-6 py-3.5 bg-emerald-800/40 hover:bg-emerald-850/60 text-white font-bold rounded-xl border border-emerald-400/40 backdrop-blur-sm transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ClipboardList className="h-5 w-5" />
              <span>Panduan Makanan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div id="landing-features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-250 shadow-md hover:shadow-lg transition-all space-y-4">
          <div className="inline-flex p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-105">
            <Activity className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Pantau Tensi Rutin</h3>
          <p className="text-sm text-slate-705 leading-relaxed font-medium">
            Klasifikasi instan sesuai standar klinik (Hipertensi Derajat 1-3, Sistolik Terisolasi, hingga Normal) lengkap dengan penyimpanan histori cloud.
          </p>
          <button
            onClick={onGoToTensi}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>Buka Tracker &rarr;</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-250 shadow-md hover:shadow-lg transition-all space-y-4">
          <div className="inline-flex p-3 bg-emerald-55 rounded-xl text-emerald-650 border border-emerald-100">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Edukasi Lemak & Memasak</h3>
          <p className="text-sm text-slate-705 leading-relaxed font-medium">
            Menyajikan panduan ilmiah interaktif mengenai LDL, HDL, bahaya sirkulasi plak koroner, serta tips memasak sehat rendah garam harian.
          </p>
          <button
            onClick={onGoToEdukasi}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>Pelajari Materi &rarr;</span>
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-250 shadow-md hover:shadow-lg transition-all space-y-4">
          <div className="inline-flex p-3 bg-sky-50 rounded-xl text-sky-650 border border-sky-100">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Kuis Pengetahuan Jantung</h3>
          <p className="text-sm text-slate-705 leading-relaxed font-medium">
            Evaluasi pemahaman Anda lewat kuis 10 pertanyaan informatif mengenai asupan natrium dan pola hidup sehat jantung koroner.
          </p>
          <button
            onClick={onGoToKuis}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-bold flex items-center space-x-1 cursor-pointer"
          >
            <span>Mulai Kuis &rarr;</span>
          </button>
        </div>
      </div>

      {/* Cardio Medical Advice Notice Block */}
      <div id="disclaimer-banner" className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl flex items-start space-x-4">
        <ShieldAlert className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-sm text-amber-900">Catatan Medis Mandiri</h4>
          <p className="text-xs text-amber-800 leading-relaxed font-semibold">
            LogJantung adalah aplikasi edukatif pemantauan mandiri dan tidak menggantikan layanan diagnosis spesialis jantung profesional. Jika Anda merasakan keluhan nyeri dada kiri hebat yang menjalar ke lengan atau rahang secara mendadak disertai keringat dingin, segera hubungi nomor gawat darurat rumah sakit terdekat.
          </p>
        </div>
      </div>
    </div>
  );
}
