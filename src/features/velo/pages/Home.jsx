import { Link } from "react-router-dom";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import Stars from "@/features/velo/components/Stars.jsx";
import heroBike from "@/features/velo/assets/velo-hero.jpg";
import stationImg from "@/features/velo/assets/station.jpg";
import riderImg from "@/features/velo/assets/rider.jpg";
import bikesData from "@/features/velo/data/bikes.json";
import usersData from "@/features/velo/data/users.json";
import { getImage } from "@/features/velo/data/images.js";

const Home = () => {
  const featured = bikesData.slice(0, 4);
  const topRenters = usersData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="px-6 pt-6 pb-10">
          <div className="w-full aspect-[16/9] overflow-hidden">
            <img
              src={heroBike}
              alt="Bike preta de estrada em parede creme"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
            />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h1 className="text-2xl font-light leading-tight md:text-3xl">
                Pedale pela cidade,
                <br />
                no seu ritmo.
              </h1>
            </div>
            <div className="md:pt-1">
              <p className="max-w-md text-sm font-light text-muted-foreground">
                Uma frota de bikes urbanas, elétricas, mountain e speed para retiradas e devoluções
                em qualquer uma das nossas estações pelo Brasil.
              </p>
              <Link
                to="/bikes"
                className="mt-4 inline-block text-sm font-light text-foreground underline underline-offset-4"
              >
                Ver a frota
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-sm font-light text-foreground">Bikes em destaque</h2>
            <Link
              to="/bikes"
              className="text-sm font-light text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {featured.map((bike) => (
              <Link key={bike.id} to="/bikes" className="group block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={getImage(bike.image)}
                    alt={bike.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-xs font-light text-muted-foreground">{bike.category}</p>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm">{bike.name}</h3>
                    <p className="text-sm font-light text-muted-foreground">{bike.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Link to="/stations" className="group block">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={stationImg}
                  alt="Bikes em uma estação"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm">6 estações pelo Brasil</h3>
                <p className="text-sm font-light text-muted-foreground">Retire e devolva onde estiver.</p>
              </div>
            </Link>
            <Link to="/users" className="group block">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={riderImg}
                  alt="Ciclista no fim da tarde"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-sm">Ciclistas avaliados pela comunidade</h3>
                <p className="text-sm font-light text-muted-foreground">
                  Uma rede confiável de usuários frequentes.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className="px-6 pt-12 pb-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-sm font-light text-foreground">Melhores usuários do mês</h2>
            <Link
              to="/users"
              className="text-sm font-light text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Ver diretório
            </Link>
          </div>
          <div className="grid grid-cols-1 border border-border md:grid-cols-3">
            {topRenters.map((renter) => (
              <div
                key={renter.name}
                className="border-b border-border px-4 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <p className="text-xs font-light text-muted-foreground">{renter.city}</p>
                <p className="mt-2 text-base">{renter.name}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Stars value={renter.rating} />
                  <span className="text-xs font-light text-muted-foreground">
                    {renter.rents} aluguéis
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
