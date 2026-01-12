import { useState, useMemo } from "react";
import { updateIngredient } from "../services/ingredientService";

const IVA = 0.12;

const COUPONS = {
  PROMO10: 0.10,
  PROMO15: 0.15,
  VIP20: 0.20,
};

export default function SellPOSModal({ ingredients, onClose, onSold }) {
  const [selectedId, setSelectedId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const selectedIngredient = ingredients.find(i => i._id === selectedId);

  const addToCart = () => {
    if (!selectedIngredient) return;

    setCart(prev => [
      ...prev,
      {
        ...selectedIngredient,
        quantity,
      },
    ]);
    setQuantity(1);
  };

  const subtotal = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  // aplicar el mayor descuento
  const appliedDiscount = Math.max(discount / 100, couponDiscount);

  const discountedSubtotal = subtotal * (1 - appliedDiscount);
  const total = discountedSubtotal * (1 + IVA);

  const applyCoupon = () => {
    const value = COUPONS[coupon.toUpperCase()];
    setCouponDiscount(value ?? 0);
  };

  const confirmSale = async () => {
    for (const item of cart) {
      await updateIngredient(item._id, {
        availableUnits: item.availableUnits - item.quantity,
      });
    }
    onSold();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Nueva venta</h3>

        {/* Selector de ingredientes */}
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select ingredients</option>
          {ingredients.map(i => (
            <option key={i._id} value={i._id}>
              {i.name} - ${i.price}
            </option>
          ))}
        </select>

        {selectedIngredient && (
          <>
            <p>Precio: ${selectedIngredient.price}</p>

            <input
              type="number"
              min="1"
              max={selectedIngredient.availableUnits}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <button onClick={addToCart}>Agregar</button>
          </>
        )}

        <hr />

        {cart.map((item, idx) => (
          <div key={idx} className="sell-row">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr />

        {/* DESCUENTO */}
        <label>Descuento (%)</label>
        <input
          type="number"
          min="0"
          max="50"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />

        {/* CUPÓN */}
        <label>Cupón</label>
        <input
          placeholder="PROMO10"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={applyCoupon}>Aplicar cupón</button>

        <hr />

        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Descuento aplicado: {(appliedDiscount * 100).toFixed(0)}%</p>
        <p><strong>Total + IVA: ${total.toFixed(2)}</strong></p>

        <div className="modal-actions">
          <button onClick={confirmSale} disabled={!cart.length}>
            Confirmar venta
          </button>
          <button className="secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
