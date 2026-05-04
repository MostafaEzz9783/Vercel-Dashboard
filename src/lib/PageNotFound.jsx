import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center" dir="rtl">
      <div className="space-y-4">
        <p className="text-sm text-slate-500">404</p>
        <h1 className="text-2xl font-black text-slate-900">الصفحة غير موجودة</h1>
        <p className="text-sm text-slate-600">الرابط الذي طلبته غير متاح حالياً.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold text-white"
          style={{ backgroundColor: "#60a5fa" }}
        >
          العودة إلى لوحة التحكم
        </Link>
      </div>
    </div>
  );
}
