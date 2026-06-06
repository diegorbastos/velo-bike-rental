import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Bikes from "./features/velo/pages/Bikes.jsx";
import Home from "./features/velo/pages/Home.jsx";
import Rents from "./features/velo/pages/Rents.jsx";
import Stations from "./features/velo/pages/Stations.jsx";
import Users from "./features/velo/pages/Users.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bikes" element={<Bikes />} />
      <Route path="/stations" element={<Stations />} />
      <Route path="/users" element={<Users />} />
      <Route path="/rents" element={<Rents />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
