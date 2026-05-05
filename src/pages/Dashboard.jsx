import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyOverview from "@/components/PropertyOverview";
import FinancialStudy from "@/components/FinancialStudy";

const tabContentMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" },
};

export default function Dashboard({ language, t, onToggleLanguage }) {
  const [activeTab, setActiveTab] = useState("property");
  const financialSectionRef = useRef(null);
  const pendingFinancialScrollRef = useRef(false);

  const tabs = [
    { key: "property", label: t.hero.propertyTab, icon: Home },
    { key: "financial", label: t.hero.financialTab, icon: BarChart2 },
  ];

  const scrollToFinancialSection = () => {
    if (!financialSectionRef.current) {
      return;
    }

    financialSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleTabChange = (nextTab) => {
    if (nextTab === "financial" && activeTab === "financial") {
      scrollToFinancialSection();
      return;
    }

    if (nextTab === "financial") {
      pendingFinancialScrollRef.current = true;
    }

    setActiveTab(nextTab);
  };

  useEffect(() => {
    if (activeTab !== "financial" || !pendingFinancialScrollRef.current) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToFinancialSection();
      pendingFinancialScrollRef.current = false;
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Cairo', sans-serif" }} dir={language === "ar" ? "rtl" : "ltr"}>
      <Navbar language={language} t={t} onToggleLanguage={onToggleLanguage} />

      <div className="bg-white px-6 pt-10 pb-0 max-w-7xl mx-auto text-center">
        <p className="text-xs font-medium mb-3" style={{ color: "#9ca3af" }}>
          {t.hero.eyebrow}
        </p>
        <h1
          className="font-black mb-4 leading-none"
          style={{ color: "#0f172a", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-1.5px" }}
        >
          {t.hero.title}
        </h1>
        <p className="text-sm leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#6b7280" }}>
          {t.hero.description}
        </p>

        <div className="flex gap-1 border-b justify-center" style={{ borderColor: "#f3f4f6" }}>
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              type="button"
              onClick={() => handleTabChange(tab.key)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px"
              whileHover={{ opacity: 0.88 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                borderColor: activeTab === tab.key ? "#60a5fa" : "transparent",
                color: activeTab === tab.key ? "#60a5fa" : "#9ca3af",
                backgroundColor: "transparent",
                willChange: "opacity",
              }}
            >
              <tab.icon size={15} />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={tabContentMotion.initial}
            animate={tabContentMotion.animate}
            exit={tabContentMotion.exit}
            transition={tabContentMotion.transition}
            style={{ willChange: "transform, opacity" }}
          >
            {activeTab === "property" && <PropertyOverview t={t} language={language} />}
            {activeTab === "financial" && <FinancialStudy ref={financialSectionRef} t={t} language={language} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
