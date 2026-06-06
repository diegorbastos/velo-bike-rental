import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import useRents from "@/features/velo/hooks/useRents.js";
import useStations from "@/features/velo/hooks/useStations.js";
import { getImage, getStationImageKey } from "@/features/velo/data/images.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getStationAvailability } from "@/features/velo/lib/stationAvailability.js";

const emptyStation = {
  id: "",
  city: "",
  name: "",
  address: "",
  hours: "",
  capacity: 1,
};

const StationCard = ({ station }) => (
  <div className="group cursor-pointer">
    <div className="aspect-[4/3] overflow-hidden">
      <img
        src={getImage(getStationImageKey(station.name))}
        alt={`${station.name} em ${station.city}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
    <div className="mt-3 space-y-0.5">
      <p className="text-xs font-light text-muted-foreground">{station.city}</p>
      <div className="flex justify-between items-baseline gap-3">
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
  const [stations, setStations] = useStations();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyStation);
  const [error, setError] = useState("");

  const availability = useMemo(() => getStationAvailability(stations, rents), [rents, stations]);

  const openCreate = () => {
    setEditing(null);
    setError("");
    setForm({
      ...emptyStation,
      id: `s${Date.now()}`,
    });
    setOpen(true);
  };

  const openEdit = (station) => {
    setEditing(station);
    setError("");
    setForm({
      id: station.id,
      city: station.city,
      name: station.name,
      address: station.address,
      hours: station.hours,
      capacity: station.capacity,
    });
    setOpen(true);
  };

  const validateStation = () => {
    if (!form.city || !form.name || !form.address || !form.hours || Number(form.capacity) < 1) {
      return "Preencha cidade, nome, endereço, horário e uma capacidade válida.";
    }

    const duplicateName = stations.some(
      (station) =>
        station.id !== editing?.id &&
        station.name.trim().toLowerCase() === form.name.trim().toLowerCase(),
    );

    if (duplicateName) {
      return "Já existe uma estação cadastrada com esse nome.";
    }

    return "";
  };

  const save = () => {
    const validationError = validateStation();

    if (validationError) {
      setError(validationError);
      return;
    }

    const nextStation = {
      ...form,
      capacity: Number(form.capacity),
    };

    if (editing) {
      setStations((prev) => prev.map((station) => (station.id === editing.id ? nextStation : station)));
    } else {
      setStations((prev) => [nextStation, ...prev]);
    }

    setOpen(false);
  };

  const remove = (id) => {
    setStations((prev) => prev.filter((station) => station.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-8 pb-14">
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
            Retire e devolva uma bike em qualquer uma das nossas {availability.length} estações pelo Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availability.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>

        <section className="mx-auto mt-14 max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">Gestão</p>
              <h2 className="text-3xl font-light">CRUD de estações</h2>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                Atualize capacidade, localização e funcionamento das estações.
              </p>
            </div>
            <Button onClick={openCreate} className="gap-2 rounded-none" variant="outline">
              <Plus className="h-4 w-4" /> Nova estação
            </Button>
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm font-light">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-normal">Estação</th>
                  <th className="px-4 py-3 font-normal">Cidade</th>
                  <th className="px-4 py-3 font-normal">Endereço</th>
                  <th className="px-4 py-3 font-normal">Horário</th>
                  <th className="px-4 py-3 font-normal">Capacidade</th>
                  <th className="px-4 py-3 text-right font-normal">Ações</th>
                </tr>
              </thead>
              <tbody>
                {stations.map((station) => (
                  <tr key={station.id} className="border-t border-border">
                    <td className="px-4 py-3">{station.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{station.city}</td>
                    <td className="px-4 py-3 text-muted-foreground">{station.address}</td>
                    <td className="px-4 py-3">{station.hours}</td>
                    <td className="px-4 py-3">{station.capacity}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEdit(station)}
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => remove(station.id)}
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {stations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      Nenhuma estação cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg rounded-none">
            <DialogHeader>
              <DialogTitle className="font-light">
                {editing ? "Editar estação" : "Nova estação"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="station-city">Cidade</Label>
                <Input
                  id="station-city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="station-name">Nome</Label>
                <Input
                  id="station-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="station-address">Endereço</Label>
                <Input
                  id="station-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="station-hours">Horário</Label>
                <Input
                  id="station-hours"
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="station-capacity">Capacidade</Label>
                <Input
                  id="station-capacity"
                  type="number"
                  min="1"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                />
              </div>
            </div>
            {error && <p className="text-sm font-light text-destructive">{error}</p>}
            <DialogFooter>
              <Button variant="outline" className="rounded-none" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button className="rounded-none" onClick={save}>
                {editing ? "Salvar alterações" : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Stations;
