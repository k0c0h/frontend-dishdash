import IngredientTable from "./components/IngredientTable";
import CreateIngredient from "./components/CreateIngredient";
import "./styles/style.css";


function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sistema de Ingredientes</h1>

      <CreateIngredient onCreated={() => window.location.reload()} />
      <IngredientTable />
    </div>
  );
}

export default App;
