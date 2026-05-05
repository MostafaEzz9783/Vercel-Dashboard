import { coLivingUnitPricing } from "@/data/coLivingModel";
import { executiveUnitPricing } from "@/data/executiveModel";
import { operatorFee, totalUnits } from "@/data/financialAssumptions";

const CONTEXT = {
  worst: {
    title: "سياق الدراسة",
    color: "#f87171",
    projectDesc:
      "نموذج السكن المشترك في حي العليا، الرياض. يوفر وحدات شهرية مخدومة للاستفادة من الطلب المتنامي على السكن المرن.",
  },
  base: {
    title: "سياق الدراسة",
    color: "#60a5fa",
    projectDesc:
      "نموذج السكن المشترك في حي العليا، الرياض. يوفر وحدات شهرية مخدومة للاستفادة من الطلب المتنامي على السكن المرن.",
  },
  best: {
    title: "سياق الدراسة",
    color: "#34d399",
    projectDesc:
      "نموذج السكن المشترك في حي العليا، الرياض. يوفر وحدات شهرية مخدومة للاستفادة من الطلب المتنامي على السكن المرن.",
  },
};

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function roundDownToNearest500(value) {
  return Math.floor(value / 500) * 500;
}

const executiveTotalUnits = executiveUnitPricing.studio.units + executiveUnitPricing.twoBedroom.units;

function PricingBlock({ color, title, monthlyPrice, annualLabel = "الإيجار السنوي" }) {
  const annualRent = roundDownToNearest500(monthlyPrice * 12);

  return (
    <div>
      <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
        {title}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        SAR {formatNumber(monthlyPrice)} / شهر
      </p>
      <p className="text-xs mt-1" style={{ color: "#8b8ba7" }}>
        {annualLabel}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        SAR {formatNumber(annualRent)} / سنة
      </p>
    </div>
  );
}

export default function ScenarioContext({ model, scenario, scenarioLabel, occupancy }) {
  const ctx = CONTEXT[scenario];

  return (
    <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#1a1a2e", borderColor: "#2e2e3e" }}>
      <h3 className="font-bold text-sm mb-3" style={{ color: ctx.color }}>
        {ctx.title}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#c0c0d8" }}>
        {ctx.projectDesc}
      </p>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold mt-0.5" style={{ color: ctx.color }}>
            ◈
          </span>
          <div>
            <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
              {model === "executive" ? executiveTotalUnits : totalUnits} وحدة سكنية ضمن السيناريو {scenarioLabel}
            </p>
            <p className="text-xs" style={{ color: "#8b8ba7" }}>
              يعتمد هذا العرض على نسبة إشغال سنوية تبلغ {occupancy}% للمشروع.
            </p>
          </div>
        </div>

        {model === "executive" ? (
          <>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: ctx.color }}>
                ◈
              </span>
              <PricingBlock
                color={ctx.color}
                title={`${executiveUnitPricing.studio.label} (${executiveUnitPricing.studio.units} وحدات)`}
                monthlyPrice={executiveUnitPricing.studio[scenario]}
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: ctx.color }}>
                ◈
              </span>
              <PricingBlock
                color={ctx.color}
                title={`${executiveUnitPricing.twoBedroom.label} (${executiveUnitPricing.twoBedroom.units} وحدات)`}
                monthlyPrice={executiveUnitPricing.twoBedroom[scenario]}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: ctx.color }}>
                ◈
              </span>
              <PricingBlock
                color={ctx.color}
                title={`${coLivingUnitPricing.studio.label} (${coLivingUnitPricing.studio.units} وحدات)`}
                monthlyPrice={coLivingUnitPricing.studio[scenario]}
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color: ctx.color }}>
                ◈
              </span>
              <PricingBlock
                color={ctx.color}
                title={`${coLivingUnitPricing.smallBedroom.label} (${coLivingUnitPricing.smallBedroom.units} وحدات)`}
                monthlyPrice={coLivingUnitPricing.smallBedroom[scenario]}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: "#2e2e3e" }}>
        <p className="text-xs" style={{ color: "#8b8ba7" }}>
          رسوم المشغل ثابتة: <span style={{ color: "#f97316", fontWeight: "700" }}>{formatNumber(operatorFee * 100)}%</span>
        </p>
      </div>
    </div>
  );
}
