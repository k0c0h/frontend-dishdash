import { useState } from "react";
import { createIngredient } from "../services/ingredientService";

export default function CreateIngredient({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    availableUnits: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createIngredient({
      name: form.name,
      category: form.category,
      price: Number(form.price),
      availableUnits: Number(form.availableUnits)
    });

    setForm({
      name: "",
      category: "",
      price: "",
      availableUnits: ""
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
        <button>Guardar</button>
      </form>
    </>
  );
}
