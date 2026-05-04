import { useState } from "react";
import FinancialDistribution from "@/components/FinancialDistribution";
import KPICards from "@/components/KPICards";
import ScenarioContext from "@/components/ScenarioContext";
import { occupancyOptions, operatorFee, scenarios, totalUnits } from "@/data/financialAssumptions";

function formatSAR(value) {
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export default function FinancialStudy() {
  const [scenario, setScenario] = useState("realistic");
  const [occupancy, setOccupancy] = useState(90);

  const scenarioData = scenarios[scenario];
  const revenue = (scenarioData.revenueAt100 * occupancy) / 100;
  const operatorFeeAmount = revenue * operatorFee;
  const netRevenue = revenue - operatorFeeAmount;
  const annualPerUnit = netRevenue / totalUnits;
  const monthlyPerUnit = annualPerUnit / 12;

  const kpis = {
    revenueAt100: scenarioData.revenueAt100,
    revenue,
    operatorFeeAmount,
    operatorFeeRate: operatorFee,
    netRevenue,
    annualPerUnit,
    monthlyPerUnit,
  };

  return (
    <div className="rounded-t-3xl -mx-6 px-6 pt-8 pb-12 mt-2" style={{ backgroundColor: "#0f0f1a" }}>
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center justify-center mb-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
            سيناريو السعر
          </p>
          <div className="flex gap-1 rounded-xl p-1" style={{ backgroundColor: "#1e1e2e" }}>
            {Object.entries(scenarios).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                style={{
                  backgroundColor: scenario === key ? "#60a5fa" : "transparent",
                  color: scenario === key ? "#0f0f1a" : "#8b8ba7",
                }}
              >
                {value.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
            نسبة الإشغال
          </p>
          <div className="flex gap-1.5">
            {occupancyOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setOccupancy(option)}
                className="w-12 h-9 rounded-lg text-sm font-bold transition-all duration-200 border"
                style={{
                  backgroundColor: occupancy === option ? "#60a5fa" : "#1e1e2e",
                  color: occupancy === option ? "#0f0f1a" : "#8b8ba7",
                  borderColor: occupancy === option ? "#60a5fa" : "#2e2e3e",
                }}
              >
                {option}%
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
            رسوم المشغل
          </p>
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2 border"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}
          >
            <span className="text-sm font-bold" style={{ color: "#f97316" }}>
              {operatorFee * 100}%
            </span>
            <span className="text-xs px-2 py-0.5 rounded border" style={{ color: "#8b8ba7", borderColor: "#2e2e3e" }}>
              ثابتة
            </span>
            <span className="text-xs" style={{ color: "#8b8ba7" }}>
              من الإيراد السنوي
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3 space-y-4">
          <KPICards kpis={kpis} formatSAR={formatSAR} occupancy={occupancy} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <FinancialDistribution kpis={kpis} formatSAR={formatSAR} occupancy={occupancy} />
          <ScenarioContext scenario={scenario} occupancy={occupancy} />
        </div>
      </div>
    </div>
  );
}
