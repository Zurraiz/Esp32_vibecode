'use client';

import React, { useEffect, useState, useRef } from 'react';

type Signal = 'scan' | 'card' | 'pin' | 'grant' | 'deny';

const CORRECT_PIN = '0000';

const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

function Node({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={`px-4 py-2.5 rounded-xl border-2 text-center text-xs
      font-semibold transition-all duration-200 ${
      active
        ? 'bg-[#2E4862] text-white border-[#2E4862] scale-105'
        : 'bg-white text-gray-600 border-gray-200'
    }`}>
      {label}
    </div>
  );
}

function BranchRow({
  left, right, signal,
}: {
  left: string; right: string; signal: Signal;
}) {
  return (
    <div className="flex justify-between gap-2">
      <div className={`flex-1 px-3 py-2 rounded-lg border-2 text-center
        text-[10px] font-semibold transition-all duration-200 ${
        signal === 'deny'
          ? 'bg-red-50 border-red-300 text-red-700'
          : 'bg-white border-gray-200 text-gray-400'
      }`}>
        {left}
      </div>
      <div className={`flex-1 px-3 py-2 rounded-lg border-2 text-center
        text-[10px] font-semibold transition-all duration-200 ${
        signal === 'grant' || signal === 'card'
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
          : 'bg-white border-gray-200 text-gray-400'
      }`}>
        {right}
      </div>
    </div>
  );
}

export default function SignalTreeVaultSystem() {
  const [swipe, setSwipe] = useState(0);
  const [pin, setPin] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);
  const [signal, setSignal] = useState<Signal>('scan');

  const swipeRef = useRef(swipe);
  const pinRef = useRef(pin);
  swipeRef.current = swipe;
  pinRef.current = pin;

  const isCardScanned = swipe > 70;

  useEffect(() => {
    let cancelled = false;

    const loop = async () => {
      while (!cancelled) {
        setSignal('scan');
        await wait(600);
        if (cancelled) break;

        if (swipeRef.current <= 70) {
          setAccessGranted(false);
          setSignal('deny');
          await wait(800);
          continue;
        }

        setSignal('card');
        await wait(600);
        if (cancelled) break;

        if (pinRef.current === CORRECT_PIN) {
          setAccessGranted(true);
          setSignal('grant');
          await wait(1200);
        } else {
          setAccessGranted(false);
          setSignal('deny');
          await wait(800);
        }
      }
    };

    loop();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔐 Nested Logic — Signal Flow Security System
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          This system uses <span className="font-semibold text-[#2E4862]">
          nested conditions</span> — a condition inside another condition.
          Swipe the card past 70%, then enter the correct PIN (0000)
          to see both conditions pass and the vault open.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: inputs */}
        <div className="flex flex-col gap-4">

          {/* Card swipe */}
          <div className={`rounded-xl border-2 p-4 transition-all duration-200 ${
            isCardScanned
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-gray-200 bg-white'
          }`}>
            <p className="text-xs font-bold text-[#2E4862] mb-2">
              🪪 Card Swipe Sensor
            </p>
            <input
              type="range" min={0} max={100} value={swipe}
              onChange={e => setSwipe(Number(e.target.value))}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0%</span>
              <span className={`font-bold font-mono ${
                isCardScanned ? 'text-emerald-600' : 'text-[#2E4862]'
              }`}>{swipe}%</span>
              <span>100%</span>
            </div>
            <div className={`mt-2 rounded-lg px-3 py-2 text-center text-xs
              font-semibold border transition-all ${
              isCardScanned
                ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}>
              {isCardScanned ? '✅ CARD DETECTED' : 'Swipe past 70% →'}
            </div>
          </div>

          {/* PIN pad */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-xs font-bold text-[#2E4862] mb-2">
              🔢 PIN Entry
            </p>
            <div className="bg-[#0d1117] text-green-400 font-mono text-xl
              tracking-[8px] py-3 rounded-lg text-center mb-3">
              {pin.padEnd(4, '−')}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} type="button"
                  onClick={() => setPin(p => p.length < 4 ? p + n : p)}
                  className="bg-gray-50 border border-gray-200 rounded-lg
                    py-2 text-xs font-bold text-gray-700 hover:bg-gray-100
                    transition-colors">
                  {n}
                </button>
              ))}
              <button type="button"
                onClick={() => setPin('')}
                className="bg-red-50 border border-red-200 rounded-lg py-2
                  text-xs font-bold text-red-600 hover:bg-red-100
                  transition-colors">
                C
              </button>
              <button type="button"
                onClick={() => setPin(p => p.length < 4 ? p + '0' : p)}
                className="bg-gray-50 border border-gray-200 rounded-lg
                  py-2 text-xs font-bold text-gray-700 hover:bg-gray-100
                  transition-colors">
                0
              </button>
              <button type="button"
                onClick={() => setPin('0000')}
                className="bg-emerald-50 border border-emerald-200 rounded-lg
                  py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100
                  transition-colors">
                ✓
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              Hint: correct PIN is 0000
            </p>
          </div>
        </div>

        {/* Right: signal tree + vault */}
        <div className="flex flex-col gap-4">

          {/* Signal tree */}
          <div className="rounded-xl bg-white border border-gray-200 p-4
            shadow-sm flex flex-col gap-2">
            <p className="text-xs font-bold text-[#2E4862] mb-1">
              Signal Execution Tree
            </p>
            <Node active={signal === 'scan'} label="🔁 START LOOP" />
            <div className="text-center text-gray-300 text-xs">↓</div>
            <Node
              active={signal === 'scan' || signal === 'card'}
              label="IF card > 70%?"
            />
            <BranchRow
              left="NO → deny"
              right="YES → check PIN"
              signal={signal}
            />
            <div className="text-center text-gray-300 text-xs">↓</div>
            <Node active={signal === 'card'} label="IF pin == 0000?" />
            <BranchRow
              left="NO → deny"
              right="YES → grant"
              signal={signal}
            />
          </div>

          {/* Vault */}
          <div className="rounded-xl bg-white border border-gray-200 p-4
            shadow-sm flex flex-col items-center gap-3 flex-1
            min-h-[140px] justify-center">
            <p className="text-xs font-bold text-[#2E4862] self-start">
              Smart Vault
            </p>
            <div className="text-6xl transition-all duration-500">
              {accessGranted ? '🔓' : '🔒'}
            </div>
            <p className={`text-sm font-bold ${
              accessGranted ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {accessGranted ? 'VAULT OPEN' : 'VAULT LOCKED'}
            </p>
            <p className="text-[10px] text-gray-400 text-center">
              {accessGranted
                ? 'Both conditions TRUE — access granted'
                : isCardScanned
                ? 'Card OK — waiting for correct PIN'
                : 'First condition FALSE — PIN never checked'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="rounded-xl border border-[#2E4862]/20 bg-[#2E4862]/5
        px-4 py-3 text-xs text-[#2E4862] leading-relaxed font-medium">
        💡 Notice: when the card is not swiped, the PIN check is
        <span className="font-bold"> never reached</span> — the first
        condition blocks it entirely. This is nested logic: one condition
        lives inside another.
      </div>

    </div>
  );
}
