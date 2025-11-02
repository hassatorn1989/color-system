'use client';
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accessibility,
  Contrast,
  Type,
  Link as LinkIcon,
  Eye,
  PauseCircle,
  Ear,
  Keyboard,
  Highlighter,
  Focus,
  MousePointer,
  Wand2,
  ScanText,
} from "lucide-react";

/**
 * Full-Feature React Accessibility Widget using shadcn/ui
 *
 * Add this once near your app root: <AccessibilityWidget mainSelector="#main" />
 * Requires Tailwind + shadcn/ui + lucide-react.
 */

const LS_KEY = "a11ySettings.v2" as const;

type ColorBlindMode = "none" | "protan" | "deutan" | "tritan";

type A11ySettings = {
  // Visual
  fontScale: number; // 0.85 - 1.8
  highContrast: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
  invertColors: boolean;
  grayscale: boolean;
  dyslexicFont: boolean;
  textSpacing: boolean; // quick WCAG spacing preset
  line: number; // 1.0 - 2.0 (line-height)
  letter: number; // 0 - 0.2 (em)
  word: number; // 0 - 0.3 (em)
  colorBlind: ColorBlindMode;
  readingMask: boolean;
  readingMaskHeight: number; // px

  // Interaction
  bigFocusRing: boolean;
  showFocusOnHover: boolean;

  // Content helpers
  ttsEnabled: boolean;
  ttsRate: number; // 0.5 - 2
  ttsPitch: number; // 0 - 2
  hoverRead: boolean;

  // Navigation
  showSkipLink: boolean;
  mainSelector: string; // e.g. #main
};

const defaultSettings: A11ySettings = {
  fontScale: 1,
  highContrast: false,
  highlightLinks: false,
  reduceMotion: false,
  invertColors: false,
  grayscale: false,
  dyslexicFont: false,
  textSpacing: false,
  line: 1.6,
  letter: 0,
  word: 0,
  colorBlind: "none",
  readingMask: false,
  readingMaskHeight: 140,
  bigFocusRing: false,
  showFocusOnHover: false,
  ttsEnabled: false,
  ttsRate: 1,
  ttsPitch: 1,
  hoverRead: false,
  showSkipLink: true,
  mainSelector: "#main",
};

function useA11ySettings() {
  const [settings, setSettings] = useState<A11ySettings>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw)
        return { ...defaultSettings, ...JSON.parse(raw) } as A11ySettings;
    } catch {}
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
  }, [settings]);

  return { settings, setSettings } as const;
}

function applyGlobalEffects(settings: A11ySettings) {
  const root = document.documentElement; // <html>

  // Font scaling via root font-size
  const clamped = Math.max(0.85, Math.min(1.8, settings.fontScale));
  root.style.fontSize = `${clamped * 100}%`;

  // CSS vars for spacing
  root.style.setProperty(
    "--a11y-line",
    String(Math.max(1, Math.min(2, settings.line)))
  );
  root.style.setProperty(
    "--a11y-letter",
    `${Math.max(0, Math.min(0.2, settings.letter))}em`
  );
  root.style.setProperty(
    "--a11y-word",
    `${Math.max(0, Math.min(0.3, settings.word))}em`
  );

  // Feature flags
  root.classList.toggle("a11y-contrast", settings.highContrast);
  root.classList.toggle("a11y-highlight-links", settings.highlightLinks);
  root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
  root.classList.toggle("a11y-invert", settings.invertColors);
  root.classList.toggle("a11y-gray", settings.grayscale);
  root.classList.toggle("a11y-dyslexic", settings.dyslexicFont);
  root.classList.toggle("a11y-text-spacing", settings.textSpacing);
  root.classList.toggle("a11y-bigfocus", settings.bigFocusRing);
  root.classList.toggle("a11y-focus-onhover", settings.showFocusOnHover);

  // Color blindness filter class
  root.classList.remove("a11y-protan", "a11y-deutan", "a11y-tritan");
  if (settings.colorBlind === "protan") root.classList.add("a11y-protan");
  if (settings.colorBlind === "deutan") root.classList.add("a11y-deutan");
  if (settings.colorBlind === "tritan") root.classList.add("a11y-tritan");
}

