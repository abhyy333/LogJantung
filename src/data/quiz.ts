/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const HEART_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Apa fungsi utama dari pembuluh darah koroner bagi organ jantung?",
    options: [
      "Mengalirkan darah dari jantung ke seluruh tubuh",
      "Menyuplai oksigen dan nutrisi khusus untuk otot-otot jantung itu sendiri",
      "Mengambil darah kotor dari organ otak menuju jantung",
      "Menyaring racun dan kolesterol berbahaya dari empedu"
    ],
    answerIndex: 1,
    explanation: "Arteri koroner bertugas menyalurkan darah yang kaya akan oksigen dan nutrisi khusus untuk mempertahankan detak dan kelangsungan otot jantung."
  },
  {
    id: 2,
    question: "Apa singkatan dari LDL yang sering disebut sebagai kolesterol 'jahat'?",
    options: [
      "Low-Density Lipoprotein",
      "Level-Daily Lipid",
      "Light-Diet Low-fat",
      "Lipid-Density Low-level"
    ],
    answerIndex: 0,
    explanation: "LDL kepanjangan dari Low-Density Lipoprotein. Kelebihan LDL memicu penumpukan plak di dalam dinding pembuluh darah (aterosklerosis)."
  },
  {
    id: 3,
    question: "Manakah kondisi tekanan darah (tensi) berikut yang diklasifikasikan sebagai Hipertensi Derajat 3?",
    options: [
      "Sistolik 120 / Diastolik 80 mmHg",
      "Sistolik 145 / Diastolik 95 mmHg",
      "Sistolik 170 / Diastolik 105 mmHg",
      "Sistolik >= 180 atau Diastolik >= 110 mmHg"
    ],
    answerIndex: 3,
    explanation: "Hipertensi Derajat 3 adalah kondisi darurat kardiovaskular jika tensi mencapai sistolik >= 180 mmHg atau diastolik >= 110 mmHg."
  },
  {
    id: 4,
    question: "Mengapa garam (konsumsi natrium berlebih) berbahaya bagi pengidap hipertensi dan jantung koroner?",
    options: [
      "Karena garam membuat darah menjadi terasa hambar",
      "Garam mengikat air di pembuluh darah, meningkatkan volume darah dan membebani kerja pompa jantung",
      "Garam menghancurkan struktur lambung secara langsung",
      "Garam membuat otot sendi menjadi kaku"
    ],
    answerIndex: 1,
    explanation: "Natrium mengikat air dalam sirkulasi darah. Volume darah yang berlebih menyumbang beban ekstra pada penarikan arterial dan kerja pompa dinding bilik jantung."
  },
  {
    id: 5,
    question: "Kategori kolesterol apakah yang bermanfaat untuk 'membersihkan' sisa timbunan kolesterol jahat di dinding arteri?",
    options: [
      "Trigliserida",
      "HDL (High-Density Lipoprotein)",
      "LDL (Low-Density Lipoprotein)",
      "VLDL (Very Low-Density Lipoprotein)"
    ],
    answerIndex: 1,
    explanation: "HDL merupakan kolesterol 'baik' yang mengangkut kolesterol berlebih dari sel dan dinding arteri kembali ke hati untuk diproses dan dibuang."
  },
  {
    id: 6,
    question: "Kondisi di mana tekanan darah sistolik tinggi (>= 140 mmHg) tetapi diastoliknya normal (< 90 mmHg) dinamakan...",
    options: [
      "Hipotensi Ortostatik",
      "Hipertensi Derajat 1",
      "Sistolik Terisolasi",
      "Hipertensi Krisis"
    ],
    answerIndex: 2,
    explanation: "Kondisi ini disebut Sistolik Terisolasi (Isolated Systolic Hypertension), sering kali dijumpai pada lansia akibat pengerasan arteri utama."
  },
  {
    id: 7,
    question: "Berapakah batas maksimal asupan garam (natrium) harian yang dianjurkan oleh WHO bagi pasien jantung?",
    options: [
      "1 sendok teh (sekitar 5 gram/hari)",
      "4 sendok teh (sekitar 20 gram/hari)",
      "Setengah sendok makan besar setiap kali makan piring saji",
      "Bebas tanpa batas asalkan banyak minum air putih"
    ],
    answerIndex: 0,
    explanation: "Penderita hipertensi dan jantung koroner dianjurkan membatasi asupan garam maksimal 1 sendok teh atau sekitar 2000mg natrium per hari."
  },
  {
    id: 8,
    question: "Manakah metode pengolahan makanan yang paling aman untuk pasien jantung koroner?",
    options: [
      "Mengguyur makanan dengan mentega cair di piring saji",
      "Mengukus, merebus, atau memanggang dengan sedikit minyak zaitun",
      "Menggoreng garing (deep fry) menggunakan minyak goreng bekas",
      "Membakar makanan hingga hangus dan berkerak hitam"
    ],
    answerIndex: 1,
    explanation: "Metode mengukus, merebus, dan memanggang menjaga kelestarian gizi tanpa menyumbangkan asupan kolesterol trans jenuh yang membahayakan koroner."
  },
  {
    id: 9,
    question: "Gejala khas Penyakit Jantung Koroner berupa nyeri/sesak dada kiri menjalar ke bahu kiri atau rahang akibat kekurangan oksigen disebut...",
    options: [
      "Vertigo",
      "Angina Pektoris",
      "Alergi Kulit",
      "Asma Bronkial"
    ],
    answerIndex: 2,
    explanation: "Angina pektoris adalah nyeri dada/tekanan di bawah tulang dada akibat terganggunya sirkulasi oksigenasi pembuluh darah koroner ke otot jantung."
  },
  {
    id: 10,
    question: "Mengapa indeks massa tubuh (BMI) normal sangat penting bagi pasien jantung koroner?",
    options: [
      "BMI normal meminimalkan beban kerja pompa jantung dan meredam risiko penumpukan lemak visceral",
      "Agar pasien bisa menjadi atlet binaraga internasional",
      "BMI normal menjamin wajah pasien terlihat awet muda selamanya",
      "Agar kadar gula lambung meningkat drastis"
    ],
    answerIndex: 0,
    explanation: "Berat badan berlebih (overweight/obesity) meningkatkan resistensi pembuluh darah perifer dan menambah volume kapiler, membebani kontraksi jantung setiap detik."
  }
];
