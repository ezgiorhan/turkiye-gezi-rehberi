import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCityQuiz, submitQuizResult, getLeaderboard } from "../api";
import { useAuth } from "../context/AuthContext";

const NAME_STORAGE_KEY = "gezi-rehberi-oyuncu-adi";

function formatDuration(seconds) {
  if (seconds === null || seconds === undefined) return "-";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}dk ${s}sn` : `${s}sn`;
}

function LeaderboardTable({ entries, highlightName }) {
  if (!entries || entries.length === 0) {
    return (
      <p className="py-4 text-center text-body-sm text-on-surface-variant">
        Bu şehir için henüz kimse quiz çözmedi. İlk sırada siz olabilirsiniz!
      </p>
    );
  }
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(231, 223, 213)",
      }}
    >
      <table className="w-full text-left text-body-sm">
        <thead className="bg-primary text-on-primary font-label-md">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Gezgin</th>
            <th className="px-4 py-3 text-right">Skor</th>
            <th className="px-4 py-3 text-right">Süre</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            const isMe =
              highlightName &&
              entry.playerName === highlightName &&
              entry._justSubmitted;
            return (
              <tr
                key={entry._id || `${entry.playerName}-${i}`}
                className={`border-t border-borderline transition-colors ${
                  isMe
                    ? "bg-teal-50 font-bold text-primary"
                    : "odd:bg-surface-container-low/50 hover:bg-surface-container"
                }`}
              >
                <td className="px-4 py-3">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </td>
                <td className="px-4 py-3 font-medium">{entry.playerName}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {entry.score}/{entry.total}{" "}
                  <span className="text-on-surface-variant text-xs font-normal">
                    (%{entry.percent})
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-on-surface-variant">
                  {formatDuration(entry.timeTakenSeconds)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Quiz() {
  const { slug } = useParams();
  const { user } = useAuth();

  const [status, setStatus] = useState("loading"); // loading | ready | empty | error
  const [quizData, setQuizData] = useState(null);

  // name -> playing -> finished
  const [phase, setPhase] = useState("name");
  const [playerName, setPlayerName] = useState("");
  const [nameError, setNameError] = useState(null);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const startTimeRef = useRef(null);
  const submittedRef = useRef(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [myRank, setMyRank] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  const questions = quizData?.quiz ?? [];
  const total = questions.length;

  useEffect(() => {
    getCityQuiz(slug)
      .then((data) => {
        setQuizData(data);
        setStatus(data.quiz && data.quiz.length > 0 ? "ready" : "empty");
      })
      .catch(() => setStatus("error"));

    try {
      const savedName = window.localStorage.getItem(NAME_STORAGE_KEY);
      if (savedName) setPlayerName(savedName);
    } catch {}
  }, [slug]);

  useEffect(() => {
    if (user?.name) {
      setPlayerName(user.name.slice(0, 30));
    }
  }, [user]);

  useEffect(() => {
    if (phase !== "finished" || submittedRef.current) return;
    submittedRef.current = true;

    setSubmitting(true);
    setSubmitError(null);

    submitQuizResult({
      citySlug: slug,
      playerName: playerName.trim(),
      score,
      total,
      timeTakenSeconds: timeTaken,
    })
      .then((data) => {
        setMyRank(data.rank);
        setLeaderboardLoading(true);
        return getLeaderboard(slug);
      })
      .then((entries) => {
        let marked = false;
        const withHighlight = entries.map((e) => {
          if (
            !marked &&
            e.playerName === playerName.trim() &&
            e.score === score &&
            e.timeTakenSeconds === timeTaken
          ) {
            marked = true;
            return { ...e, _justSubmitted: true };
          }
          return e;
        });
        setLeaderboard(withHighlight);
      })
      .catch(() => {
        setSubmitError(
          "Sonucunuz kaydedilirken bir sorun oluştu, ancak skorunuzu görebilirsiniz."
        );
      })
      .finally(() => {
        setSubmitting(false);
        setLeaderboardLoading(false);
      });
  }, [phase, playerName, score, slug, timeTaken, total]);

  if (status === "loading") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body-md text-body-md text-on-surface-variant">Quiz yükleniyor...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center px-4">
        <div className="p-10 rounded-3xl bg-surface border border-error/30 text-error shadow-md">
          <p className="font-headline-sm text-headline-sm font-bold">Quiz yüklenirken bir sorun oluştu.</p>
          <Link to={`/sehir/${slug}`} className="mt-4 inline-block font-label-md text-primary underline">
            Şehir sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center px-4">
        <div className="p-10 rounded-3xl bg-surface border border-borderline shadow-md">
          <span className="text-4xl">📝</span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-3">
            Bu Şehir İçin Henüz Quiz Eklenmedi
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-6">
            Yakında bu şehir için eğlenceli bilgi soruları burada olacak.
          </p>
          <Link
            to={`/sehir/${slug}`}
            className="inline-flex items-center gap-2 px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg"
          >
            Şehir Sayfasına Dön
          </Link>
        </div>
      </div>
    );
  }

  const handleStart = (e) => {
    e.preventDefault();
    const cleanName = playerName.trim();
    if (!cleanName) {
      setNameError("Lütfen sıralamada görünecek bir isim girin.");
      return;
    }
    if (cleanName.length > 30) {
      setNameError("İsim en fazla 30 karakter olabilir.");
      return;
    }
    setNameError(null);
    try {
      window.localStorage.setItem(NAME_STORAGE_KEY, cleanName);
    } catch {}
    startTimeRef.current = Date.now();
    setPhase("playing");
  };

  const q = questions[current];

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      const seconds = startTimeRef.current
        ? Math.round((Date.now() - startTimeRef.current) / 1000)
        : null;
      setTimeTaken(seconds);
      setPhase("finished");
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setPhase("name");
    submittedRef.current = false;
    setMyRank(null);
    setSubmitError(null);
  };

  // --- 1. İSİM GİRİŞ EKRANI ---
  if (phase === "name") {
    return (
      <div className="max-w-md mx-auto py-space-xl px-4">
        <Link
          to={`/sehir/${slug}`}
          className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline mb-space-md"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>{quizData.name} Sayfasına Dön</span>
        </Link>

        <form
          onSubmit={handleStart}
          className="rounded-3xl p-space-xl text-center shadow-lg"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-space-md text-3xl shadow-sm">
            🏆
          </div>

          <h1 className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
            {quizData.name} Mini Quiz
          </h1>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {total} soru ile bilginizi test edin. Sonucunuz şehir liderlik tablosunda yer alacak.
          </p>

          <div className="mt-space-lg text-left">
            <label className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
              Gezgin Adı
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Adınızı girin"
              maxLength={30}
              autoFocus={!user}
              readOnly={!!user}
              className={`w-full rounded-xl px-space-md py-3 text-on-surface font-body-md text-body-md outline-none ${
                user
                  ? "bg-teal-50 border border-teal-200 cursor-default"
                  : "bg-surface-container-low border border-borderline focus:border-primary"
              }`}
            />
            {user && (
              <span className="text-[11px] text-primary mt-1 block">
                Hesap adınız otomatik kullanılıyor.
              </span>
            )}
            {nameError && (
              <span className="text-xs text-error font-medium mt-1 block">
                {nameError}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-space-xl w-full py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Teste Başla</span>
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
        </form>
      </div>
    );
  }

  // --- 2. SONUÇ VE SIRALAMA EKRANI ---
  if (phase === "finished") {
    const percent = Math.round((score / total) * 100);
    return (
      <div className="max-w-xl mx-auto py-space-xl px-4 space-y-space-lg">
        <div
          className="rounded-3xl p-space-xl text-center shadow-lg"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <span className="text-5xl">
            {percent >= 70 ? "🏆" : percent >= 40 ? "👍" : "📚"}
          </span>

          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface mt-space-sm">
            Tebrikler, {playerName.trim()}!
          </h2>

          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            {quizData.name} testinde{" "}
            <strong className="text-primary font-bold">
              {score} / {total}
            </strong>{" "}
            doğru yaptınız. (%{percent}) • Süre: {formatDuration(timeTaken)}
          </p>

          {submitting && (
            <p className="mt-space-sm text-sm text-on-surface-variant animate-pulse">
              Skorunuz liderlik tablosuna kaydediliyor...
            </p>
          )}

          {!submitting && myRank && (
            <div className="mt-space-md inline-flex items-center gap-2 px-space-md py-1.5 rounded-full bg-teal-50 border border-teal-200 text-primary font-label-md text-label-md font-bold">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              <span>Bu şehirde {myRank}. sıradasınız!</span>
            </div>
          )}

          {submitError && (
            <p className="mt-2 text-xs text-error font-medium">{submitError}</p>
          )}

          <div className="mt-space-xl flex flex-col sm:flex-row justify-center gap-space-sm">
            <button
              onClick={handleRestart}
              className="px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm"
            >
              Tekrar Dene
            </button>
            <Link
              to={`/sehir/${slug}`}
              className="px-space-xl py-space-md rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all border border-borderline"
            >
              Şehir Sayfasına Dön
            </Link>
          </div>
        </div>

        {/* Liderlik Tablosu */}
        <div
          className="rounded-3xl p-space-xl shadow-lg space-y-space-md"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">leaderboard</span>
              <h3 className="font-title-lg text-title-lg font-bold text-on-surface">
                {quizData.name} Liderlik Tablosu
              </h3>
            </div>
            {leaderboardLoading && (
              <span className="text-xs text-on-surface-variant animate-pulse">Güncelleniyor...</span>
            )}
          </div>

          <LeaderboardTable entries={leaderboard} highlightName={playerName.trim()} />
        </div>
      </div>
    );
  }

  // --- 3. AKTİF TEST (SORU) EKRANI ---
  return (
    <div className="max-w-xl mx-auto py-space-xl px-4">
      <div
        className="rounded-3xl p-space-xl shadow-lg space-y-space-lg"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        {/* Üst İlerleme ve Bilgi */}
        <div className="flex items-center justify-between border-b border-borderline pb-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              {quizData.name} Bilgi Testi
            </span>
            <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Soru {current + 1} / {total}
            </div>
          </div>
          <div className="text-right">
            <span className="font-label-sm text-label-sm text-on-surface-variant block">Doğru</span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">{score}</span>
          </div>
        </div>

        {/* Soru Metni */}
        <div className="py-space-sm">
          <h2 className="font-title-lg text-title-lg font-bold text-on-surface leading-relaxed">
            {q.question}
          </h2>
        </div>

        {/* Şıklar */}
        <div className="space-y-space-sm">
          {q.options.map((option, idx) => {
            const isChosen = selected === idx;
            const isCorrect = idx === q.correctIndex;
            let btnStyle = "bg-surface-container-low border-borderline text-on-surface hover:bg-surface-container";

            if (selected !== null) {
              if (isCorrect) {
                btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
              } else if (isChosen) {
                btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold";
              } else {
                btnStyle = "bg-surface-container-low/50 border-borderline text-on-surface-variant opacity-60";
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full p-space-md rounded-2xl border text-left font-body-md text-body-md transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {selected !== null && isCorrect && (
                  <span className="material-symbols-outlined text-emerald-600">check_circle</span>
                )}
                {selected !== null && isChosen && !isCorrect && (
                  <span className="material-symbols-outlined text-rose-600">cancel</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sonraki Soru Butonu */}
        {selected !== null && (
          <div className="pt-space-md border-t border-borderline flex justify-end">
            <button
              onClick={handleNext}
              type="button"
              className="px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md flex items-center gap-2"
            >
              <span>{current + 1 < total ? "Sonraki Soru" : "Sonuçları Gör"}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
