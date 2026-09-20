import React, { useMemo } from 'react';
import { LifeReceipt } from '../../types/receipt';
import { Sparkles, Clock, Calendar } from 'lucide-react';

interface LifeRhythmChartProps {
  receipts: LifeReceipt[];
  onSelectHour?: (hour: number) => void;
  onSelectDay?: (day: string) => void;
}

export const LifeRhythmChart: React.FC<LifeRhythmChartProps> = ({ receipts, onSelectHour, onSelectDay }) => {
  // 24-hour distribution
  const hourCounts = useMemo(() => {
    const counts = new Array(24).fill(0);
    receipts.forEach(r => {
      const h = new Date(r.timestamp).getHours();
      counts[h] += 1;
    });
    return counts;
  }, [receipts]);

  const maxHourCount = Math.max(...hourCounts, 1);

  // Day of week distribution
  const dayCounts = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    receipts.forEach(r => {
      const dStr = days[new Date(r.timestamp).getDay()];
      counts[dStr] += 1;
    });
    return counts;
  }, [receipts]);

  const maxDayCount = Math.max(...Object.values(dayCounts), 1);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-extrabold text-white tracking-tight">Life Rhythm Matrix</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            24-hour activity heat distribution. Click any hour bar to filter matching receipts.
          </p>
        </div>
      </div>

      {/* 24 Hour Activity Bar Grid */}
      <div className="space-y-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
          Activity Density by Hour of Day
        </h4>

        <div className="grid grid-cols-12 gap-1.5 pt-4 pb-2 items-end h-36 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {hourCounts.slice(0, 12).map((count, hr) => {
            const pct = Math.round((count / maxHourCount) * 100);
            const isNight = hr >= 22 || hr <= 3;
            return (
              <div
                key={hr}
                onClick={() => onSelectHour && onSelectHour(hr)}
                className="group relative flex flex-col items-center h-full justify-end cursor-pointer"
              >
                <div
                  style={{ height: `${Math.max(10, pct)}%` }}
                  className={`w-full rounded-t-lg transition-all ${
                    isNight ? 'bg-purple-500 group-hover:bg-purple-400' : 'bg-indigo-500 group-hover:bg-indigo-400'
                  }`}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  {hr === 0 ? '12A' : `${hr}A`}
                </span>

                {/* Tooltip */}
                <div className="absolute -top-8 hidden group-hover:block bg-slate-900 border border-slate-700 text-white text-[10px] py-1 px-2 rounded font-mono shadow-xl whitespace-nowrap z-20">
                  {count} moments at {hr}:00
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-1.5 pt-4 pb-2 items-end h-36 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          {hourCounts.slice(12, 24).map((count, idx) => {
            const hr = idx + 12;
            const pct = Math.round((count / maxHourCount) * 100);
            const isNight = hr >= 22;
            return (
              <div
                key={hr}
                onClick={() => onSelectHour && onSelectHour(hr)}
                className="group relative flex flex-col items-center h-full justify-end cursor-pointer"
              >
                <div
                  style={{ height: `${Math.max(10, pct)}%` }}
                  className={`w-full rounded-t-lg transition-all ${
                    isNight ? 'bg-purple-500 group-hover:bg-purple-400' : 'bg-indigo-500 group-hover:bg-indigo-400'
                  }`}
                />
                <span className="text-[10px] font-mono text-slate-400 mt-2">
                  {hr === 12 ? '12P' : `${hr - 12}P`}
                </span>

                {/* Tooltip */}
                <div className="absolute -top-8 hidden group-hover:block bg-slate-900 border border-slate-700 text-white text-[10px] py-1 px-2 rounded font-mono shadow-xl whitespace-nowrap z-20">
                  {count} moments at {hr}:00
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day of Week Heat Matrix */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
          Weekly Distribution
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(dayCounts).map(([day, count]) => (
            <div
              key={day}
              onClick={() => onSelectDay && onSelectDay(day)}
              className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-center cursor-pointer transition-colors space-y-1"
            >
              <span className="text-xs font-bold text-slate-300 font-mono">{day}</span>
              <p className="text-base font-black text-indigo-400 font-mono">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
