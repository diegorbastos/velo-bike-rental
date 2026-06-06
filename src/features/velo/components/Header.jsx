import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const MOBILE_BREAKPOINT = 768;

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/bikes", label: "Bikes" },
  { to: "/stations", label: "Estações" },
  { to: "/users", label: "Usuários" },
  { to: "/rents", label: "Aluguéis" },
];

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, isMobile]);

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
        <div className="relative flex h-14 items-center justify-between px-4">
          <button
            type="button"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-muted-foreground"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-base font-light tracking-[0.4em]"
          >
            VELO
          </Link>

          <div className="h-10 w-10" aria-hidden="true" />
        </div>

        {isMenuOpen ? (
          <div className="border-t border-border px-4 py-4">
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `text-sm font-light transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <Link
                to="/bikes"
                className="pt-2 text-sm font-light text-foreground transition-colors hover:text-muted-foreground"
              >
                Alugar uma bike
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="relative flex h-14 items-center justify-between px-6">
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `text-sm font-light transition-colors ${
                  isActive
                    ? "text-foreground underline underline-offset-[6px]"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-base font-light tracking-[0.4em]"
        >
          VELO
        </Link>

        <Link
          to="/bikes"
          className="text-sm font-light text-foreground transition-colors hover:text-muted-foreground"
        >
          Alugar uma bike
        </Link>
      </div>
    </header>
  );
};

export default Header;
