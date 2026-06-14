/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Activity, Plus, Trash2, ShieldAlert, Calendar, CheckSquare, Heart } from 'lucide-react';
import { BloodPressureLog } from '../types';

interface BloodPressureTrackerProps {
  logs: BloodPressureLog[];
  onAddLog: (systolic: number, diastolic: number) => Promise<void>;
  onDeleteLog: (id: string) => Promise<void>;
  saving: boolean;
}

export default function BloodPressureTracker({
  logs,
  onAddLog,
  onDeleteLog,
  saving
}: BloodPressureTrackerProps) {
  const [systolic, setSystolic] = useState<number | ''>('');
  const [diastolic, setDiastolic] = useState<number | ''>('');
  const [formError, setFormError] = useState<string | null>(null);

  const getClassification = (sys: number, dia: number) => {
    // - Hipertensi Derajat 3: Sis >= 180 atau Dia >= 110.
    // - Derajat 2: Sis 160-179 atau Dia 100-109.
    // - Derajat 1: Sis 140-159 atau Dia 90-99.
    // - Sistolik Terisolasi: Sis >= 140 dan Dia < 90.
    // - Normal: Di bawah itu.
    if (sys >= 180 || dia >= 110) {
      return {
        label: 'Hipertensi Derajat 3',
        description: 'Tegangan krisis kardiovaskular. Diperlukan tindakan medis segera!',
        colorClass: 'bg-red-100 text-red-900 border-red-200',
        dotColor: 'bg-red-600'
      };
    }
    if ((sys >= 160 && sys <= 179) || (dia >= 100 && dia <= 109)) {
      return {
        label: 'Hipertensi Derajat 2',
        description: 'Tensi tinggi berisiko memicu kerusakan arteri koroner.',
        colorClass: 'bg-orange-100 text-orange-900 border-orange-200',
        dotColor: 'bg-orange-600'
      };
    }
    if (sys >= 140 && dia < 90) {
      return {
        label: 'Sistolik Terisolasi',
        description: 'Hipertensi sistolik yang umumnya dipicu kekakuan dinding aorta.',
        colorClass: 'bg-blue-100 text-blue-900 border-blue-200',
        dotColor: 'bg-blue-600'
      };
    }
    if ((sys >= 140 && sys <= 159) || (dia >= 90 && dia <= 99)) {
      return {
        label: 'Hipertensi Derajat 1',
        description: 'Tensi darah naik sedang. Batasi garam & kendalikan stres harian.',
        colorClass: 'bg-amber-100 text-amber-900 border-amber-200',
        dotColor: 'bg-amber-600'
      };
    }
    return {
      label: 'Normal',
      description: 'Selamat! Tekanan darah berada pada batas aman ideal jantung.',
      colorClass: 'bg-emerald-100 text-emerald-900 border-emerald-250',
      dotColor: 'bg-emerald-600'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!systolic || !diastolic) {
      setFormError('Harap isi angka Sistolik dan Diastolik secara lengkap.');
      return;
    }

    const sysNum = Number(systolic);
    const diaNum = Number(diastolic);

    if (sysNum < 40 || sysNum > 280) {
      setFormError('Sistolik tidak rasional (masukkan antara 40 - 280 mmHg).');
      return;
    }
    if (diaNum < 30 || diaNum > 180) {
      setFormError('Diastolik tidak rasional (masukkan antara 30 - 180 mmHg).');
      return;
    }

    try {
      await onAddLog(sysNum, diaNum);
      setSystolic('');
      setDiastolic('');
    } catch (err) {
      console.error(err);
      setFormError('Gagal menyimpan catatan tensi.');
    }
  };

  const getLogDateString = (timestamp: any) => {
    if (!timestamp) return '-';
    try {
      // Handle Firebase Timestamp or JS Date
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return '-';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="tensi-tracker-container">
      {/* Input Form Column */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-250 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Activity className="h-5 w-5 text-emerald-500" />
            <span>Catat Tekanan Darah</span>
          </h3>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4" id="bp-log-form">
            {formError && (
              <div className="p-3 bg-rose-50 text-rose-850 text-xs rounded-xl flex items-start space-x-1 border border-rose-150">
                <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650">
                Tekanan Sistolik (mmHg)
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <input
                  type="number"
                  id="bp-input-systolic"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Mis. 120"
                  className="block w-full px-4 py-2.5 border border-slate-300 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold placeholder:text-slate-400"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Saat otot bilik jantung berkontraksi memompa darah.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-650">
                Tekanan Diastolik (mmHg)
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <input
                  type="number"
                  id="bp-input-diastolic"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Mis. 80"
                  className="block w-full px-4 py-2.5 border border-slate-300 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold placeholder:text-slate-400"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Saat otot serambi jantung mengembang melonggarkan darah.</p>
            </div>

            {/* Quick Preview classification if typing */}
            {systolic && diastolic && (
              <div id="live-bp-classification-preview" className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1">
                <p className="font-semibold text-slate-500 uppercase tracking-widest text-[9px]">Prediksi Klasifikasi:</p>
                <div className="flex items-center space-x-1.5 mt-1">
                  <span className={`h-2.5 w-2.5 rounded-full ${getClassification(Number(systolic), Number(diastolic)).dotColor}`} />
                  <p className="font-bold text-slate-805 text-sm">
                    {getClassification(Number(systolic), Number(diastolic)).label}
                  </p>
                </div>
                <p className="text-slate-650 leading-relaxed mt-1">
                  {getClassification(Number(systolic), Number(diastolic)).description}
                </p>
              </div>
            )}

            <button
              type="submit"
              id="bp-submit-btn"
              disabled={saving}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              <span>{saving ? 'Menyimpan...' : 'Tambahkan Log'}</span>
            </button>
          </form>
        </div>

        {/* Informative Guidance card */}
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-150 space-y-3">
          <h4 className="font-semibold text-slate-800 text-sm flex items-center space-x-1">
            <Heart className="h-4 w-4 text-emerald-600" />
            <span>Kapan Harus Mengukur?</span>
          </h4>
          <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 leading-relaxed">
            <li>Lakukan pengukuran saat tubuh rileks istirahat.</li>
            <li>Hindari minum kopi, merokok, atau berolahraga 30 menit sebelum tensi diukur.</li>
            <li>Gunakan tensimeter digital lengan atas yang terkalibrasi baik.</li>
          </ul>
        </div>
      </div>

      {/* History Logs Table Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-250 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Riwayat Pengukuran</h3>
              <p className="text-xs text-slate-500 mt-1">Catatan tekanan darah yang pernah didaftarkan ke Database</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-100">
              {logs.length} Log
            </span>
          </div>

          <div className="mt-5 overflow-x-auto min-h-[150px]">
            {logs.length === 0 ? (
              <div id="no-bp-logs-alert" className="text-center py-10 space-y-3">
                <p className="text-slate-400 text-sm">Belum ada catatan tensi darah. Masukkan angka baru di form kiri.</p>
              </div>
            ) : (
              <table id="bp-history-table" className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50">
                    <th className="px-4 py-3">Tanggal & Waktu</th>
                    <th className="px-4 py-3">Sistolik / Diastolik</th>
                    <th className="px-4 py-3">Klasifikasi Klinik</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {logs.map((log) => {
                    const classInfo = getClassification(log.systolic, log.diastolic);
                    return (
                      <tr key={log.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500 font-semibold">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{getLogDateString(log.createdAt)}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap font-mono font-bold text-slate-800">
                          {log.systolic} / {log.diastolic} <span className="text-xs text-slate-500 font-sans font-semibold">mmHg</span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${classInfo.colorClass}`}>
                            <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${classInfo.dotColor}`} />
                            {log.category}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap text-right">
                          <button
                            id={`trash-log-${log.id}`}
                            onClick={() => log.id && onDeleteLog(log.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            title="Hapus Catatan"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
