import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import Stars from "@/features/velo/components/Stars.jsx";
import usersData from "@/features/velo/data/users.json";

const Users = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-8">
        <nav className="mb-6 flex items-center gap-1 text-sm font-light text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Início
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Usuários</span>
        </nav>

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-light text-foreground md:text-5xl">Usuários</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm font-light text-muted-foreground">
            Depoimentos dos nossos ciclistas mais ativos, avaliados pela comunidade.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {usersData.map((renter) => (
              <div
                key={renter.name}
                className="flex flex-col items-center border border-border px-6 py-8 text-center"
              >
                <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-light">
                  {renter.initials}
                </div>
                <p className="text-xs font-light text-muted-foreground">{renter.city}</p>
                <p className="mt-1 text-lg">{renter.name}</p>
                <div className="mb-4 mt-2">
                  <Stars value={renter.rating} />
                </div>
                <p className="text-sm font-light italic leading-relaxed text-muted-foreground">
                  "{renter.comment}"
                </p>
                <span className="mt-4 text-xs font-light text-muted-foreground">
                  {renter.rents} aluguéis
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Users;
