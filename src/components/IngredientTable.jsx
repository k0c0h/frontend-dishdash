import { useEffect, useState } from "react";
import {
  getIngredients,
  deleteIngredient,
  updateIngredient,
} from "../services/ingredientService";
import SellIngredientModal from "./SellIngredientModal";
import EditIngredientModal from "./EditIngredientModal";
import SellPOSModal from "./SellPOSModal";

const IVA = 0.12;

export default function IngredientTable() {
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(null);

  const loadIngredients = async () => {
    const data = await getIngredients();
    setIngredients(data);
  };

  useEffect(() => {
    loadIngredients();
  }, []);

  const handleDelete = async (id) => {
    await deleteIngredient(id);
    loadIngredients();
  };

  const handlePriceUpdate = async (id, price) => {
    await updateIngredient(id, { price });
    loadIngredients();
  };

  const [editIngredient, setEditIngredient] = useState(null);
  const [openSale, setOpenSale] = useState(false);

  const filtered = category
    ? ingredients.filter(
        (i) => i.category?.toLowerCase() === category.toLowerCase()
      )
    : ingredients;

  return (
    <>
      <h2>Ingredientes</h2>

      <input
        className="filter"
        placeholder="Filter of category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br></br>
      <button
        className="btn-export"
        onClick={() => exportIngredients(filtered)}
      >
        Export ingredients as CSV
      </button>

      <button onClick={() => setOpenSale(true)}>New sell</button>
      {openSale && (
        <SellPOSModal
          ingredients={ingredients}
          onClose={() => setOpenSale(false)}
          onSold={loadIngredients}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Precio + IVA</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((i) => (
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.category}</td>
              <td>
                <input
                  type="number"
                  defaultValue={i.price}
                  onBlur={(e) =>
                    handlePriceUpdate(i._id, Number(e.target.value))
                  }
                />
              </td>
              <td>${(i.price * (1 + IVA)).toFixed(2)}</td>
              <td>{i.availableUnits ?? 0}</td>
              <td>
                <button onClick={() => setSelected(i)}>Vender</button>

                <button onClick={() => setEditIngredient(i)}>Editar</button>
                {editIngredient && (
                  <EditIngredientModal
                    ingredient={editIngredient}
                    onClose={() => setEditIngredient(null)}
                    onUpdated={loadIngredients}
                  />
                )}

                <button className="danger" onClick={() => handleDelete(i._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <SellIngredientModal
          ingredient={selected}
          onClose={() => setSelected(null)}
          onSold={loadIngredients}
        />
      )}
    </>
  );
}

const exportIngredients = (data) => {
  const headers = [
    "productId",
    "name",
    "category",
    "product",
    "brand",
    "size",
    "sizeUnit",
    "price",
    "availableUnits",
    "supplier",
  ];

  const csv = [
    headers.join(","),
    ...data.map((i) => headers.map((h) => `"${i[h] ?? ""}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ingredients.csv";
  a.click();
};
