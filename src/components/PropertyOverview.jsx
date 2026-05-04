import { Car, Home, MapPin, Shield, Star, Users, Wifi } from "lucide-react";
import { totalUnits } from "@/data/financialAssumptions";

const features = [
  { icon: Home, text: "شقق مخدومة عالية الجودة بإدارة احترافية" },
  { icon: Users, text: "نموذج Co-living مميز يستهدف المقيمين والمغتربين" },
  { icon: Wifi, text: "خدمات مدمجة: إنترنت فائق السرعة، تنظيف، صيانة" },
  { icon: Shield, text: "أمن وحراسة على مدار الساعة" },
  { icon: Car, text: "مواقف سيارات خاصة للمقيمين" },
  { icon: Star, text: "موقع استراتيجي في العليا، الرياض" },
];

export default function PropertyOverview() {
  return (
    <div className="py-8 space-y-6">
      <div
        className="rounded-2xl p-8 border"
        style={{ backgroundColor: "#0f0f1a", borderColor: "#1e1e2e" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="إجمالي الوحدات" value={String(totalUnits)} unit="وحدة" color="#60a5fa" />
          <StatCard label="نموذج المشروع" value="Co-living" unit="شقق مخدومة" color="#a78bfa" />
          <StatCard label="الموقع" value="العليا" unit="الرياض، المملكة العربية السعودية" color="#34d399" />
        </div>
      </div>

      <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: "#eff6ff" }}
          >
            <MapPin size={18} style={{ color: "#60a5fa" }} />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1" style={{ color: "#111827" }}>
              الموقع
            </h3>
            <p style={{ color: "#6b7280" }} className="text-sm leading-relaxed">
              حي العليا، شمال الرياض — أحد أكثر الأحياء حيوية وطلباً في المملكة العربية السعودية، قريب من
              المراكز التجارية والمكاتب والمطاعم العالمية.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
        <h3 className="font-bold text-base mb-5" style={{ color: "#111827" }}>
          المميزات الرئيسية
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.text} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "#eff6ff" }}
              >
                <feature.icon size={15} style={{ color: "#60a5fa" }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, color }) {
  return (
    <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "#1e1e2e" }}>
      <p className="text-xs font-medium mb-2" style={{ color: "#8b8ba7" }}>
        {label}
      </p>
      <p className="text-3xl font-black mb-1" style={{ color }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: "#8b8ba7" }}>
        {unit}
      </p>
    </div>
  );
}
