import { motion } from "framer-motion";
import { Calendar, DollarSign, Home } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const cardsContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function KPICards({
  kpis,
  formatSAR,
  formatPercent,
  occupancy,
  animateCountersFromZero,
  modelLabel,
  t,
}) {
  const valuesKey = `${kpis.revenue}-${kpis.netRevenue}-${kpis.annualPerUnit}-${kpis.monthlyPerUnit}`;

  return (
    <motion.div
      key={valuesKey}
      className="space-y-4"
      variants={cardsContainerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="rounded-2xl border"
        style={{
          backgroundColor: "#1e1e2e",
          borderColor: "#2e2e3e",
          willChange: "transform, opacity",
          boxShadow: "0 0 20px rgba(0,0,0,0.25)",
        }}
      >
        <div className="p-8">
          <p className="text-xs font-semibold mb-3" style={{ color: "#8b8ba7" }}>
            {t.financial.projectedAnnualRevenue}
          </p>
          <p
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{ color: "#60a5fa", direction: "ltr", textAlign: "right" }}
          >
            <AnimatedCounter
              value={kpis.revenue}
              format={formatSAR}
              prefix="SAR "
              animateFromZero={animateCountersFromZero}
            />
          </p>
        </div>
        <div className="px-8 py-4 border-t space-y-3" style={{ borderColor: "#2e2e3e" }}>
          <MetricRow label={t.financial.model} value={modelLabel} valueColor="#f0f0fa" />
          <MetricRow label={t.financial.occupancyLabel} value={`${formatPercent(occupancy)}%`} valueColor="#f0f0fa" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SmallKPI
          icon={DollarSign}
          label={t.financial.ownerNetIncome}
          value={kpis.netRevenue}
          formatSAR={formatSAR}
          color="#34d399"
          bg="#1a2e26"
          unit={t.financial.saudiRiyalPerYear}
          animateCountersFromZero={animateCountersFromZero}
          t={t}
        />
        <SmallKPI
          icon={Home}
          label={t.financial.annualRevenuePerUnit}
          value={kpis.annualPerUnit}
          formatSAR={formatSAR}
          color="#a78bfa"
          bg="#231a3a"
          unit={t.financial.saudiRiyalPerYear}
          animateCountersFromZero={animateCountersFromZero}
          t={t}
        />
        <SmallKPI
          icon={Calendar}
          label={t.financial.monthlyRevenuePerUnit}
          value={kpis.monthlyPerUnit}
          formatSAR={formatSAR}
          color="#fbbf24"
          bg="#2a2a1a"
          unit={t.financial.saudiRiyalPerMonth}
          animateCountersFromZero={animateCountersFromZero}
          t={t}
        />
      </div>
    </motion.div>
  );
}

function SmallKPI({ icon: Icon, label, value, formatSAR, color, bg, unit, animateCountersFromZero, t }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-2xl border"
      style={{
        backgroundColor: "#1e1e2e",
        borderColor: "#2e2e3e",
        willChange: "transform, opacity",
        boxShadow: "0 0 20px rgba(0,0,0,0.25)",
      }}
    >
      <div className="p-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
          <Icon size={15} style={{ color }} />
        </div>
        <p className="text-xs mb-2 leading-snug" style={{ color: "#8b8ba7" }}>
          {label}
        </p>
        <p className="text-xl font-black" style={{ color, direction: "ltr", textAlign: "right" }}>
          <AnimatedCounter value={value} format={formatSAR} animateFromZero={animateCountersFromZero} />
        </p>
      </div>
      <div className="px-6 py-4 border-t" style={{ borderColor: "#2e2e3e" }}>
        <MetricRow label={t.financial.unitLabel} value={unit} valueColor="#4b4b6b" />
      </div>
    </motion.div>
  );
}

function MetricRow({ label, value, valueColor }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
      <span className="text-xs text-left" style={{ color: "#8b8ba7" }}>
        {label}
      </span>
      <span className="text-xs font-semibold text-right" style={{ color: valueColor }}>
        {value}
      </span>
    </div>
  );
}
