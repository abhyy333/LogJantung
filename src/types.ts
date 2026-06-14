/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  weight: number; // in kg
  height: number; // in cm
  bmi: number;
  bmiCategory: 'Kurang' | 'Normal' | 'Gemuk' | 'Obesitas';
  totalLogins: number;
  lastLogin: string; // ISO date string
}

export interface BloodPressureLog {
  id?: string;
  userId: string;
  systolic: number;
  diastolic: number;
  category: 'Hipertensi Derajat 3' | 'Hipertensi Derajat 2' | 'Hipertensi Derajat 1' | 'Sistolik Terisolasi' | 'Normal';
  createdAt: any; // Firestore Timestamp
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface FoodGuideItem {
  name: string;
  category: string;
  status: 'Anjuran' | 'Larangan';
  description: string;
}
