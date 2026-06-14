/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, ShieldAlert, CheckCircle, CookingPot, Info, ClipboardList, Video, ExternalLink } from 'lucide-react';
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
              <h3 className="text-xl font-bold text-slate-805">{PJK_CONTENT.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold">{PJK_CONTENT.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              {PJK_CONTENT.content.map((paragraph, index) => (
                <div key={index} className="p-5 bg-slate-50 rounded-xl leading-relaxed text-sm text-slate-700 border border-slate-200 font-medium">
                  {paragraph}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel 2: Lemak LDL HDL */}
        {activeSubTab === 'lemak' && (
          <div id="panel-lemak" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-805">{CHOLESTEROL_CONTENT.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold">{CHOLESTEROL_CONTENT.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {CHOLESTEROL_CONTENT.sections.map((section, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-250 flex flex-col justify-between shadow-sm">
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm text-slate-850">{section.name}</h4>
                    <p className="text-xs text-slate-650 leading-relaxed font-semibold">{section.description}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-200 text-xs font-bold text-emerald-700">
                    {section.target}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel 3: Panduan Diet (Anjuran vs Larangan) */}
        {activeSubTab === 'diet' && (
          <div id="panel-diet" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-805">Anjuran vs Larangan Makanan</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold">Panduan diet logis menjaga kestabilan kolesterol dan tensi darah</p>
            </div>

            {/* Split Grid table layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
              {/* Anjuran Table */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-emerald-800 flex items-center space-x-1.5 uppercase tracking-wider bg-emerald-50 border border-emerald-150 p-3 rounded-xl col-span-full">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span>Daftar Makanan diAnjurkan</span>
                </h4>
                <div className="overflow-x-auto border border-emerald-150 rounded-xl shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-emerald-100">
                    <thead className="bg-emerald-50/50">
                      <tr className="text-left text-xs font-bold text-emerald-800">
                        <th className="px-4 py-2.5">Nama</th>
                        <th className="px-4 py-2.5">Tipe</th>
                        <th className="px-4 py-2.5">Manfaat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100 text-xs text-slate-700">
                      {DIET_GUIDE_DATA.filter(item => item.status === 'Anjuran').map((item, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/20 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-900">{item.name}</td>
                          <td className="px-4 py-3 font-mono text-[10px] text-emerald-700 font-bold">{item.category}</td>
                          <td className="px-4 py-3 leading-relaxed font-semibold">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Larangan Table */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-red-800 flex items-center space-x-1.5 uppercase tracking-wider bg-red-50 border border-red-150 p-3 rounded-xl col-span-full">
                  <ShieldAlert className="h-5 w-5 text-red-600" />
                  <span>Daftar Makanan diLarang / Batasi</span>
                </h4>
                <div className="overflow-x-auto border border-red-150 rounded-xl shadow-sm bg-white">
                  <table className="min-w-full divide-y divide-red-100">
                    <thead className="bg-red-50/50">
                      <tr className="text-left text-xs font-bold text-red-800">
                        <th className="px-4 py-2.5">Nama</th>
                        <th className="px-4 py-2.5">Tipe</th>
                        <th className="px-4 py-2.5">Alasan Medis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-red-100 text-xs text-slate-705 font-medium">
                      {DIET_GUIDE_DATA.filter(item => item.status === 'Larangan').map((item, idx) => (
                        <tr key={idx} className="hover:bg-red-50/20 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-900">{item.name}</td>
                          <td className="px-4 py-3 font-mono text-[10px] text-red-700 font-bold">{item.category}</td>
                          <td className="px-4 py-3 leading-relaxed font-semibold">{item.description}</td>
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
              <h3 className="text-xl font-bold text-slate-805">{COOKING_TIPS.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-700 font-bold">{COOKING_TIPS.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {COOKING_TIPS.tips.map((tip, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start space-x-3 shadow-sm">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-sm text-slate-900">{tip.title}</h4>
                    <p className="text-xs text-slate-650 leading-relaxed font-semibold">{tip.desc}</p>
                  </div>
                </div>
              ))}
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
