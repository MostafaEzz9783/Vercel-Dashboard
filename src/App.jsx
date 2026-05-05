import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import PageNotFound from "@/lib/PageNotFound";
import { translations } from "@/i18n/translations";
import { queryClientInstance } from "@/lib/query-client";

function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("mathwaa_language") || "ar");
  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    localStorage.setItem("mathwaa_language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "ar" ? "en" : "ar"));
  };

  return (
    <QueryClientProvider client={queryClientInstance}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                language={language}
                t={t}
                onToggleLanguage={toggleLanguage}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
