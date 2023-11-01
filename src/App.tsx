import "./App.scss";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <div className="page">
      <div className="header">Créer, modifier et supprimer des catégories</div>
      <CategoryPage />
      <div className="footer"></div>
    </div>
  );
}

export default App;
