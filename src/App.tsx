import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";

// Strani se naložijo šele, ko so potrebne — v načinu »prihaja kmalu«
// se koda za povezavo na bazo sploh ne izvede.
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ServiceImageAdmin = lazy(() => import("./pages/ServiceImageAdmin"));

// VITE_COMING_SOON=false vklopi celotno stran; privzeto je prikazana stran »prihaja kmalu«.
const comingSoon = import.meta.env.VITE_COMING_SOON !== "false";

const queryClient = new QueryClient();

const App = () => {
  if (comingSoon) return <ComingSoon />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/details" element={<Admin />} />
              <Route path="/admin/service-images" element={<ServiceImageAdmin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
