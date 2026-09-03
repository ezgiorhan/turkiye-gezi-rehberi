import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCityQuiz, submitQuizResult, getLeaderboard } from "../api";

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
      <p className="py-4 text-center text-sm text-cini-cobalt/60 dark:text-cini-krem/60">
        Bu şehir için henüz kimse quiz çözmedi. İlk sırada sen olabilirsin!
      </p>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border border-cini-altin/30">
      <table className="w-full text-left text-sm">
        <thead className="bg-cini-cobalt text-cini-krem">
          <tr>
            <th className="px-3 py-2">#</th>
            <th className="px-3 py-2">İsim</th>
            <th className="px-3 py-2 text-right">Skor</th>
            <th className="px-3 py-2 text-right">Süre</th>
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
                className={`border-t border-cini-altin/20 ${
                  isMe ? "bg-cini-turkuaz/15 font-semibold" : "odd:bg-white/40 dark:bg-cini-cobalt/40"
                }`}
              >
                <td className="px-3 py-2">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </td>
                <td className="px-3 py-2">{entry.playerName}</td>
                <td className="px-3 py-2 text-right">
                  {entry.score}/{entry.total}{" "}
                  <span className="text-cini-cobalt/50 dark:text-cini-krem/50">(%{entry.percent})</span>
                </td>
                <td className="px-3 py-2 text-right text-cini-cobalt/70 dark:text-cini-krem/70">
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

  // Şehir/quiz yüklenmeden önce de güvenle okunabilecek türetilmiş değerler.
  // Bunları hook'lardan ÖNCE değil ama erken return'lerden ÖNCE tanımlıyoruz ki
  // aşağıdaki useEffect her render'da (loading/ready fark etmeksizin) çağrılsın.
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
    } catch {
      // localStorage kullanılamıyorsa sessizce yok say
    }
  }, [slug]);

  // Quiz bitince: sonucu MongoDB'ye gönder, ardından herkese açık sıralamayı çek.
  // ÖNEMLİ: Bu useEffect, aşağıdaki "status === loading/error/empty" early return'lerinden
  // ÖNCE tanımlanmalı. Aksi halde bu effect bazı render'larda (örn. status "loading" iken)
  // hiç çağrılmaz, bazılarında çağrılır; bu da React'in "Rendered more hooks than during
  // the previous render" hatasını fırlatmasına neden olur. Hook sırası her render'da
  // birebir aynı olmalıdır.
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
          "Sonucun kaydedilirken bir sorun oluştu, ama skorunu aşağıda görebilirsin."
        );
      })
      .finally(() => {
        setSubmitting(false);
        setLeaderboardLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (status === "loading") {
    return <p className="text-center text-cini-cobalt/60 dark:text-cini-krem/60">Quiz yükleniyor…</p>;
  }
  if (status === "error") {
    return (
      <p className="text-center text-cini-kiremit">
        Quiz yüklenirken bir sorun oluştu.
      </p>
    );
  }
  if (status === "empty") {
    return (
      <div className="text-center">
        <p className="mb-4 text-cini-cobalt dark:text-cini-krem">Bu şehir için henüz quiz eklenmedi.</p>
        <Link to={`/sehir/${slug}`} className="text-cini-turkuaz underline">
          Şehir sayfasına dön
        </Link>
      </div>
    );
  }

  const handleStart = (e) => {
    e.preventDefault();
    const cleanName = playerName.trim();
    if (!cleanName) {
      setNameError("Sıralamada görünmen için bir isim yazmalısın.");
      return;
    }
    if (cleanName.length > 30) {
      setNameError("İsim en fazla 30 karakter olabilir.");
      return;
    }
    setNameError(null);
    try {
      window.localStorage.setItem(NAME_STORAGE_KEY, cleanName);
    } catch {
      // yok say
    }
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

  // --- İSİM EKRANI ---
  if (phase === "name") {
    return (
      <div className="mx-auto max-w-md">
        <Link to={`/sehir/${slug}`} className="text-sm text-cini-turkuaz hover:underline">
          ← {quizData.name} sayfasına dön
        </Link>

        <form
          onSubmit={handleStart}
          className="mt-6 rounded-2xl border border-cini-altin/40 bg-white/70 dark:bg-cini-cobalt/40 p-8 text-center shadow-md"
        >
          <h1 className="font-display text-3xl font-bold text-cini-cobalt dark:text-cini-krem">
            {quizData.name} Mini Quiz
          </h1>
          <p className="mt-2 text-sm text-cini-cobalt/70 dark:text-cini-krem/70">
            {total} soru seni bekliyor. Sonucun herkese açık sıralamada görünecek —
            önce bir isim gir.
          </p>

          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Adın (sıralamada görünecek)"
            maxLength={30}
            autoFocus
            className="mt-6 w-full rounded-lg border border-cini-cobalt/20 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem px-4 py-3 text-center text-cini-cobalt dark:text-cini-krem outline-none focus:border-cini-turkuaz"
          />
          {nameError && (
            <p className="mt-2 text-sm text-cini-kiremit">{nameError}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-cini-kiremit px-6 py-3 font-display text-lg font-semibold text-cini-krem shadow-md transition hover:bg-cini-kiremit/90"
          >
            Quiz'e Başla →
          </button>
        </form>
      </div>
    );
  }

  // --- SONUÇ + SIRALAMA EKRANI ---
  if (phase === "finished") {
    const percent = Math.round((score / total) * 100);
    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-cini-altin/40 bg-white/70 dark:bg-cini-cobalt/40 p-8 text-center shadow-md">
          <p className="text-5xl">{percent >= 70 ? "🏆" : percent >= 40 ? "👍" : "📚"}</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-cini-cobalt dark:text-cini-krem">
            Quiz Tamamlandı, {playerName.trim()}!
          </h2>
          <p className="mt-2 text-lg text-cini-cobalt/80 dark:text-cini-krem/80">
            {quizData.name} quizinde{" "}
            <span className="font-semibold text-cini-kiremit">
              {score} / {total}
            </span>{" "}
            doğru cevap verdin. (%{percent}) · Süre: {formatDuration(timeTaken)}
          </p>

          {submitting && (
            <p className="mt-3 text-sm text-cini-cobalt/60 dark:text-cini-krem/60">Sonucun kaydediliyor…</p>
          )}
          {!submitting && myRank && (
            <p className="mt-3 text-sm font-semibold text-cini-turkuaz">
              Bu şehirde şu anda {myRank}. sıradasın!
            </p>
          )}
          {submitError && (
            <p className="mt-3 text-sm text-cini-kiremit">{submitError}</p>
          )}

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={handleRestart}
              className="rounded-full bg-cini-turkuaz px-6 py-2 font-semibold text-white transition hover:bg-cini-turkuaz/90"
            >
              Tekrar Dene
            </button>
            <Link
              to={`/sehir/${slug}`}
              className="rounded-full border border-cini-cobalt/30 dark:border-cini-krem/20 px-6 py-2 font-semibold text-cini-cobalt dark:text-cini-krem transition hover:bg-cini-cobalt/5 dark:bg-cini-krem/5"
            >
              Şehir Sayfasına Dön
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-3 font-display text-2xl font-semibold text-cini-cobalt dark:text-cini-krem">
            🏅 {quizData.name} Sıralaması
          </h3>
          {leaderboardLoading ? (
            <p className="text-center text-sm text-cini-cobalt/60 dark:text-cini-krem/60">
              Sıralama yükleniyor…
            </p>
          ) : (
            <LeaderboardTable entries={leaderboard} highlightName={playerName.trim()} />
          )}
        </div>
      </div>
    );
  }

  // --- SORU EKRANI ---
  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <Link to={`/sehir/${slug}`} className="text-sm text-cini-turkuaz hover:underline">
          ← {quizData.name} sayfasına dön
        </Link>
        <span className="text-sm font-medium text-cini-cobalt/60 dark:text-cini-krem/60">
          Soru {current + 1} / {total}
        </span>
      </div>

      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-cini-cobalt/10 dark:bg-cini-krem/10">
        <div
          className="h-full bg-cini-kiremit transition-all duration-300"
          style={{ width: `${((current + (selected !== null ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="rounded-2xl border border-cini-altin/40 bg-white/70 dark:bg-cini-cobalt/40 p-6 shadow-md">
        <h2 className="mb-5 font-display text-xl font-semibold text-cini-cobalt dark:text-cini-krem sm:text-2xl">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((option, i) => {
            const isSelected = selected === i;
            const isCorrect = i === q.correctIndex;
            let stateClasses = "border-cini-cobalt/20 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem hover:border-cini-turkuaz";
            if (selected !== null) {
              if (isCorrect) {
                stateClasses = "border-green-600 bg-green-50";
              } else if (isSelected && !isCorrect) {
                stateClasses = "border-cini-kiremit bg-red-50";
              } else {
                stateClasses = "border-cini-cobalt/10 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem opacity-60";
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium text-cini-cobalt dark:text-cini-krem transition ${stateClasses}`}
              >
                {option}
                {selected !== null && isCorrect && (
                  <span className="ml-2 text-green-700">✓ Doğru cevap</span>
                )}
                {selected !== null && isSelected && !isCorrect && (
                  <span className="ml-2 text-cini-kiremit">✗ Yanlış</span>
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && q.explanation && (
          <p className="mt-4 rounded-lg bg-cini-turkuaz/10 p-3 text-sm text-cini-cobalt/80 dark:text-cini-krem/80">
            💡 {q.explanation}
          </p>
        )}

        {selected !== null && (
          <button
            onClick={handleNext}
            className="mt-6 w-full rounded-full bg-cini-cobalt px-6 py-3 font-semibold text-cini-krem transition hover:bg-cini-cobalt/90 dark:bg-cini-krem/90"
          >
            {current + 1 < total ? "Sonraki Soru →" : "Sonucu Gör →"}
          </button>
        )}
      </div>
    </div>
  );
}
