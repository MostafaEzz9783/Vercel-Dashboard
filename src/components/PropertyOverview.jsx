import { Car, Home, MapPin, Shield, Star, Users, Wifi } from "lucide-react";

const featureIcons = [Home, Users, Wifi, Shield, Car, Star];

export default function PropertyOverview({ t }) {
  const features = t.property.features.map((text, index) => ({
    icon: featureIcons[index],
    text,
  }));

  return (
    <div className="py-8 space-y-6">
      <div
        className="rounded-2xl p-8 border"
        style={{ backgroundColor: "#0f0f1a", borderColor: "#1e1e2e" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label={t.property.totalUnitsLabel}
            value={t.property.totalUnitsValue}
            unit={t.property.totalUnitsUnit}
            color="#60a5fa"
          />
          <StatCard
            label={t.property.modelLabel}
            value={t.property.modelValue}
            unit={t.property.modelUnit}
            color="#a78bfa"
          />
          <StatCard
            label={t.property.locationLabel}
            value={t.property.locationValue}
            unit={t.property.locationUnit}
            color="#34d399"
          />
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
              {t.property.locationTitle}
            </h3>
            <p style={{ color: "#6b7280" }} className="text-sm leading-relaxed">
              {t.property.locationDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
        <h3 className="font-bold text-base mb-5" style={{ color: "#111827" }}>
          {t.property.featuresTitle}
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
