export default function FinancialDistribution({ kpis, formatSAR, occupancy }) {
  const ownerShare = (1 - kpis.operatorFeeRate) * 100;
  const operatorShare = kpis.operatorFeeRate * 100;

  const rows = [
    { label: "الإيراد عند إشغال 100%", value: formatSAR(kpis.revenueAt100), color: "#8b8ba7" },
    { label: `إجمالي الإيراد السنوي (${occupancy}%)`, value: formatSAR(kpis.revenue), color: "#60a5fa" },
    { label: `رسوم المشغل (${operatorShare}%)`, value: formatSAR(kpis.operatorFeeAmount), color: "#f97316" },
    { label: "صافي دخل المالك", value: formatSAR(kpis.netRevenue), color: "#34d399" },
  ];

  return (
    <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}>
      <h3 className="font-bold text-sm mb-4" style={{ color: "#f0f0fa" }}>
        التوزيع المالي
      </h3>

      <div className="space-y-3 mb-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-xs" style={{ color: "#8b8ba7" }}>
              {row.label}
            </span>
            <span className="text-xs font-bold" style={{ color: row.color }}>
              {row.value} ﷼
            </span>
          </div>
        ))}
      </div>

      <div className="flex rounded-full overflow-hidden h-3" style={{ backgroundColor: "#252538" }}>
        <div className="h-full transition-all duration-500" style={{ width: `${ownerShare}%`, backgroundColor: "#60a5fa" }} />
        <div className="h-full transition-all duration-500" style={{ width: `${operatorShare}%`, backgroundColor: "#f97316" }} />
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#60a5fa" }} />
          <span className="text-xs" style={{ color: "#8b8ba7" }}>
            المالك {ownerShare}%
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#f97316" }} />
          <span className="text-xs" style={{ color: "#8b8ba7" }}>
            المشغل {operatorShare}%
          </span>
        </div>
      </div>
    </div>
  );
}
