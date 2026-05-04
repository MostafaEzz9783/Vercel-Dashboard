import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Expand, ExternalLink, FileDown, Minimize } from "lucide-react";
import FinancialDistribution from "@/components/FinancialDistribution";
import KPICards from "@/components/KPICards";
import ScenarioContext from "@/components/ScenarioContext";
import { operatorFee, scenarios, totalUnits } from "@/data/financialAssumptions";

let hasAnimatedFinancialStudyOnce = false;

const MARKET_VALIDATION_URL =
  "https://docs.google.com/spreadsheets/d/1OUJp3S0mw1uQtvlKQaiCCPxOiRWmdJ-RxNs2zR1gEQ4/edit";

const actionButtonMotion = {
  whileHover: { scale: 1.02, backgroundColor: "#252538", color: "#ffffff" },
  transition: { duration: 0.2, ease: "easeOut" },
};

function formatSAR(value) {
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

const FinancialStudy = forwardRef(function FinancialStudy(_, forwardedRef) {
  const [scenario, setScenario] = useState("realistic");
  const [occupancy, setOccupancy] = useState(90);
  const [animateCountersFromZero, setAnimateCountersFromZero] = useState(!hasAnimatedFinancialStudyOnce);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const initialValuesRef = useRef({ scenario: "realistic", occupancy: 90 });
  const sectionRef = useRef(null);

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
      scenario !== initialValues.scenario || occupancy !== initialValues.occupancy;

    if (hasChangedFromInitial && animateCountersFromZero) {
      hasAnimatedFinancialStudyOnce = true;
      setAnimateCountersFromZero(false);
    }
  }, [scenario, occupancy, animateCountersFromZero]);

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
    if (!sectionRef.current) {
      return;
    }

    setIsExportingPdf(true);

    try {
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      await new Promise((resolve) => window.requestAnimationFrame(resolve));

      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(sectionRef.current, {
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

  const scenarioData = scenarios[scenario];
  const revenue = (scenarioData.revenueAt100 * occupancy) / 100;
  const operatorFeeAmount = revenue * operatorFee;
  const netRevenue = revenue - operatorFeeAmount;
  const annualPerUnit = netRevenue / totalUnits;
  const monthlyPerUnit = annualPerUnit / 12;
  const occupancyProgress = ((occupancy - 50) / 40) * 100;

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
    <section
      ref={setCombinedRef}
      className="rounded-t-3xl -mx-6 px-6 pt-8 pb-12 mt-2"
      style={{ backgroundColor: "#0f0f1a" }}
    >
      <div className={`financial-actions flex flex-wrap items-center justify-center sm:justify-between gap-3 mb-6 no-pdf${isExportingPdf ? " exporting-pdf" : ""}`}>
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
            <span>Market Validation</span>
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
            <span>{isExportingPdf ? "جاري التصدير..." : "تصدير PDF"}</span>
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
            <span>{isFullscreen ? "إنهاء العرض" : "تكبير العرض"}</span>
          </motion.button>
        </div>
      </div>

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

        <div className="flex flex-col items-center gap-2 min-w-[240px]">
          <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
            نسبة الإشغال
          </p>
          <div className="w-full rounded-xl px-4 py-3 border" style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e" }}>
            <div className="text-center text-sm font-bold mb-3" style={{ color: "#60a5fa" }}>
              {occupancy}%
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
              <span>90%</span>
              <span>70%</span>
              <span>50%</span>
            </div>
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
          <KPICards
            kpis={kpis}
            formatSAR={formatSAR}
            occupancy={occupancy}
            animateCountersFromZero={animateCountersFromZero}
          />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <FinancialDistribution kpis={kpis} formatSAR={formatSAR} occupancy={occupancy} />
          <ScenarioContext scenario={scenario} occupancy={occupancy} />
        </div>
      </div>
    </section>
  );
});

export default FinancialStudy;
