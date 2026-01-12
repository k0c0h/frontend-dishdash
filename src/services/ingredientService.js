const API_URL = `${process.env.REACT_APP_API_URL}/dishdash/ingredients`;

export const sellIngredient = async (data) => {
  const res = await fetch(`${API_URL}/sell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getIngredients = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createIngredient = async (ingredient) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ingredient)
  });
  return res.json();
};


export const deleteIngredient = async (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
};


export const updateIngredient = async (id, data) => {
  const res = await fetch(
    `${API_URL}/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  );
  return res.json();
};
