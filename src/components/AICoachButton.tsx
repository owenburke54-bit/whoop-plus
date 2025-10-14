"use client";

import { useState } from 'react';
import AICoachOverlay from '@/components/AICoachOverlay';

export default function AICoachButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Coach"
        className={
          "fixed bottom-4 right-4 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-105 hover:bg-emerald-600 focus:outline-none " +
          (!open ? "animate-pulse" : "")
        }
      >
        AI Coach
      </button>
      <AICoachOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}