function A11yReadingMask({
  enabled,
  height,
}: {
  enabled: boolean;
  height: number;
}) {
  const [y, setY] = useState<number>(() => window.innerHeight / 2);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setY(e.clientY));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  if (!enabled) return null;

  return createPortal(
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60]">
      <div
        className="absolute left-0 right-0 bg-black/60"
        style={{ top: 0, height: Math.max(0, y - height / 2) }}
      />
      <div
        className="absolute left-0 right-0 bg-black/60"
        style={{ top: Math.min(window.innerHeight, y + height / 2), bottom: 0 }}
      />
      <div
        className="absolute left-0 right-0 border-y-2 border-white/60"
        style={{ top: Math.max(0, y - height / 2), height }}
      />
    </div>,
    document.body
  );
}

function useTTS(settings: A11ySettings) {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis ?? null;
  }, []);

  // Update utterance params when settings change
  useEffect(() => {
    if (!settings.ttsEnabled) return;
    if (!utterRef.current) utterRef.current = new SpeechSynthesisUtterance("");
    utterRef.current.rate = settings.ttsRate;
    utterRef.current.pitch = settings.ttsPitch;
  }, [settings.ttsEnabled, settings.ttsRate, settings.ttsPitch]);

  // Hover-to-read
  useEffect(() => {
    if (!settings.ttsEnabled || !settings.hoverRead) return;
    const handler = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const text = t.innerText?.trim();
      if (!text) return;
      if (!synthRef.current) return;
      synthRef.current.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = settings.ttsRate;
      u.pitch = settings.ttsPitch;
      synthRef.current.speak(u);
    };
    const sel = "p, li, a, button, [role=button], h1, h2, h3, h4, h5, h6";
    document.addEventListener("focusin", handler);
    document
      .querySelectorAll(sel)
      .forEach((el) => el.addEventListener("mouseenter", handler));
    return () => {
      document.removeEventListener("focusin", handler);
      document
        .querySelectorAll(sel)
        .forEach((el) => el.removeEventListener("mouseenter", handler));
    };
  }, [
    settings.ttsEnabled,
    settings.hoverRead,
    settings.ttsRate,
    settings.ttsPitch,
  ]);

  const speakSelection = () => {
    if (!settings.ttsEnabled || !synthRef.current) return;
    const selection = window.getSelection()?.toString().trim();
    const text = selection || document.activeElement?.textContent || "";
    if (!text) return;
    synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = settings.ttsRate;
    u.pitch = settings.ttsPitch;
    synthRef.current.speak(u);
  };

  const pause = () => synthRef.current?.pause();
  const resume = () => synthRef.current?.resume();
  const stop = () => synthRef.current?.cancel();

  return { speakSelection, pause, resume, stop } as const;
}

function SkipToContent({
  enabled,
  mainSelector,
}: {
  enabled: boolean;
  mainSelector: string;
}) {
  if (!enabled) return null;
  return createPortal(
    <a
      href={mainSelector}
      className="fixed left-4 top-4 z-[80] -translate-y-20 rounded bg-primary px-3 py-2 text-primary-foreground focus:translate-y-0 focus:outline-none"
    >
      Skip to content
    </a>,
    document.body
  );
}

