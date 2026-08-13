"use client";

import * as React from "react";
import { BuildSelection } from "@/lib/build-engine";
import { partById, Part } from "@/lib/parts";

// Proporciones de la torre según el formato de la caja elegida.
const TOWER: Record<string, { w: number; h: number }> = {
  "case-itx": { w: 150, h: 235 },
  "case-matx": { w: 175, h: 285 },
  "case-atx": { w: 200, h: 340 },
  "case-atx-tg": { w: 200, h: 340 },
  "case-eatx": { w: 230, h: 395 },
};

// Grosor de la GPU según su gama (VRAM como indicador).
function gpuThickness(gpu?: Part): number {
  const vram = gpu?.vramGb ?? 8;
  if (vram >= 20) return 40;
  if (vram >= 12) return 32;
  return 26;
}

// Tamaño relativo del monitor según pulgadas y formato.
function monitorDims(mon: Part): { w: number; h: number } {
  const inches = parseInt(mon.monitorSize ?? "27", 10);
  const w = { 24: 180, 27: 200, 32: 225, 34: 250, 49: 300 }[inches] ?? 200;
  const ratio = inches === 49 ? 0.36 : inches === 34 ? 0.43 : 0.5625;
  return { w, h: Math.round(w * ratio) };
}

const trunc = (s: string, n = 18) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export function BuildRender({ selection, className }: { selection: BuildSelection; className?: string }) {
  const uid = React.useId().replace(/:/g, "");

  const pick = (k: keyof BuildSelection) => (selection[k] ? partById(selection[k]!) : undefined);
  const cpu = pick("cpu");
  const mb = pick("motherboard");
  const gpu = pick("gpu");
  const ram = pick("ram");
  const storage = pick("storage");
  const cooling = pick("cooling");
  const psu = pick("psu");
  const box = pick("case");
  const os = pick("os");
  const mon = selection.monitor && selection.monitor !== "none" ? partById(selection.monitor) : undefined;

  const isAio = Boolean(cooling?.radiatorSupport);
  const aioFans = isAio ? Math.max(1, Math.min(3, Math.round((cooling?.radiatorSupport ?? 120) / 120))) : 0;
  const dualTower = !isAio && (cooling?.height ?? 0) >= 160;
  const rgb = selection.extra === "extra-rgb-kit";
  const isTG = box?.id === "case-atx-tg";

  const tower = TOWER[box?.id ?? "case-atx"] ?? TOWER["case-atx"];
  const FLOOR = 480;
  const tx = mon ? 140 : 340;
  const ty = FLOOR - tower.h;
  const wx = tx + 14;
  const wy = ty + 42;
  const ww = tower.w - 28;
  const wh = tower.h - 110;

  const gpuTh = gpuThickness(gpu);
  const gpuY = wy + wh * 0.58;
  const gpuW = ww * 0.8;

  const legendParts = [cpu, ram, storage, mb, os]
    .filter((p): p is Part => Boolean(p))
    .map((p) => trunc(p.name));

  const fanSpokes = (cx: number, cy: number, r: number) => (
    <g stroke="#4fd1ff" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round">
      <path d={`M${cx} ${cy} l0 ${-r * 0.7}`} />
      <path d={`M${cx} ${cy} l${r * 0.6} ${r * 0.36}`} />
      <path d={`M${cx} ${cy} l${-r * 0.6} ${r * 0.36}`} />
    </g>
  );

  return (
    <svg
      viewBox="0 0 880 560"
      className={className ?? "h-auto w-full"}
      role="img"
      aria-label="Visualización orientativa del equipo configurado"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="880" y2="560">
          <stop stopColor="#0a0a12" />
          <stop offset="1" stopColor="#0e0e18" />
        </linearGradient>
        <linearGradient id={`${uid}-acc`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4fd1ff" />
          <stop offset="1" stopColor="#bfeaff" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4fd1ff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#bfeaff" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <rect width="880" height="560" fill={`url(#${uid}-bg)`} rx="16" />
      <circle cx={tx + tower.w / 2} cy="280" r="220" stroke="#4fd1ff" strokeOpacity="0.1" />
      <path d={`M40 ${FLOOR} h800`} stroke="#2b2e3c" strokeWidth="2" />

      {/* Torre */}
      <g>
        <rect x={tx} y={ty} width={tower.w} height={tower.h} rx="12" fill="#181a24" stroke="#3a3d4d" strokeWidth="2.5" />
        <path d={`M${tx} ${ty + 12} h${tower.w} v16 h${-tower.w} z`} fill="#1f222e" />
        {/* Ventana lateral */}
        <rect x={wx} y={wy} width={ww} height={wh} rx="8" fill="#0e0f16" stroke="#2b2e3c" strokeWidth="2" />

        {/* Refrigeración */}
        {isAio ? (
          <g>
            <rect
              x={wx + (ww - aioFans * 46) / 2}
              y={wy + 6}
              width={aioFans * 46}
              height={16}
              rx="4"
              fill="#15161f"
              stroke="#3a3d4d"
              strokeWidth="2"
            />
            {Array.from({ length: aioFans }).map((_, i) => {
              const cx = wx + (ww - aioFans * 46) / 2 + 23 + i * 46;
              const cy = wy + 42;
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="17" fill="#0e0f16" stroke={`url(#${uid}-acc)`} strokeWidth="2" />
                  {fanSpokes(cx, cy, 17)}
                </g>
              );
            })}
            <path
              d={`M${wx + ww / 2 - aioFans * 20} ${wy + 56} C ${wx + 40} ${wy + 70} ${wx + 34} ${wy + 90} ${wx + 30} ${wy + 104}`}
              stroke="#4fd1ff"
              strokeOpacity="0.45"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx={wx + 30} cy={wy + 116} r="15" fill="#15161f" stroke={`url(#${uid}-acc)`} strokeWidth="2" />
            <circle cx={wx + 30} cy={wy + 116} r="5" fill="#4fd1ff" fillOpacity="0.7" />
          </g>
        ) : (
          <g>
            {(dualTower ? [0, 1] : [0]).map((i) => {
              const bx = wx + 14 + i * 44;
              return (
                <g key={i}>
                  <rect x={bx} y={wy + 40} width="30" height="92" rx="4" fill="#15161f" stroke="#3a3d4d" strokeWidth="2" />
                  <g stroke="#3a3d4d" strokeWidth="1.5">
                    <path d={`M${bx} ${wy + 56} h30`} />
                    <path d={`M${bx} ${wy + 72} h30`} />
                    <path d={`M${bx} ${wy + 88} h30`} />
                    <path d={`M${bx} ${wy + 104} h30`} />
                  </g>
                </g>
              );
            })}
            <circle
              cx={wx + (dualTower ? 59 : 29)}
              cy={wy + 86}
              r={dualTower ? 12 : 17}
              fill="#0e0f16"
              stroke={`url(#${uid}-acc)`}
              strokeWidth="2"
            />
            {fanSpokes(wx + (dualTower ? 59 : 29), wy + 86, dualTower ? 12 : 17)}
          </g>
        )}
        {cooling && (
          <text x={tx + tower.w / 2} y={ty + 34} textAnchor="middle" fill="#9aa3b5" fontFamily="Arial" fontSize="10">
            {trunc(cooling.name, 24)}
          </text>
        )}

        {/* GPU */}
        {gpu && (
          <g>
            <rect x={wx + 8} y={gpuY} width={gpuW} height={gpuTh} rx="6" fill="#12131c" stroke={`url(#${uid}-acc)`} strokeWidth="2" />
            <circle cx={wx + 8 + gpuW * 0.28} cy={gpuY + gpuTh / 2} r={gpuTh / 2 - 5} fill="#0e0f16" stroke="#3a3d4d" strokeWidth="1.5" />
            <circle cx={wx + 8 + gpuW * 0.72} cy={gpuY + gpuTh / 2} r={gpuTh / 2 - 5} fill="#0e0f16" stroke="#3a3d4d" strokeWidth="1.5" />
            <text x={wx + 8 + gpuW / 2} y={gpuY + gpuTh + 14} textAnchor="middle" fill="#9aa3b5" fontFamily="Arial" fontSize="10">
              {trunc(gpu.name, 26)}
            </text>
          </g>
        )}

        {/* Fuente / shroud */}
        <rect x={wx} y={wy + wh - 22} width={ww} height="20" rx="4" fill="#1d1f2a" />
        {psu && (
          <text x={wx + ww / 2} y={wy + wh - 8} textAnchor="middle" fill="#6b7280" fontFamily="Arial" fontSize="9">
            {trunc(psu.name, 26)}
          </text>
        )}

        {/* Tiras RGB (solo si el extra RGB está seleccionado) */}
        {rgb && (
          <g>
            <rect x={tx + 3} y={ty + 36} width="4" height={tower.h - 80} rx="2" fill={`url(#${uid}-acc)`} fillOpacity="0.85" />
            <rect x={wx + ww - 6} y={wy + 4} width="3" height={wh - 8} rx="1.5" fill="#4fd1ff" fillOpacity="0.6" />
          </g>
        )}

        {/* Cristal templado */}
        {isTG && (
          <g>
            <rect x={wx} y={wy} width={ww} height={wh} rx="8" fill={`url(#${uid}-glass)`} stroke="#4fd1ff" strokeOpacity="0.35" strokeWidth="1.5" />
            <g stroke="#bfeaff" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round">
              <path d={`M${wx + 12} ${wy + 4} l${ww * 0.4} ${wh - 8}`} />
              <path d={`M${wx + ww * 0.45} ${wy + 4} l${ww * 0.35} ${wh - 8}`} />
            </g>
          </g>
        )}

        {/* Pies */}
        <path d={`M${tx + 10} ${FLOOR} v8 M${tx + tower.w - 10} ${FLOOR} v8`} stroke="#3a3d4d" strokeWidth="6" />
        {box && (
          <text x={tx + tower.w / 2} y={FLOOR + 26} textAnchor="middle" fill="#9aa3b5" fontFamily="Arial" fontSize="11">
            {trunc(box.name, 30)}
          </text>
        )}
      </g>

      {/* Monitor */}
      {mon && (
        <g>
          {(() => {
            const { w: sw, h: sh } = monitorDims(mon);
            const cx = 660;
            const sy = FLOOR - 40 - sh;
            return (
              <g>
                <rect x={cx - sw / 2} y={sy} width={sw} height={sh} rx="8" fill="#0e0f16" stroke={`url(#${uid}-acc)`} strokeWidth="2.5" />
                <rect x={cx - sw / 2 + 8} y={sy + 8} width={sw - 16} height={sh - 16} rx="5" fill="#12131c" />
                <path
                  d={`M${cx - sw / 2 + 22} ${sy + sh * 0.3} h${sw * 0.4}`}
                  stroke="#4fd1ff"
                  strokeOpacity="0.3"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <text
                  x={cx}
                  y={sy + sh / 2 + 8}
                  textAnchor="middle"
                  fill="#4fd1ff"
                  fontFamily="Arial"
                  fontSize="22"
                  fontWeight="700"
                >
                  {mon.refreshHz} Hz
                </text>
                <path d={`M${cx} ${sy + sh} v40`} stroke="#3a3d4d" strokeWidth="8" />
                <path d={`M${cx - 34} ${FLOOR} h68`} stroke="#3a3d4d" strokeWidth="8" strokeLinecap="round" />
                <text x={cx} y={FLOOR + 26} textAnchor="middle" fill="#9aa3b5" fontFamily="Arial" fontSize="11">
                  {trunc(mon.name, 30)}
                </text>
              </g>
            );
          })()}
        </g>
      )}

      {/* Leyenda con el resto de piezas */}
      {legendParts.length > 0 && (
        <text x="440" y="540" textAnchor="middle" fill="#6b7280" fontFamily="Arial" fontSize="11">
          {legendParts.join("  ·  ")}
        </text>
      )}
    </svg>
  );
}
