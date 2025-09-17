
"use client";
import React, { useEffect, useMemo, useState } from "react";

const TOKEN_MINT = process.env.NEXT_PUBLIC_EZZI_MINT || "YOUR_EZZI_TOKEN_MINT";
const DEXSCREENER_URL = `https://dexscreener.com/solana/${TOKEN_MINT}`;
const SOLSCAN_URL = `https://solscan.io/token/${TOKEN_MINT}`;
const JUPITER_SWAP_URL = `https://jup.ag/swap/SOL-EZZI?inputMint=So11111111111111111111111111111111111111112&outputMint=${TOKEN_MINT}`;
const EMBED_JUPITER = false;

async function getTokenStats(){return new Promise((r)=>setTimeout(()=>r({price:0.000123,liquidityUsd:12450,mcUsd:523000}),300))}
async function getHolders(){return new Promise((r)=>setTimeout(()=>r(1387),200))}

const fmt = new Intl.NumberFormat(undefined,{maximumFractionDigits:6});
const money = new Intl.NumberFormat(undefined,{style:"currency",currency:"USD",maximumFractionDigits:0});

function useAnimatedNumber(target=0){
  const [val,setVal]=useState(0);
  useEffect(()=>{ if(!target) return; let id=0; const tick=()=>{ setVal(v=>{const d=target-v; const inc=Math.max(1,Math.floor(d/15)); return d<=0?target:v+inc}); id=requestAnimationFrame(tick)}; id=requestAnimationFrame(tick); return ()=>cancelAnimationFrame(id)},[target]);
  return val;
}

const LEVEL_LABELS=["S","A","B","C"];
const CHARACTERS=[
  {name:"Astra",level:"S",title:"Celestial Vanguard",img:"https://picsum.photos/seed/astra/400/480"},
  {name:"Nyx",level:"S",title:"Shadow Weaver",img:"https://picsum.photos/seed/nyx/400/480"},
  {name:"Zaros",level:"S",title:"Storm Warden",img:"https://picsum.photos/seed/zaros/400/480"},
  {name:"Kael",level:"A",title:"Bladewind Scout",img:"https://picsum.photos/seed/kael/400/480"},
  {name:"Lyra",level:"A",title:"Prism Ranger",img:"https://picsum.photos/seed/lyra/400/480"},
  {name:"Doran",level:"A",title:"Runesmith",img:"https://picsum.photos/seed/doran/400/480"},
  {name:"Mira",level:"B",title:"Arc Splicer",img:"https://picsum.photos/seed/mira/400/480"},
  {name:"Rook",level:"B",title:"Bulwark",img:"https://picsum.photos/seed/rook/400/480"},
  {name:"Vale",level:"B",title:"Drift Walker",img:"https://picsum.photos/seed/vale/400/480"},
  {name:"Ivo",level:"C",title:"Spark Tinker",img:"https://picsum.photos/seed/ivo/400/480"},
  {name:"Sana",level:"C",title:"Wind Dancer",img:"https://picsum.photos/seed/sana/400/480"},
  {name:"Tarin",level:"C",title:"Pathfinder",img:"https://picsum.photos/seed/tarin/400/480"},
];

