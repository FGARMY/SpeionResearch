"use client";

interface ChartData {
  label: string;
  value: number;
}

interface ChartProps {
  title: string;
  data: ChartData[];
  unit?: string;
  color?: string;
}

export default function AuthorityChart({ title, data, unit = "", color = "var(--color-primary)" }: ChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="my-10 p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-sm">
      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-muted)] mb-8 text-center" style={{ fontFamily: "var(--font-sans)" }}>
        {title}
      </h3>
      
      <div className="space-y-6">
        {data.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-sans)" }}>
                {item.label}
              </span>
              <span className="text-[var(--color-muted)] text-xs font-mono">
                {item.value}{unit}
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--color-bg)] rounded-full overflow-hidden border border-[var(--color-border)]">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="text-[0.625rem] font-bold uppercase tracking-widest text-[var(--color-muted)] bg-[var(--color-bg)] px-3 py-1 border border-[var(--color-border)] rounded-full">
          Speion Internal Benchmark Results
        </div>
      </div>
    </div>
  );
}
