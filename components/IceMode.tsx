"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChefHat,
  ChevronLeft,
  ChevronRight,
  X,
  ListTodo,
  Pause,
  Play,
  RotateCcw,
  Timer as TimerIcon,
  Check,
} from "lucide-react";
import {
  DEFAULT_MODEL,
  MODELS,
  ModelKey,
  getScaleFactor,
  scaleIngredients,
} from "@/lib/portions";

type Props = {
  title: string;
  steps: string[];
  ingredients: string[];
  basePortions: number;
};

const STORAGE_MODEL_KEY = "creamie:preferred-model";

/* ---------- Utilities ---------- */

function detectTimer(
  step: string
): { totalSec: number; label: string } | null {
  // Sehr lange Pausen (Stunden) NICHT auto-detektieren – das sind Frostzeiten,
  // dafür gibt es keinen Live-Timer.
  const min = step.match(/(\d+)\s*Min(?:ute)?n?\b/i);
  if (min) {
    const n = parseInt(min[1], 10);
    if (n >= 1 && n <= 60) return { totalSec: n * 60, label: `${n} Min` };
  }
  const sec = step.match(/(\d+)\s*Sekunden?\b/i);
  if (sec) {
    const n = parseInt(sec[1], 10);
    if (n >= 5 && n <= 300) return { totalSec: n, label: `${n} Sek` };
  }
  return null;
}

function formatMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function vibrate(pattern: number | number[]) {
  try {
    // @ts-expect-error vibrate is available in some browsers only
    navigator.vibrate?.(pattern);
  } catch {
    /* noop */
  }
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext ||
      // @ts-expect-error vendor prefix legacy
      window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 880;
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.start();
    osc.stop(ctx.currentTime + 0.7);
  } catch {
    /* noop */
  }
}

/* ---------- Hook: Wake Lock ---------- */

function useWakeLock(active: boolean) {
  const sentinelRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;
    async function request() {
      try {
        if (
          typeof navigator !== "undefined" &&
          "wakeLock" in navigator &&
          // @ts-expect-error WakeLock is browser-API, not in types
          typeof navigator.wakeLock?.request === "function"
        ) {
          // @ts-expect-error see above
          const lock = await navigator.wakeLock.request("screen");
          if (cancelled) {
            try {
              // @ts-expect-error see above
              await lock.release?.();
            } catch {
              /* noop */
            }
            return;
          }
          sentinelRef.current = lock;
        }
      } catch {
        /* WakeLock nicht verfügbar – stiller Fallback */
      }
    }

    if (active) request();

    function onVisibility() {
      if (active && document.visibilityState === "visible" && !sentinelRef.current) {
        request();
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisibility);
      const s = sentinelRef.current;
      if (s) {
        try {
          // @ts-expect-error see above
          s.release?.();
        } catch {
          /* noop */
        }
        sentinelRef.current = null;
      }
    };
  }, [active]);
}

/* ---------- Hook: Body-Scroll-Lock ---------- */

function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}

/* ---------- Komponente ---------- */

