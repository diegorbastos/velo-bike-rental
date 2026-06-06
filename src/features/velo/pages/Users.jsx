import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import Header from "@/features/velo/components/Header.jsx";
import Footer from "@/features/velo/components/Footer.jsx";
import Stars from "@/features/velo/components/Stars.jsx";
import useUsers from "@/features/velo/hooks/useUsers.js";
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

const emptyUser = {
  initials: "",
  city: "",
  name: "",
  rating: 5,
  rents: 0,
  comment: "",
};

const Users = () => {
  const [users, setUsers] = useUsers();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyUser);
  const [error, setError] = useState("");

  const openCreate = () => {
    setEditing(null);
    setError("");
    setForm(emptyUser);
    setOpen(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setError("");
    setForm(user);
    setOpen(true);
  };

  const validateUser = () => {
    if (!form.initials || !form.city || !form.name || !form.comment) {
      return "Preencha iniciais, cidade, nome e comentário.";
    }

    const rating = Number(form.rating);
    const rents = Number(form.rents);

    if (Number.isNaN(rating) || rating < 0 || rating > 5) {
      return "A nota deve estar entre 0 e 5.";
    }

    if (Number.isNaN(rents) || rents < 0) {
      return "A quantidade de aluguéis deve ser igual ou maior que zero.";
    }

    const duplicateName = users.some(
      (user) => user.name !== editing?.name && user.name.trim().toLowerCase() === form.name.trim().toLowerCase(),
    );

    if (duplicateName) {
      return "Já existe um usuário cadastrado com esse nome.";
    }

    return "";
  };

  const save = () => {
    const validationError = validateUser();

    if (validationError) {
      setError(validationError);
      return;
    }

    const nextUser = {
      ...form,
      rating: Number(form.rating),
      rents: Number(form.rents),
      initials: form.initials.toUpperCase(),
    };

    if (editing) {
      setUsers((prev) => prev.map((user) => (user.name === editing.name ? nextUser : user)));
    } else {
      setUsers((prev) => [nextUser, ...prev]);
    }

    setOpen(false);
  };

  const remove = (name) => {
    setUsers((prev) => prev.filter((user) => user.name !== name));
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
            {users.map((renter) => (
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

        <section className="mx-auto mt-14 max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm uppercase tracking-widest text-muted-foreground">Gestão</p>
              <h2 className="text-3xl font-light">CRUD de usuários</h2>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                Mantenha o diretório de ciclistas e seus depoimentos sempre atualizado.
              </p>
            </div>
            <Button onClick={openCreate} className="gap-2 rounded-none" variant="outline">
              <Plus className="h-4 w-4" /> Novo usuário
            </Button>
          </div>

          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm font-light">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-normal">Usuário</th>
                  <th className="px-4 py-3 font-normal">Iniciais</th>
                  <th className="px-4 py-3 font-normal">Cidade</th>
                  <th className="px-4 py-3 font-normal">Nota</th>
                  <th className="px-4 py-3 font-normal">Aluguéis</th>
                  <th className="px-4 py-3 text-right font-normal">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.name} className="border-t border-border">
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.initials}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.city}</td>
                    <td className="px-4 py-3">{user.rating.toFixed(1)}</td>
                    <td className="px-4 py-3">{user.rents}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => openEdit(user)}
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => remove(user.name)}
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                      Nenhum usuário cadastrado.
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
                {editing ? "Editar usuário" : "Novo usuário"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="user-initials">Iniciais</Label>
                <Input
                  id="user-initials"
                  maxLength={3}
                  value={form.initials}
                  onChange={(e) => setForm({ ...form, initials: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="user-city">Cidade</Label>
                <Input
                  id="user-city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="user-name">Nome</Label>
                <Input
                  id="user-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="user-rating">Nota</Label>
                <Input
                  id="user-rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="user-rents">Aluguéis</Label>
                <Input
                  id="user-rents"
                  type="number"
                  min="0"
                  value={form.rents}
                  onChange={(e) => setForm({ ...form, rents: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="user-comment">Comentário</Label>
                <Input
                  id="user-comment"
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
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

export default Users;
