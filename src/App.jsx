// ============================================================
// App — Single Page Application (SPA) com React Router
// Rotas: /, /bikes, /stations, /users, /rents
// ============================================================
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./features/velo/pages/Home.jsx";
import Bikes from "./features/velo/pages/Bikes.jsx";
import Stations from "./features/velo/pages/Stations.jsx";
import Users from "./features/velo/pages/Users.jsx";
import Rents from "./features/velo/pages/Rents.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Navegação por rotas via React Router */}
          <Route path="/" element={<Home />} />
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/users" element={<Users />} />
          <Route path="/rents" element={<Rents />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
