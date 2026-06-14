/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User, Scale, ArrowUpNarrowWide, Eye, CheckCircle2, Award, Calendar, RefreshCcw } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileFormProps {
  initialProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => Promise<void>;
  saving: boolean;
}

export default function ProfileForm({ initialProfile, onSaveProfile, saving }: ProfileFormProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<'Kurang' | 'Normal' | 'Gemuk' | 'Obesitas' | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize fields on load or change
  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name || '');
      setGender(initialProfile.gender || 'Laki-laki');
      setWeight(initialProfile.weight || '');
      setHeight(initialProfile.height || '');
    }
  }, [initialProfile]);

  // Recalculate BMI automatically when weight or height changes
  useEffect(() => {
    if (weight && height) {
      const hMeters = Number(height) / 100;
      const computedBmi = Number(weight) / (hMeters * hMeters);
      const roundedBmi = parseFloat(computedBmi.toFixed(1));
      setBmi(roundedBmi);

      // BMI category calculation
      // BB (kg), TB (cm). Hitung BMI otomatis (BMI < 18.5 Kurang, 18.5-25 Normal, 25-27 Gemuk, >27 Obesitas).
      if (roundedBmi < 18.5) {
        setBmiCategory('Kurang');
      } else if (roundedBmi >= 18.5 && roundedBmi <= 25) {
        setBmiCategory('Normal');
      } else if (roundedBmi > 25 && roundedBmi <= 27) {
        setBmiCategory('Gemuk');
      } else {
        setBmiCategory('Obesitas');
      }
    } else {
      setBmi(null);
      setBmiCategory(null);
    }
  }, [weight, height]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !gender || !weight || !height || bmi === null || bmiCategory === null) {
      return;
    }

    const updatedProfile: UserProfile = {
      name,
      gender,
      weight: Number(weight),
      height: Number(height),
      bmi,
      bmiCategory,
      totalLogins: initialProfile?.totalLogins || 1,
      lastLogin: initialProfile?.lastLogin || new Date().toISOString(),
    };

    try {
      await onSaveProfile(updatedProfile);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  const getBmiBadgeStyles = (cat: string) => {
    switch (cat) {
      case 'Kurang':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      case 'Normal':
        return 'bg-emerald-100 text-emerald-900 border-emerald-250';
      case 'Gemuk':
        return 'bg-orange-100 text-orange-900 border-orange-200';
      case 'Obesitas':
        return 'bg-rose-100 text-rose-900 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formattedDate = (isoString?: string) => {
    if (!isoString) return '-';
    try {
      const date = new Date(isoString);
      return date.toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="profile-container">
      {/* Left side: Form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-250 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-800 flex items-center space-x-2">
            <User className="h-6 w-6 text-emerald-500" />
            <span>Form Profil Mandiri</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Isi atau sesuaikan profil klinis Anda untuk memantau status indeks massa tubuh (BMI) secara akurat.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5" id="profile-edit-form">
            {saveSuccess && (
              <div id="save-success-alert" className="bg-emerald-50 border border-emerald-250 text-emerald-700 p-4 rounded-xl text-sm flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold">Profil medis berhasil disimpan dan disinkronisasi ke Database!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  id="profile-input-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mis. Bambang Setiadi"
                  className="mt-1.5 block w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Jenis Kelamin
                </label>
                <select
                  id="profile-input-gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'Laki-laki' | 'Perempuan')}
                  className="mt-1.5 block w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold cursor-pointer"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                  <Scale className="h-3.5 w-3.5 text-slate-450" />
                  <span>Berat Badan (kg)</span>
                </label>
                <input
                  type="number"
                  required
                  min="20"
                  max="300"
                  id="profile-input-weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Mis. 70"
                  className="mt-1.5 block w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1">
                  <ArrowUpNarrowWide className="h-3.5 w-3.5 text-slate-450" />
                  <span>Tinggi Badan (cm)</span>
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  max="250"
                  id="profile-input-height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Mis. 165"
                  className="mt-1.5 block w-full px-4 py-3 border border-slate-300 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Live BMI display panel */}
            {bmi !== null && bmiCategory !== null && (
              <div id="bmi-display-panel" className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">BMI Terhitung Otomatis</p>
                  <p id="bmi-value" className="text-2xl font-bold text-slate-800 mt-1">
                    {bmi} <span className="text-sm font-normal text-slate-500">kg/m²</span>
                  </p>
                </div>
                <div>
                  <span id="bmi-category-badge" className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${getBmiBadgeStyles(bmiCategory)}`}>
                    {bmiCategory}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              id="profile-save-btn"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Menyimpan...' : 'Simpan Profil Medis'}
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Credentials & Database stats */}
      <div className="space-y-6">
        <div id="stats-card" className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-850 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 pointer-events-none translate-x-4 translate-y-4 opacity-5">
            <User className="h-44 w-44" />
          </div>

          <h3 className="font-bold text-lg flex items-center space-x-2 border-b border-indigo-950 pb-3">
            <Award className="h-5 w-5 text-amber-400 animate-pulse" />
            <span>Statistik Profil</span>
          </h3>

          <div id="session-stats-group" className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-slate-400 flex items-center space-x-1">
                <RefreshCcw className="h-3 w-3" />
                <span>Total Aktivitas Login</span>
              </p>
              <p id="stat-total-logins" className="text-2xl font-bold text-slate-100 mt-0.5">
                {initialProfile?.totalLogins || 1} <span className="text-xs font-normal text-slate-400">Kunjungan</span>
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Kunjungan Terakhir</span>
              </p>
              <p id="stat-last-login" className="text-xs font-semibold font-mono text-emerald-305 mt-1 max-w-[240px] leading-relaxed">
                {formattedDate(initialProfile?.lastLogin)}
              </p>
            </div>
          </div>
        </div>

        {/* Informative medical context card */}
        <div className="bg-emerald-50/20 p-6 rounded-2xl border border-emerald-100">
          <h4 className="font-semibold text-slate-800 text-sm">Target BMI Ideal</h4>
          <p className="text-xs text-slate-700 mt-2 leading-relaxed font-medium">
            Menjaga berat badan agar berada di kisaran BMI normal (18.5 - 25) sangat efektif meringankan kerja jantung koroner. Kelebihan berat badan (BMI &gt; 25) mempercepat pembentukan plak aterosklerosis pembuluh koroner akibat peningkatan tegangan gesek dinding arteri.
          </p>
        </div>
      </div>
    </div>
  );
}
