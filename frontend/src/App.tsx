// src/App.tsx
import "./App.css";
import { FormEvent, useState } from "react";
import { searchRecipes } from '../../backend/src/API';
import { Recipe } from "../../backend/src/recipe-api";
import RecipeModal from "./RecipeModal";

const App = () => {
  const [searchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { results } = await searchRecipes(searchTerm, 1);
      setRecipes(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <button type="submit">Submit</button>
      </form>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          Recipe Image Location: {recipe.image}
          <br />
          Recipe Title: {recipe.title}
        </div>
      ))}
    </div>
  );
  // ... rest of your component

  
};

// File: App.tsx
const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] =
    (useState < Recipe) || (undefined > undefined);

  return (
    <div className="App">
      {/* Other components and logic */}
      {selectedRecipe && (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      )}
    </div>
  );
};


export default App;