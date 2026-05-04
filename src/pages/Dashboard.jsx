import { useState } from "react";
import { BarChart2, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyOverview from "@/components/PropertyOverview";
import FinancialStudy from "@/components/FinancialStudy";

const tabs = [
  { key: "property", label: "ملخص العقار", icon: Home },
  { key: "financial", label: "دراسة مالية", icon: BarChart2 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("property");

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Cairo', sans-serif" }} dir="rtl">
      <Navbar />

      <div className="bg-white px-6 pt-10 pb-0 max-w-7xl mx-auto text-center">
        <p className="text-xs font-medium mb-3" style={{ color: "#9ca3af" }}>
          دراسة جدوى العقار
        </p>
        <h1
          className="font-black mb-4 leading-none"
          style={{ color: "#0f172a", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-1.5px" }}
        >
          سنام العليا.
        </h1>
        <p className="text-sm leading-relaxed mb-8 max-w-xl mx-auto" style={{ color: "#6b7280" }}>
          دراسة جدوى لمبنى سكني من{" "}
          <span style={{ color: "#0f172a", fontWeight: "700" }}>22 وحدة</span>{" "}
          في حي العليا، الرياض — تحليل نموذجي{" "}
          <span style={{ color: "#60a5fa", fontWeight: "600" }}>السكن التشغيلي</span>{" "}
          والشقق المخدومة{" "}
          <span style={{ color: "#60a5fa", fontWeight: "600" }}>Co-living</span>
        </p>

        <div className="flex gap-1 border-b justify-center" style={{ borderColor: "#f3f4f6" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px"
              style={{
                borderColor: activeTab === tab.key ? "#60a5fa" : "transparent",
                color: activeTab === tab.key ? "#60a5fa" : "#9ca3af",
                backgroundColor: "transparent",
              }}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        {activeTab === "property" && <PropertyOverview />}
        {activeTab === "financial" && <FinancialStudy />}
      </main>
    </div>
  );
}
