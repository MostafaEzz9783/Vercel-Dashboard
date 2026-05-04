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

export default function KPICards({ kpis, formatSAR, occupancy, animateCountersFromZero }) {
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
        className="rounded-2xl p-7 border"
        style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", willChange: "transform, opacity" }}
      >
        <p className="text-xs font-semibold mb-2" style={{ color: "#8b8ba7" }}>
          الإيراد السنوي المتوقع
        </p>
        <p
          className="text-4xl sm:text-5xl font-black mb-2 tracking-tight"
          style={{ color: "#60a5fa", direction: "ltr", textAlign: "right" }}
        >
          <AnimatedCounter
            value={kpis.revenue}
            format={formatSAR}
            prefix="SAR "
            animateFromZero={animateCountersFromZero}
          />
        </p>
        <p className="text-xs" style={{ color: "#8b8ba7" }}>
          • كو-ليفنج (إشغال {occupancy}%)
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SmallKPI
          icon={DollarSign}
          label="صافي دخل المالك"
          value={kpis.netRevenue}
          formatSAR={formatSAR}
          color="#34d399"
          bg="#1a2e26"
          unit="ريال سعودي / سنة"
          animateCountersFromZero={animateCountersFromZero}
        />
        <SmallKPI
          icon={Home}
          label="الإيراد السنوي / وحدة"
          value={kpis.annualPerUnit}
          formatSAR={formatSAR}
          color="#a78bfa"
          bg="#231a3a"
          unit="ريال سعودي / سنة"
          animateCountersFromZero={animateCountersFromZero}
        />
        <SmallKPI
          icon={Calendar}
          label="الإيراد الشهري / وحدة"
          value={kpis.monthlyPerUnit}
          formatSAR={formatSAR}
          color="#fbbf24"
          bg="#2a2a1a"
          unit="ريال سعودي / شهر"
          animateCountersFromZero={animateCountersFromZero}
        />
      </div>
    </motion.div>
  );
}

function SmallKPI({ icon: Icon, label, value, formatSAR, color, bg, unit, animateCountersFromZero }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-2xl p-5 border"
      style={{ backgroundColor: "#1e1e2e", borderColor: "#2e2e3e", willChange: "transform, opacity" }}
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
        <Icon size={15} style={{ color }} />
      </div>
      <p className="text-xs mb-1 leading-snug" style={{ color: "#8b8ba7" }}>
        {label}
      </p>
      <p className="text-lg font-black" style={{ color }}>
        <AnimatedCounter value={value} format={formatSAR} animateFromZero={animateCountersFromZero} />
      </p>
      <p className="text-xs" style={{ color: "#4b4b6b" }}>
        {unit}
      </p>
    </motion.div>
  );
}
