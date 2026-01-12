import { useState } from "react";
import { updateIngredient } from "../services/ingredientService";

export default function EditIngredientModal({ ingredient, onClose, onUpdated }) {
  const [form, setForm] = useState({
    productId: ingredient.productId || "",
    name: ingredient.name || "",
    category: ingredient.category || "",
    product: ingredient.product || "",
    brand: ingredient.brand || "",
    size: ingredient.size || 0,
    sizeUnit: ingredient.sizeUnit || "",
    price: ingredient.price || 0,
    availableUnits: ingredient.availableUnits || 0,
    supplier: ingredient.supplier || ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await updateIngredient(ingredient._id, {
      ...form,
      size: Number(form.size),
      price: Number(form.price),
      availableUnits: Number(form.availableUnits)
    });

    onUpdated();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal large">
        <h2>Editar Ingrediente</h2>

        <label>Código del producto</label>
        <input name="productId" value={form.productId} onChange={handleChange} />

        <label>Nombre</label>
        <input name="name" value={form.name} onChange={handleChange} />
        <br />

        <label>Categoría</label>
        <input name="category" value={form.category} onChange={handleChange} />

        <br />
        <label>Producto</label>
        <input name="product" value={form.product} onChange={handleChange} />

        <br />
        <label>Marca</label>
        <input name="brand" value={form.brand} onChange={handleChange} />
        <br />
        <label>Tamaño</label>
        <input
          type="number"
          name="size"
          value={form.size}
          onChange={handleChange}
        />

        <br />
        <label>Unidad de tamaño</label>
        <input
          name="sizeUnit"
          placeholder="ml / g / kg"
          value={form.sizeUnit}
          onChange={handleChange}
        />
        <br />
        <label>Precio base</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        <br />
        <label>Stock disponible</label>
        <input
          type="number"
          name="availableUnits"
          value={form.availableUnits}
          onChange={handleChange}
        />
        <br />
        <label>Proveedor</label>
        <input
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
        />

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>
            Guardar cambios
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
