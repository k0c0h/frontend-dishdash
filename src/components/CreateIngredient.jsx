import { useState } from "react";
import { createIngredient } from "../services/ingredientService";

export default function CreateIngredient({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    availableUnits: "",
    year: "",
    month: "",
    day: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createIngredient({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      availableUnits: Number(form.availableUnits),
      year: form.year ? Number(form.year) : undefined,
      month: form.month ? Number(form.month) : undefined,
      day: form.day ? Number(form.day) : undefined
    });

    setForm({
      name: "",
      category: "",
      price: "",
      availableUnits: "",
      year: "",
      month: "",
      day: ""
    });

    onCreated();
  };

  return (
    <>
      <h2>Crear Ingrediente</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
        <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} />
        <input name="availableUnits" type="number" placeholder="Stock" value={form.availableUnits} onChange={handleChange} />
        <input name="year" type="number" placeholder="Año" value={form.year} onChange={handleChange} />
        <input name="month" type="number" placeholder="Mes (1-12)" value={form.month} onChange={handleChange} min="1" max="12" />
        <input name="day" type="number" placeholder="Día" value={form.day} onChange={handleChange} min="1" max="31" />
        <button>Guardar</button>
      </form>
    </>
  );
}
