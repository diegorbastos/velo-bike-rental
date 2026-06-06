import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import useBikes from "@/features/velo/hooks/useBikes.js";
import { getImage, images } from "@/features/velo/data/images.js";
import { Checkbox } from "@/components/ui/checkbox";
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

const categories = ["Todas", "Urbana", "Elétrica", "Mountain", "Speed"];
const bikeCategories = categories.filter((category) => category !== "Todas");
const imageOptions = Object.keys(images).filter((key) => key.startsWith("bike-") || key === "velo-hero");

const emptyBike = {
  id: "",
  name: "",
  category: bikeCategories[0],
  price: "",
  image: imageOptions[0],
  available: true,
  isNew: false,
};

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
      <div className="flex justify-between items-baseline gap-3">
        <h3 className="text-sm">{bike.name}</h3>
        <p className="text-sm font-light text-muted-foreground">{bike.price}</p>
      </div>
    </div>
  </div>
);

const Bikes = () => {
  const [bikes, setBikes] = useBikes();
  const [activeCat, setActiveCat] = useState("Todas");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyBike);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    return bikes.filter((bike) => {
      if (activeCat !== "Todas" && bike.category !== activeCat) {
        return false;
      }
      if (availableOnly && !bike.available) {
        return false;
      }
      return true;
    });
  }, [activeCat, availableOnly, bikes]);

  const openCreate = () => {
    setEditing(null);
    setError("");
    setForm({
      ...emptyBike,
      id: String(Date.now()),
    });
    setOpen(true);
  };

  const openEdit = (bike) => {
    setEditing(bike);
    setError("");
    setForm(bike);
    setOpen(true);
  };

  const validateBike = () => {
    if (!form.name || !form.category || !form.price || !form.image) {
      return "Preencha nome, categoria, preço e imagem.";
    }

    const duplicateName = bikes.some(
      (bike) =>
        bike.id !== editing?.id &&
        bike.name.trim().toLowerCase() === form.name.trim().toLowerCase(),
    );

    if (duplicateName) {
      return "Já existe uma bike cadastrada com esse nome.";
    }

    return "";
  };

  const save = () => {
    const validationError = validateBike();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (editing) {
      setBikes((prev) => prev.map((bike) => (bike.id === editing.id ? form : bike)));
    } else {
      setBikes((prev) => [form, ...prev]);
    }

    setOpen(false);
  };

  const remove = (id) => {
    setBikes((prev) => prev.filter((bike) => bike.id !== id));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 px-6 pt-8 pb-14">
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

        <section className="mx-auto mt-14 max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">Gestão</p>
              <h2 className="text-3xl font-light">CRUD de bikes</h2>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                Cadastre, edite e remova bikes da frota.
              </p>
            </div>
            <Button onClick={openCreate} className="gap-2 rounded-none" variant="outline">
              <Plus className="h-4 w-4" /> Nova bike
            </Button>
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm font-light">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-normal">Bike</th>
                  <th className="px-4 py-3 font-normal">Categoria</th>
                  <th className="px-4 py-3 font-normal">Preço</th>
                  <th className="px-4 py-3 font-normal">Imagem</th>
                  <th className="px-4 py-3 font-normal">Disponível</th>
                  <th className="px-4 py-3 font-normal">Nova</th>
                  <th className="px-4 py-3 text-right font-normal">Ações</th>
                </tr>
              </thead>
              <tbody>
                {bikes.map((bike) => (
                  <tr key={bike.id} className="border-t border-border">
                    <td className="px-4 py-3">{bike.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{bike.category}</td>
                    <td className="px-4 py-3">{bike.price}</td>
                    <td className="px-4 py-3 text-muted-foreground">{bike.image}</td>
                    <td className="px-4 py-3">{bike.available ? "Sim" : "Não"}</td>
                    <td className="px-4 py-3">{bike.isNew ? "Sim" : "Não"}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEdit(bike)}
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => remove(bike.id)}
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {bikes.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-muted-foreground">
                      Nenhuma bike cadastrada.
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
              <DialogTitle className="font-light">{editing ? "Editar bike" : "Nova bike"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="bike-name">Nome</Label>
                <Input
                  id="bike-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bikeCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bike-price">Preço</Label>
                <Input
                  id="bike-price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label>Imagem</Label>
                <Select value={form.image} onValueChange={(value) => setForm({ ...form, image: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {imageOptions.map((imageKey) => (
                      <SelectItem key={imageKey} value={imageKey}>
                        {imageKey}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <label className="flex items-center gap-2 text-sm font-light">
                <Checkbox
                  checked={form.available}
                  onCheckedChange={(checked) => setForm({ ...form, available: Boolean(checked) })}
                  className="rounded-none"
                />
                Disponível
              </label>
              <label className="flex items-center gap-2 text-sm font-light">
                <Checkbox
                  checked={form.isNew}
                  onCheckedChange={(checked) => setForm({ ...form, isNew: Boolean(checked) })}
                  className="rounded-none"
                />
                Lançamento
              </label>
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

export default Bikes;
