import { useState } from "react";
import { sellIngredient } from "../services/ingredientService";

export default function SellIngredient() {
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(null);

  const handleSell = async () => {
    const response = await sellIngredient({
      id: "ID_DEL_INGREDIENTE",
      quantity
    });
    setResult(response);
  };

  return (
    <>
      <h2>Ingredient Sell</h2>

      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <button onClick={handleSell}>Vender</button>

      {result && (
        <div className="card">
          <p>Producto: {result.product}</p>
          <p>Cantidad: {result.quantity}</p>
          <p>Precio unitario con IVA: ${result.unitPrice}</p>
          <p>Total: ${result.total}</p>
          {result.discountApplied && (
            <p className="success">Descuento aplicado 🎉</p>
          )}
        </div>
      )}
    </>
  );
}
