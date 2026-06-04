import { useMemo, useState } from "react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import bikesData from "@/features/velo/data/bikes.json";
import { getImage } from "@/features/velo/data/images.js";
import { Checkbox } from "@/components/ui/checkbox";

const BikeCard = ({ bike }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-square overflow-hidden">
      <img
        src={getImage(bike.image)}
        alt={bike.name}
        loading="lazy"
        width={512}
        height={512}
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
          !bike.available ? "opacity-45" : ""
        }`}
      />
      {bike.isNew && bike.available && (
        <span className="absolute left-2 top-2 bg-background/80 px-2 py-0.5 text-[10px] font-light tracking-wider text-foreground">
          NOVA
        </span>
      )}
      {!bike.available && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-2 py-1 text-xs font-medium tracking-wider text-black">
            INDISPONÍVEL
          </span>
        </div>
      )}
    </div>
    <div className="mt-3 space-y-0.5">
      <p className="text-xs font-light text-muted-foreground">{bike.category}</p>
      <div className="flex justify-between items-baseline">
        <h3 className="text-sm">{bike.name}</h3>
        <p className="text-sm font-light text-muted-foreground">{bike.price}</p>
      </div>
    </div>
  </div>
);

const categories = ["Todas", "Urbana", "Elétrica", "Mountain", "Speed"];

const Bikes = () => {
  const [activeCat, setActiveCat] = useState("Todas");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    return bikesData.filter((bike) => {
      if (activeCat !== "Todas" && bike.category !== activeCat) {
        return false;
      }
      if (availableOnly && !bike.available) {
        return false;
      }
      return true;
    });
  }, [activeCat, availableOnly]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
          <div className="flex items-center gap-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCat(category)}
                className={`text-sm font-light transition-colors ${
                  activeCat === category
                    ? "text-foreground underline underline-offset-[6px]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-light text-foreground">
              <Checkbox
                checked={availableOnly}
                onCheckedChange={(checked) => setAvailableOnly(Boolean(checked))}
                className="rounded-none"
              />
              Apenas disponíveis
            </label>
          </div>
        </div>

        <p className="mb-6 pt-3 text-sm font-light text-muted-foreground">
          {filtered.length} bikes
        </p>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filtered.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bikes;
