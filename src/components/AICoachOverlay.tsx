"use client";

import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AICoachOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { metrics } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi, I\'m your AI Coach. Ask about hydration, recovery, or strain.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (!open) setInput(''); }, [open]);

  if (!open) return null;

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');

    // Minimal local response stub using mock data
    const latest = metrics[metrics.length - 1];
    let reply = "I'm here.";
    if (/hydration/i.test(text)) {
      reply = `Hydration is ${latest.hydrationScore}% today (${latest.hydrationIntakeMl} ml).`;
    } else if (/recovery/i.test(text)) {
      reply = `Recovery is ${latest.recoveryScore}% with HRV ~${Math.round(latest.hrv)} ms.`;
    } else if (/strain/i.test(text)) {
      reply = `Strain is ${latest.strainScore.toFixed(1)} today.`;
    }
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }, 300);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60">
      <div className="absolute bottom-0 right-0 m-4 w-full max-w-md overflow-hidden rounded-lg border border-gray-800 bg-gray-950 shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-800 px-3 py-2">
          <div className="text-sm font-medium text-gray-200">AI Coach</div>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-xs text-gray-400 hover:bg-gray-800">Close</button>
        </div>
        <div className="max-h-80 overflow-y-auto p-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={
                'mb-2 inline-block rounded-md px-3 py-2 text-sm ' +
                (m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-gray-900 text-gray-200')
              }>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="border-t border-gray-800 p-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask about your metrics..."
            className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500"
          />
          <div className="mt-2 text-right">
            <button onClick={send} className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-white">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}


