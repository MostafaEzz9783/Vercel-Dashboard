import { Calendar, DollarSign, Home } from "lucide-react";

export default function KPICards({ kpis, formatSAR, occupancy }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-7 border" style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#8b8ba7" }}>
          الإيراد السنوي المتوقع
        </p>
        <p
          className="text-4xl sm:text-5xl font-black mb-2 tracking-tight"
          style={{ color: "#60a5fa", direction: "ltr", textAlign: "right" }}
        >
          SAR {formatSAR(kpis.revenue)}
        </p>
        <p className="text-xs" style={{ color: "#8b8ba7" }}>
          • كو-ليفنج (إشغال {occupancy}%)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SmallKPI
          icon={DollarSign}
          label="صافي دخل المالك"
          value={formatSAR(kpis.netRevenue)}
          color="#34d399"
          bg="#1a2e26"
          unit="ريال سعودي / سنة"
        />
        <SmallKPI
          icon={Home}
          label="الإيراد السنوي / وحدة"
          value={formatSAR(kpis.annualPerUnit)}
          color="#a78bfa"
          bg="#231a3a"
          unit="ريال سعودي / سنة"
        />
        <SmallKPI
          icon={Calendar}
          label="الإيراد الشهري / وحدة"
          value={formatSAR(kpis.monthlyPerUnit)}
          color="#fbbf24"
          bg="#2a2a1a"
          unit="ريال سعودي / شهر"
        />
      </div>
    </div>
  );
}

function SmallKPI({ icon: Icon, label, value, color, bg, unit }) {
  return (
    <div className="rounded-2xl p-5 border" style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
        <Icon size={15} style={{ color }} />
      </div>
      <p className="text-xs mb-1 leading-snug" style={{ color: "#8b8ba7" }}>
        {label}
      </p>
      <p className="text-lg font-black" style={{ color }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: "#4b4b6b" }}>
        {unit}
      </p>
    </div>
  );
}
