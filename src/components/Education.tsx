/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, ShieldAlert, CheckCircle, CookingPot, Info, ClipboardList, Video, ExternalLink, Activity, Apple, HeartPulse, Droplet, Flame, Sparkles, HeartHandshake, ShieldCheck, AlertTriangle } from 'lucide-react';
import { PJK_CONTENT, CHOLESTEROL_CONTENT, COOKING_TIPS, DIET_GUIDE_DATA } from '../data/education';

interface EducationProps {
  initialSubTab?: string;
}

export default function Education({ initialSubTab = 'pjk' }: EducationProps) {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  React.useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  const tabs = [
    { id: 'pjk', label: 'Materi PJK', icon: BookOpen },
    { id: 'lemak', label: 'Edukasi Lemak', icon: Info },
    { id: 'diet', label: 'Panduan Diet', icon: ClipboardList },
    { id: 'memasak', label: 'Tips Memasak', icon: CookingPot },
    { id: 'video', label: 'Video Edukasi', icon: Video },
  ];

  return (
    <div className="space-y-6" id="education-container">
      {/* Education Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-800">
          Modul Edukasi Jantung Koroner
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Edukasi medis terverifikasi guna membantu pemulihan dan kualitas sirkulasi darah harian Anda.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex border-b border-slate-200 scrollbar-none overflow-x-auto gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`edu-tab-${tab.id}`}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-250 shadow-md transition-all duration-300">
        {/* Panel 1: PJK */}
        {activeSubTab === 'pjk' && (
          <div id="panel-pjk" className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900">{PJK_CONTENT.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold uppercase tracking-wider">{PJK_CONTENT.subtitle}</p>
            </div>

            {/* Content Points Grid & High Contrast Reminder Box */}
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PJK_CONTENT.content.map((paragraph, index) => {
                  // Choose dynamic icon highlight for each paragraph
                  const paragraphIcons = [Activity, AlertTriangle, ShieldCheck, HeartHandshake];
                  const ParaIcon = paragraphIcons[index] || BookOpen;

                  return (
                    <div
                      key={index}
                      className="p-5 bg-slate-50 hover:bg-slate-100/50 transition-colors rounded-2xl leading-relaxed text-xs sm:text-sm text-slate-700 border border-slate-150 flex flex-col justify-between space-y-3 shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="p-1.5 rounded-lg bg-emerald-100/60 text-emerald-800">
                            <ParaIcon className="h-4 w-4" />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Poin {index + 1}</span>
                        </div>
                        <p className="font-semibold leading-relaxed text-slate-800">{paragraph}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-emerald-900 leading-relaxed font-semibold shadow-sm">
                <div className="flex items-start space-x-3">
                  <HeartPulse className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h5 className="font-extrabold text-emerald-950 text-sm mb-0.5">Pantauan Mandiri</h5>
                    <p className="text-emerald-800 text-xs font-semibold">Aliran darah berkualitas dipengaruhi dari kedisplinan pencatatan tensi harian di rumah.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 2: Lemak LDL HDL */}
        {activeSubTab === 'lemak' && (
          <div id="panel-lemak" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900">{CHOLESTEROL_CONTENT.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold uppercase tracking-wider">{CHOLESTEROL_CONTENT.subtitle}</p>
            </div>

            {/* Minimal Food Lipid Banner */}
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 mt-4 space-y-1.5 shadow-sm">
              <span className="inline-block text-[9px] bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-sans">
                Informasi Lipid Sehat
              </span>
              <h4 className="text-md sm:text-base font-serif font-extrabold text-slate-900">
                Lemak Nabati Pelindung Jantung
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Alpukat, salmon, kacang kenari, dan minyak zaitun kaya akan Omega-3 & lemak tak jenuh yang aktif mendorong naik rasio kolesterol HDL.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {CHOLESTEROL_CONTENT.sections.map((section, idx) => {
                // Style sections dynamically based on typical lipid characteristics
                const isLDL = section.name.includes("LDL");
                const isHDL = section.name.includes("HDL");
                
                const cardStyle = isLDL
                  ? "bg-rose-50/40 border-rose-150 shadow-rose-100/50 ring-rose-500/5"
                  : isHDL
                    ? "bg-emerald-50/40 border-emerald-150 shadow-emerald-100/50 ring-emerald-500/5"
                    : "bg-slate-50/60 border-slate-150 shadow-slate-100/50";

                const textBadgeStyle = isLDL
                  ? "bg-rose-100 text-rose-800"
                  : isHDL
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-200 text-slate-800";

                const targetBadgeStyle = isLDL
                  ? "bg-rose-50 border-rose-200 text-rose-900"
                  : isHDL
                    ? "bg-emerald-50 border-emerald-250 text-emerald-900"
                    : "bg-slate-100 border-slate-250 text-slate-800";

                const SectionIcon = isLDL
                  ? AlertTriangle
                  : isHDL
                    ? ShieldCheck
                    : Activity;

                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${cardStyle}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className={`p-1.5 rounded-lg ${textBadgeStyle}`}>
                          <SectionIcon className="h-4.5 w-4.5" />
                        </span>
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {isLDL ? "Kolesterol LDL" : isHDL ? "Kolesterol HDL" : "Trigliserida & Total"}
                        </h4>
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="font-extrabold text-slate-850 text-xs sm:text-sm">{section.name}</h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className={`mt-5 p-3 rounded-xl border text-xs font-bold ${targetBadgeStyle}`}>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400 mb-1 font-sans">Kadar Nilai Target:</div>
                      {section.target}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Panel 3: Panduan Diet (Anjuran vs Larangan) */}
        {activeSubTab === 'diet' && (
          <div id="panel-diet" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900">Anjuran vs Larangan Makanan</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold uppercase tracking-wider">Panduan diet medis menjaga kestabilan kolesterol dan tensi darah</p>
            </div>

            {/* Premium Culinary Diet Plate Banner */}
            <div className="p-5 bg-gradient-to-r from-sky-50 to-indigo-50 rounded-2xl border border-sky-100 mt-4 space-y-1.5 shadow-sm">
              <span className="inline-block text-[9px] bg-sky-600 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-sans">
                Dietary Approaches (DASH)
              </span>
              <h4 className="text-md sm:text-base font-serif font-extrabold text-slate-900">
                Pola Hidup Berbasis Serat & Rendah Natrium
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Kombinasi nutrisi kalium dari sayur segar & serat larut beta-glukan dari gandum terbukti menahan penyerapan lipid berlebih secara klinis.
              </p>
            </div>

            {/* Split Grid table layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
              {/* Anjuran Table */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-xs sm:text-sm text-emerald-800 flex items-center space-x-2 bg-emerald-50 border border-emerald-150 p-3.5 rounded-2xl">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>Daftar Makanan diAnjurkan (Konsumsi Rutin)</span>
                </h4>
                <div className="overflow-x-auto border border-emerald-150 rounded-2xl shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-emerald-100">
                    <thead className="bg-emerald-50/50">
                      <tr className="text-left text-[10px] font-bold text-emerald-850 uppercase tracking-wider">
                        <th className="px-4 py-3">Nama Bahan</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3">Manfaat Medis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100 text-xs text-slate-700">
                      {DIET_GUIDE_DATA.filter(item => item.status === 'Anjuran').map((item, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/20 transition-colors">
                          <td className="px-4 py-3.5 font-extrabold text-slate-900">{item.name}</td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 leading-relaxed font-semibold text-slate-600">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Larangan Table */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-xs sm:text-sm text-rose-800 flex items-center space-x-2 bg-rose-50 border border-rose-150 p-3.5 rounded-2xl">
                  <ShieldAlert className="h-5 w-5 text-rose-605 flex-shrink-0" />
                  <span>Daftar Makanan diLarang / Batasi Ketat</span>
                </h4>
                <div className="overflow-x-auto border border-rose-150 rounded-2xl shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-rose-100">
                    <thead className="bg-rose-50/50">
                      <tr className="text-left text-[10px] font-bold text-rose-850 uppercase tracking-wider">
                        <th className="px-4 py-3">Nama Bahan</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3">Alasan Medis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-100 text-xs text-slate-700">
                      {DIET_GUIDE_DATA.filter(item => item.status === 'Larangan').map((item, idx) => (
                        <tr key={idx} className="hover:bg-rose-50/20 transition-colors">
                          <td className="px-4 py-3.5 font-extrabold text-slate-900">{item.name}</td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-bold bg-rose-50 text-rose-800 border border-rose-100">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 leading-relaxed font-semibold text-slate-655">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Panel 4: Tips Memasak */}
        {activeSubTab === 'memasak' && (
          <div id="panel-cooking" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900">{COOKING_TIPS.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold uppercase tracking-wider">{COOKING_TIPS.subtitle}</p>
            </div>

            {/* Culinary Sunny Aesthetics Banner */}
            <div className="p-5 bg-gradient-to-r from-amber-50/80 to-orange-50/80 rounded-2xl border border-amber-100 mt-4 space-y-1.5 shadow-sm">
              <span className="inline-block text-[9px] bg-amber-600 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider font-sans">
                Teknik Restorasi Rasa
              </span>
              <h4 className="text-md sm:text-base font-serif font-extrabold text-slate-900">
                Memasak Lezat Tanpa Sumbatan Lemak
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Memaksimalkan bumbu aromatik nabati seperti jahe, sereh, bawang segar, ketumbar, dan lada untuk mengurangi ketergantungan garam halus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {COOKING_TIPS.tips.map((tip, idx) => {
                // Map a neat relevant icon to each specific cooking tip
                const tipIcons = [Droplet, Flame, Sparkles, CookingPot];
                const TipIcon = tipIcons[idx] || Info;

                return (
                  <div key={idx} className="bg-slate-50/60 hover:bg-slate-50 transition-all p-5 rounded-2xl border border-slate-200 flex items-start space-x-4 shadow-sm hover:shadow-md">
                    <span className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-100/70 text-emerald-800">
                      <TipIcon className="h-5 w-5" />
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5">
                        <span className="text-emerald-700 text-xs font-bold font-mono">Pola #{idx + 1}:</span>
                        <span>{tip.title}</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">{tip.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Panel 5: Video Edukasi */}
        {activeSubTab === 'video' && (
          <div id="panel-video" className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-805">Video Edukasi Interaktif</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold">Materi multimedia penanganan dan pencegahan penyakit jantung koroner secara mandiri</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">Materi Edukasi PJK</h4>
                  <p className="text-xs text-slate-650 font-medium mt-1">
                    Pelajari bagaimana pola hidup, kontrol lipid darah, dan kepatuhan pengobatan harian mempertahankan kesehatan jantung.
                  </p>
                </div>
                <a
                  href="https://drive.google.com/file/d/1etCztiFDVYZJKZiA0k_5QjYdwpj2XYAD/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow transition-all cursor-pointer whitespace-nowrap self-start sm:self-center"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Buka di Google Drive</span>
                </a>
              </div>

              {/* Video Player Box */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-300 bg-black shadow-inner">
                <iframe
                  id="gdrive-video-player"
                  src="https://drive.google.com/file/d/1etCztiFDVYZJKZiA0k_5QjYdwpj2XYAD/preview"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Materi Edukasi PJK"
                />
              </div>

              <div className="bg-amber-50/70 border border-amber-150 p-4 rounded-xl flex items-start space-x-3 text-xs text-amber-900 leading-relaxed font-semibold">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p>
                    <strong>Panduan Memutar Video:</strong> Jika pemutar video di atas memuat lambat atau meminta otorisasi, ketuk tombol <strong>"Buka di Google Drive"</strong> di atas untuk streaming langsung dengan pemutar bawaan Google Drive yang beresolusi tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
