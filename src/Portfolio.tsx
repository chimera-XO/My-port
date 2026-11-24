import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Volume2, VolumeX } from 'lucide-react';

interface GameItem {
  id: string;
  title: string;
  videoSrc: string;
  playUrl: string;
}

interface WebAppItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  appUrl: string;
}

interface TweetItem {
  id: string;
  label: string;
  imageSrc: string;
  tweetUrl: string;
}

type SectionId = 'games' | 'webapps' | 'tweets';

const GAMES_DATA: GameItem[] = [
  {
    id: 'ninja-cat',
    title: 'Ninja Cat: Shadow Run',
    videoSrc: '/videos/ninja-cat.mp4',
    playUrl: 'https://t.me/PLAYninjacat_bot',
  },
  {
    id: 'piggy-jump',
    title: 'Piggy Jump',
    videoSrc: '/videos/piggy-jump.mp4',
    playUrl: 'https://t.me/piggybsc_bot',
  },
];

const WEB_APPS_DATA: WebAppItem[] = [
  {
    id: 'moonpaper',
    title: 'MOONpaper',
    description: '4K wallpapers gallery with Desktop, Mobile, and Collections views.',
    imageSrc: '/images/moonpaper.jpg',
    appUrl: 'https://moonpaper.fun',
  },
  {
    id: 'trumpty-vault',
    title: 'Trumpty Meme Vault',
    description: 'Community meme gallery and download vault with background audio.',
    imageSrc: '/images/trumpty-vault.jpg',
    appUrl: 'https://trumptymemecoin.com/memes/#vault',
  },
];

const TWEETS_DATA: TweetItem[] = [
  {
    id: 'tweet-1',
    label: '@nexus4lfe — Web3 Execution & PM',
    imageSrc: '/images/tweets/tweet-1.jpg',
    tweetUrl: 'https://x.com/nexus4lfe/status/1942124666421682521',
  },
  {
    id: 'tweet-2',
    label: '@TrumptyMemecoin — Meme Vault Shoutout',
    imageSrc: '/images/tweets/tweet-2.jpg',
    tweetUrl: 'https://x.com/TrumptyMemecoin/status/2110527592302518434',
  },
];

const TARGET_TAPS = 5;

function VaultBoxIcon({ taps, total }: { taps: number; total: number }) {
  const progress = taps / total;
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 text-zinc-100 drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
      fill="none"
    >
      <defs>
        <linearGradient id="boxGlassTop" x1="20" y1="18" x2="100" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="boxGlassLeft" x1="22" y1="42" x2="60" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="boxGlassRight" x1="98" y1="42" x2="60" y2="104" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <polygon
        points="60,18 98,38 60,58 22,38"
        fill="url(#boxGlassTop)"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <polygon
        points="22,38 60,58 60,102 22,82"
        fill="url(#boxGlassLeft)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <polygon
        points="98,38 60,58 60,102 98,82"
        fill="url(#boxGlassRight)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <line x1="41" y1="28" x2="79" y2="48" stroke="rgba(255,255,255,0.38)" strokeWidth="1.5" />
      <line x1="79" y1="28" x2="41" y2="48" stroke="rgba(255,255,255,0.22)" strokeWidth="1.1" strokeDasharray="2 2" />
      <line x1="41" y1="48" x2="41" y2="92" stroke="rgba(255,255,255,0.24)" strokeWidth="1.2" />
      <line x1="79" y1="48" x2="79" y2="92" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

      <circle
        cx="60"
        cy="58"
        r="10"
        fill="rgba(10,10,14,0.75)"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
      />
      <circle
        cx="60"
        cy="58"
        r="6.5"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      <circle
        cx="60"
        cy="58"
        r={2.2 + progress * 1.4}
        fill="#ffffff"
        fillOpacity={0.35 + progress * 0.65}
      />

      <circle cx="27" cy="43" r="1.2" fill="rgba(255,255,255,0.5)" />
      <circle cx="93" cy="43" r="1.2" fill="rgba(255,255,255,0.5)" />
      <circle cx="27" cy="79" r="1.2" fill="rgba(255,255,255,0.35)" />
      <circle cx="93" cy="79" r="1.2" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

function DetailedGamesIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
      <defs>
        <linearGradient id="glassGrad1" x1="10" y1="14" x2="70" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <path
        d="M23 26H57C63.5 26 68.5 31.4 67.9 37.9L66.3 53.5C65.7 59.1 60.9 63 55.3 62.5C52.1 62.2 49.3 60.4 47.7 57.6L45.3 53.4H34.7L32.3 57.6C30.7 60.4 27.9 62.2 24.7 62.5C19.1 63 14.3 59.1 13.7 53.5L12.1 37.9C11.5 31.4 16.5 26 23 26Z"
        fill="url(#glassGrad1)"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M20 26V23.5C20 22.1 21.1 21 22.5 21H29.5C30.9 21 32 22.1 32 23.5V26" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
      <path d="M48 26V23.5C48 22.1 49.1 21 50.5 21H57.5C58.9 21 60 22.1 60 23.5V26" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
      <path
        d="M24 34V44M19 39H29"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="33" cy="46.5" r="3.6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" />
      <circle cx="47" cy="46.5" r="3.6" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.3" />
      <circle cx="55.5" cy="34.5" r="1.7" fill="rgba(255,255,255,0.85)" />
      <circle cx="60" cy="39" r="1.7" fill="rgba(255,255,255,0.6)" />
      <circle cx="55.5" cy="43.5" r="1.7" fill="rgba(255,255,255,0.85)" />
      <circle cx="51" cy="39" r="1.7" fill="rgba(255,255,255,0.6)" />
      <rect x="35.5" y="31" width="9" height="4.5" rx="1.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" />
    </svg>
  );
}

function DetailedWebAppsIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
      <defs>
        <linearGradient id="glassGrad2" x1="12" y1="16" x2="68" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect
        x="12"
        y="17"
        width="56"
        height="46"
        rx="8"
        fill="url(#glassGrad2)"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.6"
      />
      <line x1="12" y1="28" x2="68" y2="28" stroke="rgba(255,255,255,0.35)" strokeWidth="1.3" />
      <circle cx="19" cy="22.5" r="1.5" fill="rgba(255,255,255,0.8)" />
      <circle cx="24" cy="22.5" r="1.5" fill="rgba(255,255,255,0.5)" />
      <circle cx="29" cy="22.5" r="1.5" fill="rgba(255,255,255,0.3)" />
      <rect x="35" y="20.5" width="26" height="4" rx="2" fill="rgba(255,255,255,0.14)" />
      <rect x="17" y="33" width="13" height="24" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
      <rect x="34" y="33" width="29" height="11" rx="3" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.1" />
      <rect x="34" y="47" width="13.5" height="10" rx="2.5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
      <rect x="49.5" y="47" width="13.5" height="10" rx="2.5" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.1" />
      <path d="M45 36.5L42.5 38.5L45 40.5M52 36.5L54.5 38.5L52 40.5" stroke="rgba(255,255,255,0.85)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DetailedTweetsIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-14 sm:h-14" fill="none">
      <defs>
        <linearGradient id="glassGrad3" x1="14" y1="14" x2="66" y2="66" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect
        x="14"
        y="15"
        width="52"
        height="50"
        rx="10"
        fill="url(#glassGrad3)"
        stroke="rgba(255,255,255,0.65)"
        strokeWidth="1.6"
      />
      <circle cx="24.5" cy="25.5" r="4.5" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" />
      <rect x="32.5" y="22.5" width="16" height="2.6" rx="1.3" fill="rgba(255,255,255,0.8)" />
      <rect x="32.5" y="27" width="10" height="2" rx="1" fill="rgba(255,255,255,0.4)" />
      <path
        d="M54 21.5L60 29.5M60 21.5L54 29.5"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="20" y="35.5" width="40" height="2.6" rx="1.3" fill="rgba(255,255,255,0.65)" />
      <rect x="20" y="41" width="33" height="2.6" rx="1.3" fill="rgba(255,255,255,0.45)" />
      <rect x="20" y="46.5" width="24" height="2.6" rx="1.3" fill="rgba(255,255,255,0.3)" />
      <line x1="20" y1="53" x2="60" y2="53" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <circle cx="23" cy="58" r="1.6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" />
      <path d="M35 56.5H39L38 59.5H34L35 56.5Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.1" />
      <path d="M49 57.5C49 56.7 49.7 56.2 50.4 56.7C51.1 56.2 51.8 56.7 51.8 57.5C51.8 58.6 50.4 59.5 50.4 59.5C50.4 59.5 49 58.6 49 57.5Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.1" />
    </svg>
  );
}

