import { useEffect, useState } from "react";
import { getIngredients } from "../services/ingredientService";

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  return (
    <>
      <h2>List of Ingredient</h2>
      {ingredients.map((i) => (
        <div className="card" key={i._id}>
          <p>
            <strong>{i.name}</strong>
          </p>
          <p>Categoría: {i.category}</p>\<p>Month: {i.month}</p>
          <p>Year: {i.year}</p>
          <p>Day: {i.day}</p>
          <p>Precio base: ${i.price}</p>
          <p>Stock: {i.availableUnits}</p>
        </div>
      ))}
    </>
  );
}
