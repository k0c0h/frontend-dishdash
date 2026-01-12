import { useState } from "react";
import { sellIngredient } from "../services/ingredientService";

export default function SellIngredientModal({ ingredient, onClose, onSold }) {
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(null);

  if (!ingredient) return null;

  // 🔐 Valores seguros
  const price = Number(ingredient.price) || 0;
  const iva = 0.12;
  const priceWithIva = price * (1 + iva);

  const handleSell = async () => {
    const res = await sellIngredient({
      id: ingredient._id,
      quantity: Number(quantity)
    });
    setResult(res);
    onSold();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Vender ingrediente</h2>

        <p><strong>{ingredient.name}</strong></p>
        <p>Precio base: ${price.toFixed(2)}</p>

        <label>Cantidad</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button className="btn-primary" onClick={handleSell}>
          Confirmar venta
        </button>

        {result && (
          <div className="result">
            <p>Precio unitario con IVA: ${priceWithIva.toFixed(2)}</p>
            <p><strong>Total: ${Number(result.total).toFixed(2)}</strong></p>
          </div>
        )}

        <button className="btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>

    
  );

}
