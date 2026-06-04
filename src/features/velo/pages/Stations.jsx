import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import useRents from "@/features/velo/hooks/useRents.js";
import stationsData from "@/features/velo/data/stations.json";
import { getImage } from "@/features/velo/data/images.js";
import { getStationAvailability } from "@/features/velo/lib/stationAvailability.js";

const StationCard = ({ station }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={getImage("station")}
        alt={`${station.name} em ${station.city}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
    <div className="mt-3 space-y-0.5">
      <p className="text-xs font-light text-muted-foreground">{station.city}</p>
      <div className="flex justify-between items-baseline">
        <h3 className="text-base">{station.name}</h3>
        <p className="text-sm font-light text-muted-foreground">
          {station.available} / {station.capacity} disponíveis
        </p>
      </div>
      <p className="text-sm font-light text-muted-foreground">
        {station.address} · {station.hours}
      </p>
    </div>
  </div>
);

const Stations = () => {
  const [rents] = useRents();
  const stations = getStationAvailability(stationsData, rents);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-8">
        <nav className="mb-6 flex items-center gap-1 text-sm font-light text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Início
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Estações</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-light text-foreground md:text-5xl">Estações</h1>
          <p className="mt-2 text-sm font-light text-muted-foreground">
            Retire e devolva uma bike em qualquer uma das nossas {stations.length} estações pelo Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stations;
