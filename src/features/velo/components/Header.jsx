import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/bikes", label: "Bikes" },
  { to: "/stations", label: "Estações" },
  { to: "/users", label: "Usuários" },
  { to: "/rents", label: "Aluguéis" },
];

const Header = () => {
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
