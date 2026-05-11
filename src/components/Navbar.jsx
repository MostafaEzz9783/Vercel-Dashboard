import { Globe, TrendingUp } from "lucide-react";

const MARKET_DATA_URL = "https://docs.google.com/spreadsheets/d/1fdr5CU6ACqa14Zs_H7mRsQDpBKwAcVHhHkWhuFhf-BM/edit";

export default function Navbar({ language, t, onToggleLanguage }) {
  return (
    <header className="border-b sticky top-0 z-50 bg-white" style={{ borderColor: "#e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center justify-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
          >
            <Globe size={14} />
            <span>{t.nav.languageToggle}</span>
          </button>
          <a
            href={MARKET_DATA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#e5e7eb", color: "#374151" }}
          >
            <TrendingUp size={14} />
            {t.nav.marketData}
          </a>
        </div>

        <img
          src="https://media.base44.com/images/public/user_69272bf2c53025a38561a49a/68fb9858c_WhatsApp_Image_2025-11-24_at_124254-removebg-preview.png"
          alt={t.nav.brandAlt}
          className="h-10 sm:h-12 object-contain self-center sm:self-auto"
        />
      </div>
    </header>
  );
}
