import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 w-full border-t border-border">
      <div className="w-full px-12 pb-10 pt-10">
        <div className="grid w-full grid-cols-3 items-start gap-16">
          <section>
            <h3 className="mb-5 text-sm font-light tracking-[0.35em] text-foreground">VELO</h3>
            <p className="max-w-xl text-sm font-light leading-6 text-muted-foreground">
              Aluguel de bikes urbanas para o dia a dia, passeios de fim de semana e tudo entre eles.
            </p>
          </section>

          <section className="justify-self-center">
            <h3 className="mb-5 text-sm font-light text-foreground">Pedale</h3>
            <ul className="space-y-3 text-sm font-light text-muted-foreground">
              <li><Link to="/bikes" className="transition-colors hover:text-foreground">Todas as bikes</Link></li>
              <li>Urbana</li>
              <li>Elétrica</li>
              <li>Mountain</li>
              <li>Speed</li>
            </ul>
          </section>

          <section className="justify-self-end">
            <h3 className="mb-5 text-sm font-light text-foreground">Rede</h3>
            <ul className="space-y-3 text-sm font-light text-muted-foreground">
              <li><Link to="/stations" className="transition-colors hover:text-foreground">Estações</Link></li>
              <li><Link to="/users" className="transition-colors hover:text-foreground">Melhores usuários</Link></li>
              <li><Link to="/rents" className="transition-colors hover:text-foreground">Aluguéis recentes</Link></li>
            </ul>
          </section>
        </div>

        <div className="mt-12 flex w-full items-center justify-between gap-6 border-t border-border pt-6 text-sm font-light text-muted-foreground">
          <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} Velo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
