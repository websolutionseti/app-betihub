import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import { AuthPage } from "./pages/auth/AuthPage";
import { BriefingListPage } from "./pages/briefings/BriefingListPage";
import { BriefingFormPage } from "./pages/briefings/BriefingFormPage";
import { BriefingDetailPage } from "./pages/briefings/BriefingDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/briefings" element={
              <ProtectedRoute>
                <BriefingListPage />
              </ProtectedRoute>
            } />
            <Route path="/briefings/new" element={
              <ProtectedRoute>
                <BriefingFormPage />
              </ProtectedRoute>
            } />
            <Route path="/briefings/:id" element={
              <ProtectedRoute>
                <BriefingDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/briefings/:id/edit" element={
              <ProtectedRoute>
                <BriefingFormPage />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
