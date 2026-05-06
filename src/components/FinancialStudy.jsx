import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Expand, ExternalLink, FileDown, Minimize } from "lucide-react";
import FinancialDistribution from "@/components/FinancialDistribution";
import KPICards from "@/components/KPICards";
import ScenarioContext from "@/components/ScenarioContext";
import { occupancyOptions, operatorFee } from "@/data/financialAssumptions";
import { coLivingModel } from "@/data/coLivingModel";
import { executiveModel } from "@/data/executiveModel";

let hasAnimatedFinancialStudyOnce = false;

const MARKET_VALIDATION_URL =
  "https://docs.google.com/spreadsheets/d/1OUJp3S0mw1uQtvlKQaiCCPxOiRWmdJ-RxNs2zR1gEQ4/edit";

const actionButtonMotion = {
  whileHover: { scale: 1.02, backgroundColor: "#252538", color: "#ffffff" },
  transition: { duration: 0.2, ease: "easeOut" },
};

const MODEL_OPTIONS = [
  { key: "coLiving" },
  { key: "executive" },
];

const SCENARIO_OPTIONS = [
  { key: "worst", color: "#f87171" },
  { key: "base", color: "#60a5fa" },
  { key: "best", color: "#34d399" },
];

const RECOMMENDED_SCENARIO_KEY = "base";
const RECOMMENDED_OCCUPANCY = 80;

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatSAR(value) {
  return formatNumber(value);
}

function formatPercent(value) {
  return formatNumber(value);
}