export function IceMode({ title, steps, ingredients, basePortions }: Props) {
  const [open, setOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);
  const [model, setModel] = useState<ModelKey>(DEFAULT_MODEL);

  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState<number | null>(null);
  const [timerTotal, setTimerTotal] = useState<number | null>(null);

  // Beim Öffnen aktuelles Modell aus localStorage laden
  useEffect(() => {
    if (!open) return;
    try {
      const stored = window.localStorage.getItem(STORAGE_MODEL_KEY);
      if (stored && stored in MODELS) setModel(stored as ModelKey);
    } catch {
      /* noop */
    }
  }, [open]);

  // Skalierte Zutaten für das aktuelle Modell
  const scaledIngredients = useMemo(() => {
    const factor = getScaleFactor(model, basePortions, basePortions);
    return scaleIngredients(ingredients, factor);
  }, [ingredients, model, basePortions]);

  useWakeLock(open);
  useScrollLock(open);

  // Timer auto-tick
  useEffect(() => {
    if (!timerActive || timerRemaining === null) return;
    if (timerRemaining <= 0) {
      setTimerActive(false);
      vibrate([200, 100, 200, 100, 400]);
      playBeep();
      return;
    }
    const id = window.setTimeout(() => {
      setTimerRemaining((s) => (s !== null ? s - 1 : null));
    }, 1000);
    return () => window.clearTimeout(id);
  }, [timerActive, timerRemaining]);

  // Beim Schritt-Wechsel Timer zurücksetzen
  useEffect(() => {
    setTimerActive(false);
    setTimerRemaining(null);
    setTimerTotal(null);
  }, [stepIdx]);

  // Esc zum Schließen
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight")
        setStepIdx((i) => Math.min(steps.length - 1, i + 1));
      if (e.key === "ArrowLeft") setStepIdx((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, steps.length]);

  function startTimer(seconds: number) {
    setTimerTotal(seconds);
    setTimerRemaining(seconds);
    setTimerActive(true);
  }

  function close() {
    setOpen(false);
    setStepIdx(0);
    setTimerActive(false);
    setTimerRemaining(null);
    setTimerTotal(null);
    setShowIngredients(false);
  }

  if (!open) {
    return (
      <div className="my-10">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-berry-500 hover:bg-berry-600 text-white rounded-2xl font-display font-semibold text-lg shadow-md transition"
        >
          <ChefHat className="w-5 h-5" />
          Im Eismodus kochen
        </button>
        <p className="text-xs text-[var(--muted)] mt-2 sm:ml-2 sm:inline-block">
          Schritt für Schritt – mit Bildschirm-Sperre aus, Timer und großer
          Schrift.
        </p>
      </div>
    );
  }

  const step = steps[stepIdx] ?? "";
  const detected = detectTimer(step);
  const isLast = stepIdx === steps.length - 1;
  const isFirst = stepIdx === 0;
  const progressPct = ((stepIdx + 1) / steps.length) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Eismodus"
      className="fixed inset-0 z-50 bg-cream-50 flex flex-col"
    >
      {/* HEADER */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-berry-600 font-bold">
            Eismodus · {MODELS[model].short}
          </p>
          <h2 className="font-display text-base font-semibold truncate">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Eismodus schließen"
          className="w-11 h-11 flex items-center justify-center rounded-full bg-cream-100 hover:bg-cream-200 transition flex-shrink-0 ml-4"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* PROGRESS */}
      <div className="bg-white px-4 pt-2 pb-3 border-b flex-shrink-0">
        <div className="h-1.5 bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-berry-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-[var(--muted)] text-center mt-2 tabular-nums">
          Schritt {stepIdx + 1} von {steps.length}
        </p>
      </div>

      {/* STEP CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
          <p className="text-2xl sm:text-3xl font-display leading-[1.4] text-[var(--fg)]">
            {step}
          </p>

          {/* Timer */}
          {detected && timerRemaining === null && (
            <button
              type="button"
              onClick={() => startTimer(detected.totalSec)}
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-berry-500 text-berry-600 rounded-xl font-semibold hover:bg-berry-50 transition"
            >
              <TimerIcon className="w-5 h-5" />
              Timer für {detected.label} starten
            </button>
          )}

          {timerRemaining !== null && (
            <div className="mt-8 bg-white border-2 border-cream-300 rounded-2xl p-6 max-w-sm">
              <p className="text-xs uppercase tracking-wider text-[var(--muted)] font-semibold mb-2">
                Timer
              </p>
              <p
                className={
                  "font-display text-5xl tabular-nums font-bold mb-1 " +
                  (timerRemaining === 0
                    ? "text-berry-600 animate-pulse"
                    : "text-[var(--fg)]")
                }
              >
                {formatMMSS(Math.max(0, timerRemaining))}
              </p>
              <p className="text-xs text-[var(--muted)] mb-4">
                {timerRemaining === 0
                  ? "✓ Fertig! Weiter zum nächsten Schritt."
                  : timerActive
                  ? "läuft …"
                  : "pausiert"}
              </p>
              <div className="flex gap-2">
                {timerRemaining === 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setTimerActive(false);
                      setTimerRemaining(null);
                      setTimerTotal(null);
                    }}
                    className="flex-1 h-11 rounded-lg bg-berry-500 text-white font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Quittieren
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setTimerActive((a) => !a)}
                      className="flex-1 h-11 rounded-lg bg-berry-500 text-white font-semibold inline-flex items-center justify-center gap-2"
                    >
                      {timerActive ? (
                        <>
                          <Pause className="w-4 h-4" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" /> Start
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (timerTotal) {
                          setTimerRemaining(timerTotal);
                          setTimerActive(false);
                        }
                      }}
                      aria-label="Timer zurücksetzen"
                      className="w-11 h-11 rounded-lg border bg-white inline-flex items-center justify-center"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INGREDIENTS DRAWER */}
      {showIngredients && (
        <div className="bg-white border-t max-h-[45vh] overflow-y-auto flex-shrink-0">
          <div className="px-6 py-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-berry-600 font-bold mb-3">
              Zutaten · {MODELS[model].short}
            </p>
            <ul className="space-y-2">
              {scaledIngredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-berry-500 mt-2 flex-shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="bg-white border-t flex-shrink-0 pb-[env(safe-area-inset-bottom,0px)]">
        <button
          type="button"
          onClick={() => setShowIngredients((s) => !s)}
          className="w-full py-2.5 text-sm font-medium text-[var(--muted)] inline-flex items-center justify-center gap-2 border-b"
        >
          <ListTodo className="w-4 h-4" />
          {showIngredients ? "Zutaten ausblenden" : "Zutaten einblenden"}
        </button>
        <div className="p-3 flex gap-3">
          <button
            type="button"
            disabled={isFirst}
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            className="flex-1 h-14 rounded-xl border-2 bg-white text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-5 h-5" /> Zurück
          </button>
          {isLast ? (
            <button
              type="button"
              onClick={close}
              className="flex-1 h-14 rounded-xl bg-berry-500 text-white text-base font-semibold flex items-center justify-center gap-2 transition hover:bg-berry-600"
            >
              <Check className="w-5 h-5" /> Fertig
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStepIdx((i) => Math.min(steps.length - 1, i + 1))}
              className="flex-1 h-14 rounded-xl bg-berry-500 text-white text-base font-semibold flex items-center justify-center gap-2 transition hover:bg-berry-600"
            >
              Weiter <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
