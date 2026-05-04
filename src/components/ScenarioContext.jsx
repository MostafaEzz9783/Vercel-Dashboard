import { monthlyRates, operatorFee, totalUnits } from "@/data/financialAssumptions";

const CONTEXT = {
  conservative: {
    title: "سياق الدراسة",
    color: "#f87171",
    projectDesc:
      "نموذج السكن المشترك في حي العليا، الرياض. يوفر وحدات شهرية مخدومة للاستفادة من الطلب المتنامي على السكن المرن.",
    scenario: "محافظ",
  },
  realistic: {
    title: "سياق الدراسة",
    color: "#60a5fa",
    projectDesc:
      "نموذج السكن المشترك في حي العليا، الرياض. يوفر وحدات شهرية مخدومة للاستفادة من الطلب المتنامي على السكن المرن.",
    scenario: "واقعي",
  },
  optimistic: {
    title: "سياق الدراسة",
    color: "#34d399",
    projectDesc:
      "نموذج السكن المشترك في حي العليا، الرياض. يوفر وحدات شهرية مخدومة للاستفادة من الطلب المتنامي على السكن المرن.",
    scenario: "متفائل",
  },
};

export default function ScenarioContext({ scenario, occupancy }) {
  const ctx = CONTEXT[scenario];
  const monthlyRate = monthlyRates[scenario];

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
              {totalUnits} وحدة سكنية ضمن السيناريو {ctx.scenario}
            </p>
            <p className="text-xs" style={{ color: "#8b8ba7" }}>
              يعتمد هذا العرض على نسبة إشغال سنوية تبلغ {occupancy}% للمشروع.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold mt-0.5" style={{ color: ctx.color }}>
            ◈
          </span>
          <div>
            <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
              السعر الشهري / وحدة
            </p>
            <p className="text-xs font-black" style={{ color: ctx.color }}>
              SAR {monthlyRate.toLocaleString("ar-SA")} / شهر
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: "#2e2e3e" }}>
        <p className="text-xs" style={{ color: "#8b8ba7" }}>
          رسوم المشغل ثابتة: <span style={{ color: "#f97316", fontWeight: "700" }}>{operatorFee * 100}%</span>
        </p>
      </div>
    </div>
  );
}