export default function Portfolio() {
  const [taps, setTaps] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [isPortrait, setIsPortrait] = useState(
    typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : true
  );
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBoxClick = () => {
    if (isOpen) return;
    const next = taps + 1;
    setTaps(next);
    if (next >= TARGET_TAPS) {
      setIsOpen(true);
      requestAnimationFrame(() => {
        if (bgVideoRef.current) {
          bgVideoRef.current.muted = false;
          bgVideoRef.current.volume = 1.0;
          bgVideoRef.current.play().catch(() => {
            if (bgVideoRef.current) {
              bgVideoRef.current.muted = true;
              setIsMuted(true);
              bgVideoRef.current.play().catch(() => {});
            }
          });
        }
      });
    }
  };

  const toggleSound = () => {
    if (!bgVideoRef.current) return;
    const nextMuted = !bgVideoRef.current.muted;
    bgVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      bgVideoRef.current.play().catch(() => {});
    }
  };

  const navItems = [
    {
      id: 'games' as const,
      label: 'Games',
      sublabel: '2 Telegram Bots',
      IconComponent: DetailedGamesIcon,
    },
    {
      id: 'webapps' as const,
      label: 'Web Apps',
      sublabel: '2 Live Builds',
      IconComponent: DetailedWebAppsIcon,
    },
    {
      id: 'tweets' as const,
      label: 'Tweets',
      sublabel: 'Featured Posts',
      IconComponent: DetailedTweetsIcon,
    },
  ];

  return (
    <div className="w-screen h-screen bg-[#050507] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      {!isOpen && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.05) 0%, rgba(5, 5, 7, 0) 62%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
        </>
      )}

      {/* Full-screen background video rotated 90deg on portrait screens */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 overflow-hidden bg-black ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <video
          ref={bgVideoRef}
          src="/videos/unlock-bg.mp4"
          loop
          playsInline
          preload="auto"
          style={
            isPortrait
              ? {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  width: '100vh',
                  height: '100vw',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  transform: 'translate(-50%, -50%) rotate(90deg)',
                  objectFit: 'cover',
                }
              : {
                  position: 'fixed',
                  inset: 0,
                  width: '100vw',
                  height: '100vh',
                  objectFit: 'cover',
                }
          }
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Top semi-transparent glass status pill + sound toggle */}
      <header className="fixed top-5 inset-x-0 flex items-center justify-center gap-2.5 px-4 z-20 pointer-events-none">
        <div className="px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.45)] flex items-center gap-2.5 text-xs font-mono tracking-wider text-zinc-100">
          <span className="w-2 h-2 rounded-full bg-white/85" />
          {!isOpen ? (
            <span>
              LOCKED VAULT · {taps}/{TARGET_TAPS} TAPS
            </span>
          ) : (
            <span>VAULT UNLOCKED · SELECT MODULE</span>
          )}
        </div>

        {isOpen && (
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute background audio' : 'Mute background audio'}
            className="pointer-events-auto w-9 h-9 rounded-full bg-white/[0.1] hover:bg-white/[0.18] backdrop-blur-xl border border-white/25 flex items-center justify-center text-zinc-100 shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </header>

      {/* Main Center Stage */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="locked-box-stage"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }}
            transition={{ duration: 0.35 }}
            className="z-10 flex flex-col items-center"
          >
            <motion.button
              onClick={handleBoxClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.92, rotate: taps % 2 === 0 ? -2.5 : 2.5 }}
              aria-label="Tap locked box 5 times to unlock"
              className="w-56 h-56 rounded-[32px] bg-white/[0.04] backdrop-blur-2xl border border-white/20 shadow-[0_24px_80px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.18)] flex flex-col items-center justify-center cursor-pointer relative group hover:bg-white/[0.07] hover:border-white/35 transition-colors"
            >
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

              <div className="mb-3 transition-transform duration-300 group-hover:scale-105">
                <VaultBoxIcon taps={taps} total={TARGET_TAPS} />
              </div>

              <div className="flex gap-1.5 mb-2">
                {Array.from({ length: TARGET_TAPS }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                      idx < taps
                        ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>

              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-mono">
                {taps === 0 ? 'Tap to unlock' : `${TARGET_TAPS - taps} left`}
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked-2d-icons"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 flex flex-wrap items-center justify-center gap-4 sm:gap-7 max-w-2xl"
          >
            {navItems.map(({ id, label, sublabel, IconComponent }, index) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 26, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ y: -7, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveSection(id)}
                className="w-32 h-36 sm:w-40 sm:h-44 rounded-[26px] sm:rounded-[28px] bg-white/[0.11] hover:bg-white/[0.18] backdrop-blur-2xl border border-white/25 hover:border-white/45 shadow-[0_20px_60px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.28)] flex flex-col items-center justify-center p-3.5 sm:p-4 cursor-pointer relative group transition-all"
              >
                <div className="absolute inset-0 rounded-[26px] sm:rounded-[28px] bg-gradient-to-b from-white/[0.14] via-transparent to-black/15 pointer-events-none" />

                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.08] border border-white/20 group-hover:border-white/40 group-hover:bg-white/[0.14] flex items-center justify-center mb-2.5 sm:mb-3 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    <IconComponent />
                  </div>
                </div>

                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-sm">
                  {label}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-zinc-200/80 mt-0.5">
                  {sublabel}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Semi-transparent Glassmorphic Content Modal */}
      <AnimatePresence>
        {activeSection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSection(null)}
            className="fixed inset-0 bg-black/65 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 18 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-zinc-950/75 backdrop-blur-2xl border border-white/20 shadow-[0_32px_100px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.16)] p-6 sm:p-8 relative"
            >
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/15">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                    {activeSection === 'games' && 'Games'}
                    {activeSection === 'webapps' && 'Web Apps'}
                    {activeSection === 'tweets' && 'Featured Posts'}
                  </h2>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    {activeSection === 'games' && 'Tap any gameplay preview to launch the bot'}
                    {activeSection === 'webapps' && 'Tap any project card to open the live web app'}
                    {activeSection === 'tweets' && 'Tap any post to view on X'}
                  </p>
                </div>

                <button
                  onClick={() => setActiveSection(null)}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center text-zinc-200 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {activeSection === 'games' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {GAMES_DATA.map((game) => (
                    <a
                      key={game.id}
                      href={game.playUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-2xl bg-white/[0.06] border border-white/15 hover:border-white/35 overflow-hidden transition-all"
                    >
                      <div className="aspect-[9/16] max-h-[420px] w-full bg-black relative overflow-hidden flex items-center justify-center">
                        <video
                          src={game.videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-medium text-white flex items-center gap-1.5">
                          <span>Play</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between border-t border-white/15 bg-black/30">
                        <span className="font-medium text-sm text-zinc-100 group-hover:text-white">
                          {game.title}
                        </span>
                        <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200">
                          Telegram ↗
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {activeSection === 'webapps' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {WEB_APPS_DATA.map((app) => (
                    <a
                      key={app.id}
                      href={app.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col rounded-2xl bg-white/[0.06] border border-white/15 hover:border-white/35 overflow-hidden transition-all"
                    >
                      <div className="aspect-video w-full bg-zinc-900 overflow-hidden relative">
                        <img
                          src={app.imageSrc}
                          alt={app.title}
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between border-t border-white/15 bg-black/30">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h3 className="font-semibold text-base text-zinc-100 group-hover:text-white">
                              {app.title}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-white shrink-0" />
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {activeSection === 'tweets' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  {TWEETS_DATA.map((tweet) => (
                    <a
                      key={tweet.id}
                      href={tweet.tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-2xl bg-white/[0.06] border border-white/15 hover:border-white/35 overflow-hidden transition-all"
                    >
                      <div className="w-full bg-black overflow-hidden">
                        <img
                          src={tweet.imageSrc}
                          alt={tweet.label}
                          className="w-full h-auto object-contain group-hover:scale-[1.015] transition-transform duration-300"
                        />
                      </div>
                      <div className="px-4 py-3 flex items-center justify-between border-t border-white/15 bg-black/35">
                        <span className="text-xs text-zinc-200 truncate pr-2">
                          {tweet.label}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-white shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
