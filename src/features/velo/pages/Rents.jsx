import { useMemo, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import useRents from "@/features/velo/hooks/useRents.js";
import useStations from "@/features/velo/hooks/useStations.js";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACTIVE_STATUS,
  CANCELED_STATUS,
  DONE_STATUS,
  findStationAvailability,
  getStationAvailability,
} from "@/features/velo/lib/stationAvailability.js";

const statusColor = {
  [ACTIVE_STATUS]: "bg-foreground text-background",
  [DONE_STATUS]: "bg-muted text-foreground",
  [CANCELED_STATUS]: "bg-destructive text-destructive-foreground",
};

const emptyRent = {
  id: "",
  user: "",
  bike: "",
  from: "",
  to: "",
  start: "",
  end: "",
  total: "R$ 0,00",
  status: ACTIVE_STATUS,
};

const Rents = () => {
  const [rents, setRents] = useRents();
  const [stations] = useStations();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyRent);
  const [error, setError] = useState("");

  const stationOptions = stations.map((station) => station.name);
  const availability = useMemo(
    () => getStationAvailability(stations, rents, editing?.id),
    [editing?.id, rents, stations],
  );

  const openCreate = () => {
    setEditing(null);
    setError("");
    setForm({
      ...emptyRent,
      id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
      from: stationOptions[0] ?? "",
      to: stationOptions[1] ?? stationOptions[0] ?? "",
    });
    setOpen(true);
  };

  const openEdit = (rent) => {
    setEditing(rent);
    setError("");
    setForm(rent);
    setOpen(true);
  };

  const validateRent = () => {
    if (!form.user || !form.bike || !form.from || !form.to || !form.start || !form.total) {
      return "Preencha usuário, bike, origem, destino, início e total.";
    }

    const origin = findStationAvailability(availability, form.from);
    const destination = findStationAvailability(availability, form.to);

    if (!origin || !destination) {
      return "Origem e destino precisam ser estações cadastradas.";
    }

    if (form.status !== CANCELED_STATUS && origin.available <= 0) {
      return `Não há bikes disponíveis para saída em ${form.from}.`;
    }

    if (form.status === DONE_STATUS && form.from !== form.to && destination.spaces <= 0) {
      return `Não há espaço disponível para entrega em ${form.to}.`;
    }

    return "";
  };

  const save = () => {
    const validationError = validateRent();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (editing) {
      setRents((prev) => prev.map((rent) => (rent.id === editing.id ? form : rent)));
    } else {
      setRents((prev) => [form, ...prev]);
    }
    setOpen(false);
  };

  const remove = (id) => {
    setRents((prev) => prev.filter((rent) => rent.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">Atividade</p>
              <h1 className="text-4xl font-light">Aluguéis</h1>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                {rents.filter((rent) => rent.status === ACTIVE_STATUS).length} aluguéis ativos agora
              </p>
            </div>
            <Button onClick={openCreate} className="gap-2 rounded-none" variant="outline">
              <Plus className="h-4 w-4" /> Novo aluguel
            </Button>
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm font-light">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-normal">Aluguel</th>
                  <th className="px-4 py-3 font-normal">Usuário</th>
                  <th className="px-4 py-3 font-normal">Bike</th>
                  <th className="px-4 py-3 font-normal">De / para</th>
                  <th className="px-4 py-3 font-normal">Início / fim</th>
                  <th className="px-4 py-3 font-normal">Total</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 text-right font-normal">Ações</th>
                </tr>
              </thead>
              <tbody>
                {rents.map((rent) => (
                  <tr key={rent.id} className="border-t border-border">
                    <td className="px-4 py-3">{rent.id}</td>
                    <td className="px-4 py-3">{rent.user}</td>
                    <td className="px-4 py-3">{rent.bike}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {rent.from} - {rent.to}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {rent.start} / {rent.end ?? "-"}
                    </td>
                    <td className="px-4 py-3">{rent.total}</td>
                    <td className="px-4 py-3">
                      <Badge className={`${statusColor[rent.status]} rounded-none font-light`}>
                        {rent.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEdit(rent)}
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => remove(rent.id)}
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {rents.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                      Nenhum aluguel registrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg rounded-none">
            <DialogHeader>
              <DialogTitle className="font-light">
                {editing ? "Editar aluguel" : "Novo aluguel"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="user">Usuário</Label>
                <Input id="user" value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="bike">Bike</Label>
                <Input id="bike" value={form.bike} onChange={(e) => setForm({ ...form, bike: e.target.value })} />
              </div>
              <div>
                <Label>De</Label>
                <Select value={form.from} onValueChange={(value) => setForm({ ...form, from: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stationOptions.map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Para</Label>
                <Select value={form.to} onValueChange={(value) => setForm({ ...form, to: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {stationOptions.map((station) => (
                      <SelectItem key={station} value={station}>
                        {station}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="start">Início</Label>
                <Input id="start" value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="end">Fim</Label>
                <Input id="end" value={form.end ?? ""} onChange={(e) => setForm({ ...form, end: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="total">Total (R$)</Label>
                <Input id="total" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} />
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ACTIVE_STATUS}>Ativo</SelectItem>
                    <SelectItem value={DONE_STATUS}>Concluído</SelectItem>
                    <SelectItem value={CANCELED_STATUS}>Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {error && (
              <p className="text-sm font-light text-destructive">
                {error}
              </p>
            )}
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

export default Rents;