const FinancialStudy = forwardRef(function FinancialStudy({ t }, forwardedRef) {
  const [model, setModel] = useState("coLiving");
  const [scenario, setScenario] = useState("base");
  const [occupancy, setOccupancy] = useState(90);
  const [animateCountersFromZero, setAnimateCountersFromZero] = useState(!hasAnimatedFinancialStudyOnce);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const initialValuesRef = useRef({ model: "coLiving", scenario: "base", occupancy: 90 });
  const sectionRef = useRef(null);
  const exportContentRef = useRef(null);

  const setCombinedRef = (node) => {
    sectionRef.current = node;

    if (typeof forwardedRef === "function") {
      forwardedRef(node);
      return;
    }

    if (forwardedRef) {
      forwardedRef.current = node;
    }
  };

  useEffect(() => {
    if (!animateCountersFromZero) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      hasAnimatedFinancialStudyOnce = true;
      setAnimateCountersFromZero(false);
    }, 1050);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animateCountersFromZero]);

  useEffect(() => {
    const initialValues = initialValuesRef.current;
    const hasChangedFromInitial =
      model !== initialValues.model ||
      scenario !== initialValues.scenario ||
      occupancy !== initialValues.occupancy;

    if (hasChangedFromInitial && animateCountersFromZero) {
      hasAnimatedFinancialStudyOnce = true;
      setAnimateCountersFromZero(false);
    }
  }, [model, scenario, occupancy, animateCountersFromZero]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === sectionRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!sectionRef.current) {
      return;
    }

    try {
      if (document.fullscreenElement === sectionRef.current) {
        await document.exitFullscreen();
        return;
      }

      await sectionRef.current.requestFullscreen();
    } catch (error) {
      console.error("Failed to toggle fullscreen", error);
    }
  };

  const exportToPdf = async () => {
    if (!exportContentRef.current) {
      return;
    }

    setIsExportingPdf(true);

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(exportContentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f0f1a",
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      const fittedHeight = Math.min(imageHeight, pageHeight);
      const fittedWidth = imageHeight > pageHeight ? (canvas.width * pageHeight) / canvas.height : imageWidth;
      const x = (pageWidth - fittedWidth) / 2;
      const y = (pageHeight - fittedHeight) / 2;

      pdf.addImage(imageData, "JPEG", x, y, fittedWidth, fittedHeight);
      pdf.save("mathwaa-senam-olaya-projection.pdf");
    } catch (error) {
      console.error("Failed to export PDF", error);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const selectedCoLivingScenario = coLivingModel[scenario];
  const selectedExecutiveScenario = executiveModel[scenario];
  const coLivingData = selectedCoLivingScenario.occupancy[occupancy];
  const executiveData = selectedExecutiveScenario.occupancy[occupancy];

  const kpis =
    model === "executive"
      ? {
          revenueAt100: selectedExecutiveScenario.revenueAt100,
          revenue: executiveData.revenue,
          netRevenue: executiveData.netRevenue,
          annualPerUnit: executiveData.annualPerUnit,
          monthlyPerUnit: executiveData.monthlyPerUnit,
          operatorFeeRate: operatorFee,
          operatorFeeAmount: executiveData.revenue - executiveData.netRevenue,
        }
      : {
          revenueAt100: selectedCoLivingScenario.revenueAt100,
          revenue: coLivingData.revenue,
          netRevenue: coLivingData.netRevenue,
          annualPerUnit: coLivingData.annualPerUnit,
          monthlyPerUnit: coLivingData.monthlyPerUnit,
          operatorFeeRate: operatorFee,
          operatorFeeAmount: coLivingData.revenue - coLivingData.netRevenue,
        };

  const occupancyProgress = ((occupancy - 50) / 40) * 100;
  const selectedScenarioLabel = t.financial.scenarios[scenario];
  const modelLabel = model === "executive" ? t.financial.executive : t.financial.coLiving;

  return (
    <section
      ref={setCombinedRef}
      className="rounded-t-3xl -mx-6 px-6 pt-8 pb-12 mt-2"
      style={{ backgroundColor: "#0f0f1a" }}
    >
      <div className="financial-actions flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-3">
          <motion.a
            href={MARKET_VALIDATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", color: "#f0f0fa" }}
            whileHover={actionButtonMotion.whileHover}
            transition={actionButtonMotion.transition}
          >
            <span>{t.financial.marketValidation}</span>
            <motion.span whileHover={{ x: -2 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <ExternalLink size={15} />
            </motion.span>
          </motion.a>

          <motion.button
            type="button"
            onClick={exportToPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border disabled:opacity-70"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", color: "#f0f0fa" }}
            whileHover={actionButtonMotion.whileHover}
            transition={actionButtonMotion.transition}
          >
            <FileDown size={15} />
            <span>{isExportingPdf ? t.financial.exportingPdf : t.financial.exportPdf}</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border"
            style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", color: "#f0f0fa" }}
            whileHover={actionButtonMotion.whileHover}
            transition={actionButtonMotion.transition}
          >
            {isFullscreen ? <Minimize size={15} /> : <Expand size={15} />}
            <span>{isFullscreen ? t.financial.exitFullscreen : t.financial.fullscreen}</span>
          </motion.button>
        </div>
      </div>

      <div ref={exportContentRef}>
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 items-start sm:items-center justify-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.operatingModel}
            </p>
            <div className="flex gap-1 rounded-xl p-1" style={{ backgroundColor: "#1e1e2e" }}>
              {MODEL_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setModel(option.key)}
                  className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                  style={{
                    backgroundColor: model === option.key ? "#60a5fa" : "transparent",
                    color: model === option.key ? "#0f0f1a" : "#8b8ba7",
                  }}
                >
                  {option.key === "executive" ? t.financial.executive : t.financial.coLiving}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.scenarioPrice}
            </p>
            <div className="flex flex-wrap items-start justify-center gap-2 rounded-xl p-1" style={{ backgroundColor: "#1e1e2e" }}>
              {SCENARIO_OPTIONS.map((option) => (
                <div key={option.key} className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setScenario(option.key)}
                    className="px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200"
                    style={{
                      backgroundColor:
                        scenario === option.key
                          ? "#60a5fa"
                          : option.key === RECOMMENDED_SCENARIO_KEY
                            ? "rgba(52, 211, 153, 0.08)"
                            : "transparent",
                      color:
                        scenario === option.key
                          ? "#0f0f1a"
                          : option.key === RECOMMENDED_SCENARIO_KEY
                            ? "#d7f7e7"
                            : "#8b8ba7",
                      boxShadow:
                        option.key === RECOMMENDED_SCENARIO_KEY
                          ? `inset 0 0 0 1px ${
                              scenario === option.key ? "rgba(167, 243, 208, 0.7)" : "rgba(52, 211, 153, 0.3)"
                            }, 0 0 ${scenario === option.key ? "18px" : "12px"} rgba(52, 211, 153, ${
                              scenario === option.key ? "0.18" : "0.08"
                            })`
                          : "none",
                      willChange: option.key === RECOMMENDED_SCENARIO_KEY ? "box-shadow, background-color" : "auto",
                    }}
                  >
                    {t.financial.scenarios[option.key]}
                  </button>
                  {option.key === RECOMMENDED_SCENARIO_KEY ? (
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-200"
                      style={{
                        color: scenario === option.key ? "#eafff4" : "#b7efcf",
                        backgroundColor: scenario === option.key ? "rgba(52, 211, 153, 0.18)" : "rgba(52, 211, 153, 0.1)",
                        boxShadow: `inset 0 0 0 1px ${
                          scenario === option.key ? "rgba(167, 243, 208, 0.5)" : "rgba(52, 211, 153, 0.24)"
                        }`,
                      }}
                    >
                      {t.financial.recommendedScenario}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 min-w-[240px]">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.occupancy}
            </p>
            <div className="w-full rounded-xl px-4 py-3 border" style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}>
              <div
                className="text-center text-sm font-bold mb-3 transition-colors duration-200"
                style={{ color: occupancy === RECOMMENDED_OCCUPANCY ? "#34d399" : "#60a5fa" }}
              >
                {formatPercent(occupancy)}%
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="10"
                value={occupancy}
                onChange={(event) => setOccupancy(Number(event.target.value))}
                className="occupancy-slider w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to left, #60a5fa 0%, #60a5fa ${occupancyProgress}%, #2e2e3e ${occupancyProgress}%, #2e2e3e 100%)`,
                  accentColor: "#60a5fa",
                }}
              />
              <div className="flex flex-row-reverse justify-between mt-2 text-xs" style={{ color: "#8b8ba7" }}>
                {[...occupancyOptions].reverse().map((option) => {
                  const isRecommended = option === RECOMMENDED_OCCUPANCY;
                  const isSelected = occupancy === option;

                  return (
                    <div key={option} className="flex min-w-[44px] flex-col items-center gap-1">
                      <span
                        className="rounded-full px-2 py-0.5 transition-all duration-200"
                        style={{
                          color: isRecommended ? (isSelected ? "#eafff4" : "#b7efcf") : "#8b8ba7",
                          backgroundColor: isRecommended
                            ? isSelected
                              ? "rgba(52, 211, 153, 0.18)"
                              : "rgba(52, 211, 153, 0.08)"
                            : "transparent",
                          boxShadow: isRecommended
                            ? `inset 0 0 0 1px ${
                                isSelected ? "rgba(167, 243, 208, 0.5)" : "rgba(52, 211, 153, 0.24)"
                              }`
                            : "none",
                        }}
                      >
                        {formatPercent(option)}%
                      </span>
                      {isRecommended ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-200"
                          style={{
                            color: isSelected ? "#eafff4" : "#b7efcf",
                            backgroundColor: isSelected ? "rgba(52, 211, 153, 0.16)" : "rgba(52, 211, 153, 0.08)",
                            boxShadow: `inset 0 0 0 1px ${
                              isSelected ? "rgba(167, 243, 208, 0.45)" : "rgba(52, 211, 153, 0.2)"
                            }`,
                          }}
                        >
                          {t.financial.recommendedOccupancy}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {t.financial.operatorFee}
            </p>
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2 border"
              style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}
            >
              <span className="text-sm font-bold" style={{ color: "#f97316" }}>
                {formatPercent(operatorFee * 100)}%
              </span>
              <span className="text-xs px-2 py-0.5 rounded border" style={{ color: "#8b8ba7", borderColor: "#2e2e3e" }}>
                {t.financial.fixed}
              </span>
              <span className="text-xs" style={{ color: "#8b8ba7" }}>
                {t.financial.fromAnnualRevenue}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          <div className="lg:col-span-3 space-y-4">
            <KPICards
              kpis={kpis}
              formatSAR={formatSAR}
              formatPercent={formatPercent}
              occupancy={occupancy}
              animateCountersFromZero={animateCountersFromZero}
              modelLabel={modelLabel}
              t={t}
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <FinancialDistribution
              kpis={kpis}
              formatSAR={formatSAR}
              occupancy={formatPercent(occupancy)}
              t={t}
            />
            <ScenarioContext
              model={model}
              scenario={scenario}
              scenarioLabel={selectedScenarioLabel}
              occupancy={formatPercent(occupancy)}
              t={t}
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default FinancialStudy;