function HeadingsOutline() {
  const [nodes, setNodes] = useState<HTMLElement[]>([]);
  useEffect(() => {
    const list = Array.from(
      document.querySelectorAll<HTMLElement>("h1, h2, h3")
    );
    setNodes(list);
  }, []);
  if (!nodes.length) return null;
  return (
    <div className="mt-2 max-h-48 overflow-auto rounded border p-2 text-xs">
      <p className="mb-1 font-medium">Page outline</p>
      <ul className="space-y-1">
        {nodes.map((n, i) => (
          <li key={i}>
            <button
              className="text-left underline hover:no-underline"
              onClick={() =>
                n.scrollIntoView({ behavior: "smooth", block: "center" })
              }
            >
              {n.tagName} – {n.innerText.slice(0, 80)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccessibilityWidget({
  mainSelector = "#main",
}: {
  mainSelector?: string;
}) {
  const { settings, setSettings } = useA11ySettings();
  const [open, setOpen] = useState(false);
  const { speakSelection, pause, resume, stop } = useTTS(settings);

  // Sync prop into settings when it differs
  useEffect(() => {
    if (settings.mainSelector !== mainSelector) {
      setSettings((s) => ({ ...s, mainSelector }));
    }
  }, [mainSelector]);

  // Apply global effects whenever settings change
  useEffect(() => {
    applyGlobalEffects(settings);
  }, [settings]);

  // Keyboard shortcut: Alt/Option + A
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key.toLowerCase?.() === "a") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const set = (patch: Partial<A11ySettings>) =>
    setSettings((s) => ({ ...s, ...patch }));

  return (
    <TooltipProvider>
      {/* Global styles, filters & fonts */}
      <GlobalA11yStyles />

      {/* Skip link */}
      <SkipToContent
        enabled={settings.showSkipLink}
        mainSelector={settings.mainSelector}
      />

      {/* Reading mask overlay */}
      <A11yReadingMask
        enabled={settings.readingMask}
        height={settings.readingMaskHeight}
      />

      {/* Floating trigger button */}
      <div className="fixed bottom-4 right-4 z-[70]">
        <Sheet open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button
                  aria-label="Open accessibility settings"
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-xl"
                >
                  <Accessibility className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent>Accessibility (Alt/⌥ + A)</TooltipContent>
          </Tooltip>

          <SheetContent side="right" className="w-[380px] sm:w-[460px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Accessibility className="h-5 w-5" /> Accessibility
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* ===== Visual ===== */}
              <section aria-labelledby="font-size-section">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <h3 id="font-size-section" className="text-sm font-medium">
                      Text size
                    </h3>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(settings.fontScale * 100)}%
                  </span>
                </div>
                <div className="mt-3">
                  <Slider
                    value={[settings.fontScale]}
                    min={0.85}
                    max={1.8}
                    step={0.01}
                    onValueChange={([v]) => set({ fontScale: v })}
                    aria-label="Text size"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => set({ fontScale: 1 })}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        set({
                          fontScale: Math.min(1.8, settings.fontScale + 0.1),
                        })
                      }
                    >
                      +10%
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        set({
                          fontScale: Math.max(0.85, settings.fontScale - 0.1),
                        })
                      }
                    >
                      -10%
                    </Button>
                  </div>
                </div>
              </section>

              <section
                className="grid grid-cols-2 gap-4"
                aria-label="visual-toggles"
              >
                <ToggleRow
                  icon={<Contrast className="h-4 w-4" />}
                  label="High contrast"
                  checked={settings.highContrast}
                  onChange={(v) => set({ highContrast: v })}
                />
                <ToggleRow
                  icon={<Highlighter className="h-4 w-4" />}
                  label="Highlight links"
                  checked={settings.highlightLinks}
                  onChange={(v) => set({ highlightLinks: v })}
                />
                <ToggleRow
                  icon={<PauseCircle className="h-4 w-4" />}
                  label="Reduce motion"
                  checked={settings.reduceMotion}
                  onChange={(v) => set({ reduceMotion: v })}
                />
                <ToggleRow
                  icon={<Wand2 className="h-4 w-4" />}
                  label="Invert colors"
                  checked={settings.invertColors}
                  onChange={(v) => set({ invertColors: v })}
                />
                <ToggleRow
                  icon={<ScanText className="h-4 w-4" />}
                  label="Grayscale"
                  checked={settings.grayscale}
                  onChange={(v) => set({ grayscale: v })}
                />
                <ToggleRow
                  icon={<Type className="h-4 w-4" />}
                  label="Dyslexia font"
                  checked={settings.dyslexicFont}
                  onChange={(v) => set({ dyslexicFont: v })}
                />
              </section>

              {/* Text spacing */}
              <section aria-labelledby="spacing-section">
                <h3 id="spacing-section" className="mb-2 text-sm font-medium">
                  Text spacing
                </h3>
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">
                    WCAG preset
                  </Label>
                  <Switch
                    checked={settings.textSpacing}
                    onCheckedChange={(v) => set({ textSpacing: v })}
                    aria-label="Apply WCAG spacing preset"
                  />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Line-height</Label>
                    <Slider
                      value={[settings.line]}
                      min={1}
                      max={2}
                      step={0.05}
                      onValueChange={([v]) => set({ line: v })}
                      aria-label="Line height"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Letter</Label>
                    <Slider
                      value={[settings.letter]}
                      min={0}
                      max={0.2}
                      step={0.01}
                      onValueChange={([v]) => set({ letter: v })}
                      aria-label="Letter spacing"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Word</Label>
                    <Slider
                      value={[settings.word]}
                      min={0}
                      max={0.3}
                      step={0.01}
                      onValueChange={([v]) => set({ word: v })}
                      aria-label="Word spacing"
                    />
                  </div>
                </div>
              </section>

              {/* Color blindness */}
              <section aria-labelledby="cb-section">
                <h3 id="cb-section" className="mb-2 text-sm font-medium">
                  Color vision deficiency
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(
                    ["none", "protan", "deutan", "tritan"] as ColorBlindMode[]
                  ).map((mode) => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={
                        settings.colorBlind === mode ? "default" : "outline"
                      }
                      onClick={() => set({ colorBlind: mode })}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </section>

              <Separator />

              {/* ===== Interaction & Navigation ===== */}
              <section
                className="grid grid-cols-2 gap-4"
                aria-label="interaction-toggles"
              >
                <ToggleRow
                  icon={<Focus className="h-4 w-4" />}
                  label="Thick focus ring"
                  checked={settings.bigFocusRing}
                  onChange={(v) => set({ bigFocusRing: v })}
                />
                <ToggleRow
                  icon={<MousePointer className="h-4 w-4" />}
                  label="Show focus on hover"
                  checked={settings.showFocusOnHover}
                  onChange={(v) => set({ showFocusOnHover: v })}
                />
                <ToggleRow
                  icon={<Keyboard className="h-4 w-4" />}
                  label="Show skip link"
                  checked={settings.showSkipLink}
                  onChange={(v) => set({ showSkipLink: v })}
                />
              </section>

              <div className="grid grid-cols-1 gap-2">
                <Label className="text-xs" htmlFor="mainSel">
                  Main selector
                </Label>
                <Input
                  id="mainSel"
                  value={settings.mainSelector}
                  onChange={(e) => set({ mainSelector: e.target.value })}
                  placeholder="#main"
                />
              </div>

              <HeadingsOutline />

              <Separator />

              {/* ===== Reading assistance (TTS) ===== */}
              <section aria-labelledby="tts-section">
                <div className="mb-2 flex items-center gap-2">
                  <Ear className="h-4 w-4" />
                  <h3 id="tts-section" className="text-sm font-medium">
                    Text-to-speech
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ToggleRow
                    compact
                    icon={<Ear className="h-4 w-4" />}
                    label="Enable TTS"
                    checked={settings.ttsEnabled}
                    onChange={(v) => set({ ttsEnabled: v })}
                  />
                  <ToggleRow
                    compact
                    icon={<Ear className="h-4 w-4" />}
                    label="Hover to read"
                    checked={settings.hoverRead}
                    onChange={(v) => set({ hoverRead: v })}
                    disabled={!settings.ttsEnabled}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Rate</Label>
                    <Slider
                      value={[settings.ttsRate]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={([v]) => set({ ttsRate: v })}
                      aria-label="TTS rate"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Pitch</Label>
                    <Slider
                      value={[settings.ttsPitch]}
                      min={0}
                      max={2}
                      step={0.1}
                      onValueChange={([v]) => set({ ttsPitch: v })}
                      aria-label="TTS pitch"
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={speakSelection}
                    disabled={!settings.ttsEnabled}
                  >
                    Read selection
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={pause}
                    disabled={!settings.ttsEnabled}
                  >
                    Pause
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={resume}
                    disabled={!settings.ttsEnabled}
                  >
                    Resume
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={stop}
                    disabled={!settings.ttsEnabled}
                  >
                    Stop
                  </Button>
                </div>
              </section>

              <Separator />

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSettings(defaultSettings)}
                  aria-label="Reset all settings"
                >
                  Reset all
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost">Shortcuts</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 text-sm">
                    <p className="mb-1 font-medium">Keyboard</p>
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      <li>
                        <kbd className="rounded bg-muted px-1">Alt/⌥</kbd> +{" "}
                        <kbd className="rounded bg-muted px-1">A</kbd> —
                        open/close panel
                      </li>
                      <li>
                        <kbd className="rounded bg-muted px-1">Tab</kbd> —
                        navigate focusable elements
                      </li>
                      <li>
                        <kbd className="rounded bg-muted px-1">Shift</kbd> +{" "}
                        <kbd className="rounded bg-muted px-1">Tab</kbd> —
                        reverse navigation
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onChange,
  disabled,
  compact,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between ${
        compact ? "" : "border rounded p-2"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

function GlobalA11yStyles() {
  // Inject helpers, fonts & filters via portals so they apply app-wide.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      {createPortal(
        <style>{`
        /* Optional: supply OpenDyslexic font at /fonts/OpenDyslexic-Regular.woff2 */
        @font-face {
          font-family: 'OpenDyslexic';
          src: url('/fonts/OpenDyslexic-Regular.woff2') format('woff2');
          font-display: swap;
        }

        /* High-contrast mode */
        .a11y-contrast body, .a11y-contrast .bg-background { background-color: #000 !important; }
        .a11y-contrast, .a11y-contrast body, .a11y-contrast :where(*):not(svg,svg *) { color: #fff !important; }
        .a11y-contrast .card, .a11y-contrast .shadow, .a11y-contrast .ring-1 { box-shadow: none !important; }
        .a11y-contrast :where(a) { color: #fff !important; text-decoration: underline !important; }

        /* Highlight links */
        .a11y-highlight-links :where(a) {
          text-decoration: underline !important;
          background: rgba(255,221,0,.3) !important;
          outline: 2px solid rgba(255,221,0,.8);
          outline-offset: 2px;
        }

        /* Reduce motion */
        .a11y-reduce-motion *, .a11y-reduce-motion *::before, .a11y-reduce-motion *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }

        /* Invert & grayscale (applies to the whole document) */
        .a11y-invert body { filter: invert(1) hue-rotate(180deg); }
        .a11y-gray body { filter: grayscale(1); }

        /* Dyslexic-friendly font */
        .a11y-dyslexic body, .a11y-dyslexic :where(p,li,button,input,textarea,select) {
          font-family: 'OpenDyslexic', system-ui, ui-sans-serif, Arial, sans-serif !important;
        }

        /* WCAG text spacing preset */
        .a11y-text-spacing :where(p, li, dd, dt) {
          letter-spacing: 0.12em !important;
          word-spacing: 0.16em !important;
          line-height: 1.5 !important;
        }

        /* Adjustable spacing via CSS vars */
        :where(p, li, dd, dt) {
          line-height: var(--a11y-line, 1.6);
          letter-spacing: var(--a11y-letter, 0);
          word-spacing: var(--a11y-word, 0);
        }

        /* Focus visibility */
        :focus-visible { outline: 2px solid hsl(var(--primary)) !important; outline-offset: 2px; }
        .a11y-bigfocus :focus-visible { outline-width: 4px !important; }
        .a11y-focus-onhover :where(a, button, [role=button])::after {
          content: "";
          position: absolute;
          inset: -2px;
          outline: 2px dashed hsl(var(--primary));
          opacity: 0;
        }
        .a11y-focus-onhover :where(a, button, [role=button]):hover::after {
          opacity: 1;
        }
      `}</style>,
        document.head
      )}

      {/* SVG color-blindness filters */}
      {createPortal(
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
          <defs>
            <filter id="protanopia">
              <feColorMatrix
                type="matrix"
                values="0.567 0.433 0     0 0 0.558 0.442 0     0 0 0     0.242 0.758 0 0 0 0 1 0"
              />
            </filter>
            <filter id="deuteranopia">
              <feColorMatrix
                type="matrix"
                values="0.625 0.375 0     0 0 0.7   0.3   0     0 0 0     0.3   0.7   0 0 0 0 1 0"
              />
            </filter>
            <filter id="tritanopia">
              <feColorMatrix
                type="matrix"
                values="0.95  0.05  0     0 0 0     0.433 0.567 0 0 0     0.475 0.525 0 0 0 0 1 0"
              />
            </filter>
          </defs>
        </svg>,
        document.body
      )}

      {createPortal(
        <style>{`
          .a11y-protan body { filter: url(#protanopia); }
          .a11y-deutan body { filter: url(#deuteranopia); }
          .a11y-tritan body { filter: url(#tritanopia); }
        `}</style>,
        document.head
      )}
    </>
  );
}
