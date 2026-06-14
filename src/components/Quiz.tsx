/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HEART_QUIZ_QUESTIONS } from '../data/quiz';
import { HelpCircle, Award, RefreshCw, CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = HEART_QUIZ_QUESTIONS[currentIdx];

  const handleOptionClick = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null || isSubmitted) return;

    setIsSubmitted(true);
    if (selectedOpt === currentQuestion.answerIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);

    if (currentIdx + 1 < HEART_QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Progress Calculations
  const progressPercent = ((currentIdx + (isSubmitted ? 1 : 0)) / HEART_QUIZ_QUESTIONS.length) * 100;

  const getScoreClassification = (finalScore: number) => {
    if (finalScore >= 9) {
      return {
        title: 'Kardiolog Kehormatan!',
        desc: 'Pemahaman luar biasa! Anda sangat memahami seluk-beluk menjaga kesehatan koroner jantung.',
        badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200'
      };
    }
    if (finalScore >= 7) {
      return {
        title: 'Pejuang Jantung Tangguh!',
        desc: 'Sangat bagus! Pengetahuan Anda sudah mumpuni untuk mendukung proses pemulihan mandiri.',
        badgeBg: 'bg-blue-50 text-blue-900 border-blue-200'
      };
    }
    return {
      title: 'Mari Belajar Lebih Banyak!',
      desc: 'Tetap semangat! Jelajahi lebih mendalam modul edukasi dan panduan nutrisi untuk menguatkan pertahanan jantung koroner Anda.',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200'
    };
  };

  if (quizFinished) {
    const classInfo = getScoreClassification(score);
    return (
      <div id="quiz-result-slide" className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-250 shadow-md max-w-xl mx-auto text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg transform scale-105 transition-all">
            <Award className="h-12 w-12 text-white fill-amber-105" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Kuis Selesai!</h3>
          <p className="text-sm text-slate-500 font-semibold">Terima kasih telah berpartisipasi menguji pertahanan pengetahuan jantung Anda.</p>
        </div>

        {/* Score Ring Display */}
        <div className="py-4">
          <div className="inline-flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Skor Akhir Anda</span>
            <span id="quiz-final-score" className="text-4xl font-extrabold text-slate-800 mt-1">
              {score * 10} <span className="text-sm font-semibold text-slate-400">/ 100</span>
            </span>
            <span className="text-xs font-semibold text-slate-500 mt-0.5">({score} benar dari 10 soal)</span>
          </div>
        </div>

        {/* Classification Badge Card */}
        <div className={`p-5 rounded-xl border ${classInfo.badgeBg} text-left space-y-1.5`}>
          <h4 className="font-bold text-sm">{classInfo.title}</h4>
          <p className="text-xs leading-relaxed font-semibold">{classInfo.desc}</p>
        </div>

        <button
          onClick={handleRestart}
          id="quiz-btn-restart"
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition-all shadow-md cursor-pointer"
        >
          <RefreshCw className="h-4.5 w-4.5" />
          <span>Ulangi Kuis</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6" id="quiz-slideshow-container">
      {/* Question Counter Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-250 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <HelpCircle className="h-4 w-4" />
            <span>Kuis Kesehatan Jantung</span>
          </span>
          <span className="text-xs font-bold text-slate-400">
            Soal {currentIdx + 1} dari {HEART_QUIZ_QUESTIONS.length}
          </span>
        </div>

        {/* Progress bar container */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            id="quiz-progress-bar"
            style={{ width: `${progressPercent}%` }}
            className="bg-emerald-500 bg-gradient-to-r from-emerald-500 to-cyan-500 h-full transition-all duration-300"
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-250 shadow-md space-y-6">
        <h3 id="quiz-question-text" className="text-base sm:text-lg font-sans font-bold text-slate-800 leading-snug">
          {currentQuestion.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = idx === currentQuestion.answerIndex;

            let buttonStyle = 'border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer';
            let checkIcon = null;

            if (isSubmitted) {
              if (isCorrect) {
                buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                checkIcon = <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />;
              } else if (isSelected) {
                buttonStyle = 'border-rose-300 bg-rose-50 text-rose-800';
                checkIcon = <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />;
              } else {
                buttonStyle = 'opacity-40 border-slate-200 text-slate-400';
              }
            } else if (isSelected) {
              buttonStyle = 'border-emerald-600 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-500/10 font-bold';
            }

            return (
              <button
                key={idx}
                id={`quiz-option-${idx}`}
                disabled={isSubmitted}
                onClick={() => handleOptionClick(idx)}
                className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm border flex items-center justify-between transition-all ${buttonStyle}`}
              >
                <span>{option}</span>
                {checkIcon}
              </button>
            );
          })}
        </div>

        {/* Explanation Alert Block */}
        {isSubmitted && (
          <div id="quiz-explanation-block" className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <h4 className="font-bold text-[10px] text-slate-500 uppercase tracking-widest flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>Penjelasan Edukasi:</span>
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-end pt-2">
          {!isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              id="quiz-btn-submit"
              disabled={selectedOpt === null}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 transition-all shadow-sm cursor-pointer"
            >
              Kirim Jawaban
            </button>
          ) : (
            <button
              onClick={handleNext}
              id="quiz-btn-next"
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>{currentIdx + 1 === HEART_QUIZ_QUESTIONS.length ? 'Lihat Hasil' : 'Soal Berikutnya'}</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
