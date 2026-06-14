/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoodGuideItem } from '../types';

export interface EducationSection {
  title: string;
  subtitle: string;
  content: string[];
}

export const PJK_CONTENT: EducationSection = {
  title: "Penyakit Jantung Koroner (PJK)",
  subtitle: "Memahami kondisi penyempitan atau penyumbatan pembuluh darah koroner",
  content: [
    "Penyakit Jantung Koroner (PJK) terjadi ketika pembuluh darah utama yang menyuplai jantung (arteri koroner) mengeras dan manyempit akibat penumpukan plak kolesterol (aterosklerosis).",
    "Kondisi ini dapat mengakibatkan aliran darah ke otot jantung berkurang, memicu gejala seperti nyeri dada (angina), sesak napas, hingga serangan jantung mendadak jika arteri tersumbat sepenuhnya.",
    "Faktor risiko utama PJK meliputi tekanan darah tinggi (hipertensi), kadar lemak darah tinggi (dislipidemia), kebiasaan merokok, diabetes, obesitas, kurang aktivitas fisik, serta sejarah genetik keluarga.",
    "Pemantauan mandiri secara rutin terhadap tekanan darah (tensi), berat badan (BMI), pola makan sehat, dan kepatuhan minum obat merupakan kunci utama dalam mencegah komplikasi fatal akibat PJK."
  ]
};

export const CHOLESTEROL_CONTENT = {
  title: "Edukasi Lemak (LDL vs HDL)",
  subtitle: "Membedakan kolesterol 'jahat' dan kolesterol 'baik' dalam tubuh",
  sections: [
    {
      name: "Low-Density Lipoprotein (LDL) - Kolesterol 'Jahat'",
      description: "Membawa kolesterol dari hati ke pembuluh darah di seluruh tubuh. Jika kadarnya terlalu tinggi, kolesterol akan menumpuk di dinding pembuluh darah membentuk plak penyumbat jantung.",
      target: "Kadar Target untuk Pasien Jantung Koroner: < 70 mg/dL (atau bahkan < 55 mg/dL sesuai kondisi klinis)."
    },
    {
      name: "High-Density Lipoprotein (HDL) - Kolesterol 'Baik'",
      description: "Berfungsi menyerap kelebihan kolesterol di pembuluh darah dan membawanya kembali ke hati untuk dikeluarkan dari tubuh, membantu menjaga pembuluh darah tetap bersih.",
      target: "Kadar Target: > 40 mg/dL untuk Laki-laki dan > 50 mg/dL untuk Perempuan."
    },
    {
      name: "Trigliserida & Kolesterol Total",
      description: "Trigliserida adalah jenis lemak lain yang disimpan dalam tubuh dari sisa kalori. Kolesterol Total merupakan jumlah gabungan semua jenis kolesterol.",
      target: "Target Trigliserida: < 150 mg/dL, Kolesterol Total: < 200 mg/dL."
    }
  ]
};

export const COOKING_TIPS = {
  title: "Tips Memasak Sehat bagi Pasien Jantung",
  subtitle: "Cara menyajikan makanan lezat dengan nutrisi pelindung jantung",
  tips: [
    {
      title: "Gunakan Lemak Sehat",
      desc: "Gantikan minyak kelapa atau mentega dengan minyak zaitun (olive oil), minyak kanola, atau minyak jagung dalam jumlah terbatas (tidak berlebihan)."
    },
    {
      title: "Pilih Metode Memasak Pengganti Menggoreng",
      desc: "Biasakan mengolah makanan dengan cara dikukus (steaming), direbus (boiling), dipanggang (grilling), atau ditumis dengan sedikit sekali minyak."
    },
    {
      title: "Kurangi Konsumsi Garam (Natrium)",
      desc: "Garam mengikat air dan menaikkan tekanan darah. Batasi asupan garam maksimal 1 sendok teh (5 gram) per hari. Gunakan rempah-rempah segar (bawang, jahe, ketumbar) untuk memperkuat rasa alami makanan."
    },
    {
      title: "Buang Lemak dari Daging",
      desc: "Saat mengolah ayam, buang bagian kulitnya (sumber kolesterol tinggi). Untuk daging sapi, potong habis lemak putih yang menempel sebelum dimasak."
    }
  ]
};

export const DIET_GUIDE_DATA: FoodGuideItem[] = [
  // Anjuran
  {
    name: "Ikan Berlemak Baik",
    category: "Lauk Pauk",
    status: "Anjuran",
    description: "Ikan kembung, salmon, tuna, dan sarden yang kaya akan asam lemak Omega-3 untuk menurunkan peradangan pembuluh darah."
  },
  {
    name: "Sayuran Hijau",
    category: "Sayur-mayur",
    status: "Anjuran",
    description: "Bayam, brokoli, dan sawi mengandung nitrat alami yang melebarkan pembuluh darah dan menurunkan tensi."
  },
  {
    name: "Gandum Utuh & Oatmeal",
    category: "Makanan Pokok",
    status: "Anjuran",
    description: "Mengandung serat larut beta-glucan tinggi yang mengikat kolesterol jahat di sistem pencernaan agar tidak diserap tubuh."
  },
  {
    name: "Buah-buahan segar",
    category: "Buah-buahan",
    status: "Anjuran",
    description: "Apel, beri-berian, jeruk, dan alpukat yang kaya potasium, serat, dan antioksidan pelindung dinding arteri."
  },
  {
    name: "Minyak Zaitun & Kacang-kacangan",
    category: "Pelengkap",
    status: "Anjuran",
    description: "Kacang almond atau kenari dalam porsi kecil, minyak zaitun extra virgin sebagai pengganti minyak sawit memasak."
  },

  // Larangan
  {
    name: "Gorengan & Minyak Sawit Berulang",
    category: "Camilan / Pengolah",
    status: "Larangan",
    description: "Mengandung lemak trans tinggi yang melonjakkan kadar kolesterol LDL dan memicu peradangan dinding pembuluh darah."
  },
  {
    name: "Daging Olahan & Sosis",
    category: "Lauk Pauk",
    status: "Larangan",
    description: "Sosis, kornet, nugget, bacon berminyak yang diawetkan dengan natrium tinggi (menaikkan tekanan darah drastis)."
  },
  {
    name: "Jerohan & Kulit Hewan",
    category: "Lauk Pauk",
    status: "Larangan",
    description: "Otak, hati, ampela, babat, kikil, dan kulit ayam mengandung kolesterol jenuh yang sangat tinggi."
  },
  {
    name: "Garam Berlebih & Penyedap Sintetis",
    category: "Bumbu dapur",
    status: "Larangan",
    description: "Bumbu mi instan, keripik asin, kecap asin, atau makanan kaleng tinggi natrium yang memicu retensi cairan di jantung."
  },
  {
    name: "Minuman Manis & Soda",
    category: "Minuman",
    status: "Larangan",
    description: "Tinggi fruktosa yang meningkatkan trigliserida hati dan risiko diabetes, mempercepat perkerasan arteri."
  }
];