export default function EzziLanding(){
  const [loading,setLoading]=useState(true);
  const [price,setPrice]=useState(0);
  const [holders,setHolders]=useState(0);
  const [liquidity,setLiquidity]=useState(0);
  const [marketCap,setMarketCap]=useState(0);
  const [rewards,setRewards]=useState(275_000);
  const [activeLevel,setActiveLevel]=useState("S");

  useEffect(()=>{(async()=>{try{const[stats,h]=await Promise.all([getTokenStats(),getHolders()]); setPrice(stats.price||0); setLiquidity(stats.liquidityUsd||0); setMarketCap(stats.mcUsd||0); setHolders(h||0)}finally{setLoading(false)}})()},[]);

  const rewardsAnimated=useAnimatedNumber(rewards);
  const kpis=useMemo(()=>[{label:"Current Price",value:price?`$${fmt.format(price)}`:"—"},{label:"Holders",value:holders?fmt.format(holders):"—"},{label:"Liquidity",value:liquidity?money.format(liquidity):"—"},{label:"Market Cap",value:marketCap?money.format(marketCap):"—"}], [price,holders,liquidity,marketCap]);
  const visibleChars=useMemo(()=>CHARACTERS.filter(c=>c.level===activeLevel),[activeLevel]);

  return (<div className="min-h-screen selection:bg-fuchsia-500/40">
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-lg"/><span className="font-semibold tracking-wide">EZZI</span>
        </div>
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a href="#stats" className="opacity-80 hover:opacity-100">Stats</a>
          <a href="#buy" className="opacity-80 hover:opacity-100">Buy</a>
          <a href="#rewards" className="opacity-80 hover:opacity-100">DHB Rewards</a>
          <a href="#characters" className="opacity-80 hover:opacity-100">Characters</a>
          <a href="#map" className="opacity-80 hover:opacity-100">World Map</a>
          <a href="#links" className="opacity-80 hover:opacity-100">Explorer</a>
        </nav>
        <a href={JUPITER_SWAP_URL} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-2xl bg-white text-slate-900 font-semibold hover:opacity-90">Buy on Jupiter</a>
      </div>
    </header>

    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-600/10 via-slate-900 to-slate-950"/>
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight">EZZI • Solana Meme Utility</h1>
            <p className="mt-4 text-slate-300 max-w-prose">Real-time stats, Jupiter buy, DHB rewards, 12 characters by level, and a world map.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={JUPITER_SWAP_URL} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl bg-fuchsia-500 font-semibold hover:brightness-110">Buy on Jupiter</a>
              <a href={DEXSCREENER_URL} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-white/15 hover:border-white/30">Dexscreener</a>
              <a href={SOLSCAN_URL} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-white/15 hover:border-white/30">Solscan</a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6" id="stats">
            <div className="grid grid-cols-2 gap-4">
              {kpis.map(k=>(<div key={k.label} className="rounded-2xl bg-slate-900/60 border border-white/10 p-4">
                <div className="text-xs uppercase tracking-wider text-slate-400">{k.label}</div>
                <div className="mt-2 text-xl md:text-2xl font-extrabold">{loading?"…":k.value}</div>
              </div>))}
            </div>
            <div className="mt-4 text-xs text-slate-400">* Hook up live APIs to auto-refresh.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="buy" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold">Instant Buy via Jupiter</h2>
      <p className="mt-2 text-slate-300">Use the button or enable the embedded widget below.</p>
      {EMBED_JUPITER ? (<div className="mt-6 rounded-3xl overflow-hidden border border-white/10 bg-slate-900">
        <iframe title="Jupiter Swap" src={`https://jup.ag/swap/${TOKEN_MINT}?theme=dark`} className="w-full h-[680px]" loading="lazy"/></div>) : (
        <div className="mt-6 flex flex-wrap gap-4">
          <a href={JUPITER_SWAP_URL} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl bg-fuchsia-500 font-semibold hover:brightness-110">Buy on Jupiter</a>
          <a href={DEXSCREENER_URL} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl border border-white/15 hover:border-white/30">View on Dexscreener</a>
          <a href={SOLSCAN_URL} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl border border-white/15 hover:border-white/30">Open in Solscan</a>
        </div>)}
    </section>

    <section id="rewards" className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-3xl border border-white/10 p-6 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div><h3 className="text-xl md:text-2xl font-bold">DHB Rewards Counter</h3>
          <p className="text-slate-300 mt-1 max-w-prose">Displays the total DHB accumulated for EZZI holders. Wire this to your backend.</p></div>
          <div className="text-3xl md:text-5xl font-black tabular-nums">{fmt.format(rewardsAnimated)} <span className="text-sm md:text-base font-semibold text-slate-400">DHB</span></div>
        </div>
      </div>
    </section>

    <section id="characters" className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Characters</h2>
        <div className="flex gap-2">{LEVEL_LABELS.map(lvl=>(<button key={lvl} onClick={()=>setActiveLevel(lvl)} className={`px-4 py-2 rounded-xl border ${activeLevel===lvl?"bg-fuchsia-500 border-fuchsia-400":"border-white/15"}`}>Level {lvl}</button>))}</div>
      </div>
      <p className="text-slate-300 mb-4">12 heroes total — 3 per level. Switch levels to preview.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleChars.map(c=>(<div key={c.name} className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60">
          <div className="aspect-[4/5] bg-slate-800/50"><img src={c.img} alt={c.name} className="w-full h-full object-cover"/></div>
          <div className="p-4"><div className="text-xs uppercase tracking-wider text-slate-400">Level {c.level}</div>
          <div className="text-lg font-semibold">{c.name}</div><div className="text-slate-300 text-sm">{c.title}</div></div>
        </div>))}
      </div>
    </section>

    <section id="map" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">World Map</h2>
      <p className="text-slate-300 mb-6">Adventure‑manga‑inspired world map (preview). Replace this SVG later with your own art.</p>
      <div className="rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
        <svg viewBox="0 0 1200 600" className="w-full h-[420px]">
          <defs>
            <linearGradient id="coast" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#94a3b8"/><stop offset="100%" stopColor="#334155"/></linearGradient>
          </defs>
          <rect x="0" y="0" width="1200" height="600" fill="#0b1220"/>
          <g>
            <path d="M200,180 C260,120 360,120 420,180 C480,240 420,300 340,320 C260,340 160,260 200,180 Z" fill="#1f2937" stroke="url(#coast)" strokeWidth="3"/>
            <path d="M760,120 C840,80 960,120 980,200 C1000,280 900,320 820,300 C740,280 700,180 760,120 Z" fill="#1f2937" stroke="url(#coast)" strokeWidth="3"/>
            <path d="M520,360 C580,320 700,340 720,400 C740,460 640,520 560,500 C500,480 480,400 520,360 Z" fill="#1f2937" stroke="url(#coast)" strokeWidth="3"/>
          </g>
          <g stroke="#f472b6" strokeWidth="3" strokeDasharray="10 8" fill="none">
            <path d="M340,300 C500,280 660,260 820,280"/>
            <path d="M580,420 C600,360 700,300 900,240"/>
          </g>
          <g><circle cx="340" cy="300" r="8" fill="#22d3ee"/><circle cx="820" cy="280" r="8" fill="#22d3ee"/><circle cx="580" cy="420" r="8" fill="#22d3ee"/><circle cx="900" cy="240" r="8" fill="#22d3ee"/></g>
        </svg>
      </div>
    </section>

    <section id="links" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold">Direct Links</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href={DEXSCREENER_URL} target="_blank" rel="noreferrer" className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-white/25"><div className="text-lg font-semibold">Dexscreener</div><div className="text-slate-400 text-sm mt-1">Live markets & charts</div></a>
        <a href={SOLSCAN_URL} target="_blank" rel="noreferrer" className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-white/25"><div className="text-lg font-semibold">Solscan</div><div className="text-slate-400 text-sm mt-1">Contracts, holders, distributions</div></a>
        <a href={JUPITER_SWAP_URL} target="_blank" rel="noreferrer" className="rounded-2xl p-5 bg-slate-900/60 border border-white/10 hover:border-white/25"><div className="text-lg font-semibold">Buy on Jupiter</div><div className="text-slate-400 text-sm mt-1">One-tap purchase</div></a>
      </div>
    </section>

    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} EZZI. All rights reserved.</div>
        <div className="flex flex-wrap gap-3"><span className="opacity-80">Mint:</span><code className="px-2 py-1 rounded-lg bg-slate-900/70 border border-white/10">{TOKEN_MINT}</code></div>
      </div>
    </footer>
  </div>);
}
