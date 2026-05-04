import { Globe, TrendingUp } from "lucide-react";

const MARKET_DATA_URL = "https://docs.google.com/spreadsheets";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 z-50 bg-white" style={{ borderColor: "#e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
          >
            <Globe size={14} />
            <span>English</span>
          </button>
          <a
            href={MARKET_DATA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ borderColor: "#e5e7eb", color: "#374151" }}
          >
            <TrendingUp size={14} />
            بيانات السوق
          </a>
        </div>

        <img
          src="https://media.base44.com/images/public/user_69272bf2c53025a38561a49a/68fb9858c_WhatsApp_Image_2025-11-24_at_124254-removebg-preview.png"
          alt="مثوى"
          className="h-12 object-contain"
        />
      </div>
    </header>
  );
}
