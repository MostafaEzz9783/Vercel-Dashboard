import { coLivingUnitPricing } from "@/data/coLivingModel";
import { executiveUnitPricing, executiveModel } from "@/data/executiveModel";
import { operatorFee, totalUnits } from "@/data/financialAssumptions";

const CONTEXT_COLORS = {
  worst: "#f87171",
  base: "#60a5fa",
  best: "#34d399",
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

const executiveTotalUnits = executiveUnitPricing.oneBedroom.units + executiveUnitPricing.twoBedroom.units;

function PricingBlock({ color, title, monthlyPrice, annualLabel, t }) {
  const annualRent = roundDownToNearest500(monthlyPrice * 12);

  return (
    <div>
      <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
        {title}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        SAR {formatNumber(monthlyPrice)} {t.financial.monthSuffix}
      </p>
      <p className="text-xs mt-1" style={{ color: "#8b8ba7" }}>
        {annualLabel}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        SAR {formatNumber(annualRent)} {t.financial.yearSuffix}
      </p>
    </div>
  );
}

function InfoBlock({ color, title, value, subtitle }) {
  return (
    <div>
      <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
        {title}
      </p>
      <p className="text-xs font-black" style={{ color }}>
        {value}
      </p>
      {subtitle ? (
        <p className="text-xs mt-1" style={{ color: "#8b8ba7" }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default function ScenarioContext({ model, scenario, scenarioLabel, occupancy, t }) {
  const color = CONTEXT_COLORS[scenario];
  const isLtrModel = model === "executive";
  const contextDescription = isLtrModel ? t.financial.ltrContextDescription : t.financial.contextDescription;
  const ltrScenarioData = executiveModel[scenario];

  return (
    <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#1a1a2e", borderColor: "#2e2e3e" }}>
      <h3 className="font-bold text-sm mb-3" style={{ color }}>
        {t.financial.studyContext}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "#c0c0d8" }}>
        {contextDescription}
      </p>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold mt-0.5" style={{ color }}>
            ◈
          </span>
          <div>
            <p className="text-xs font-bold" style={{ color: "#f0f0fa" }}>
              {isLtrModel ? executiveTotalUnits : totalUnits} {t.financial.unitsWithinScenario} {scenarioLabel}
            </p>
            <p className="text-xs" style={{ color: "#8b8ba7" }}>
              {t.financial.annualOccupancyText} {occupancy}%.
            </p>
          </div>
        </div>

        {isLtrModel ? (
          <>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color }}>
                ◈
              </span>
              <InfoBlock
                color={color}
                title={`${executiveUnitPricing.oneBedroom.label} (${executiveUnitPricing.oneBedroom.units} ${t.financial.unitsWord})`}
                value={t.financial.ltrUnitMixOneBedroom}
                subtitle={t.financial.ltrUnitMixOneBedroomIds}
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color }}>
                ◈
              </span>
              <InfoBlock
                color={color}
                title={`${executiveUnitPricing.twoBedroom.label} (${executiveUnitPricing.twoBedroom.units} ${t.financial.unitsWord})`}
                value={t.financial.ltrUnitMixTwoBedroom}
                subtitle={t.financial.ltrUnitMixTwoBedroomIds}
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color }}>
                ◈
              </span>
              <InfoBlock
                color={color}
                title={t.financial.revenueAt100}
                value={`SAR ${formatNumber(ltrScenarioData.revenueAt100)}`}
                subtitle={t.financial.ltrStudySource}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color }}>
                ◈
              </span>
              <PricingBlock
                color={color}
                title={`${coLivingUnitPricing.studio.label} (${coLivingUnitPricing.studio.units} ${t.financial.unitsWord})`}
                monthlyPrice={coLivingUnitPricing.studio[scenario]}
                annualLabel={t.financial.annualRent}
                t={t}
              />
            </div>
            <div className="flex items-start gap-2">
              <span className="text-xs font-bold mt-0.5" style={{ color }}>
                ◈
              </span>
              <PricingBlock
                color={color}
                title={`${coLivingUnitPricing.smallBedroom.label} (${coLivingUnitPricing.smallBedroom.units} ${t.financial.unitsWord})`}
                monthlyPrice={coLivingUnitPricing.smallBedroom[scenario]}
                annualLabel={t.financial.annualRent}
                t={t}
              />
            </div>
          </>
        )}
      </div>

      <div className="mt-4 pt-3 border-t text-center" style={{ borderColor: "#2e2e3e" }}>
        <p className="text-xs" style={{ color: "#8b8ba7" }}>
          {t.financial.operatorFeeFixed}:{" "}
          <span style={{ color: "#f97316", fontWeight: "700" }}>{formatNumber(operatorFee * 100)}%</span>
        </p>
      </div>
    </div>
  );
}
