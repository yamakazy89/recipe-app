import React, { useState, FormEvent, useRef } from "react";
import RecipeCard from "./components/RecipeCard";

function App() {
    // ... rest of the code

    const handleSearchSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
        const response = await fetch(
            `http://localhost:5000/api/recipes/search?searchTerm=${searchTerm}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.results);
        } catch (error) {
        console.error(error);
        }

        setRecipes(recipes.results);
        pageNumber.current = 1;
    };

    const pageNumber = useRef(1);

    return (
    <div>
        <form onSubmit={handleSearchSubmit}>
        <input
            type="text"
            required
            placeholder="Enter a search term"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Submit</button>
        </form>
        {recipes.map((recipe) => (
    <RecipeCard key={recipe.id} recipe={recipe} />
    ))}

<button className="view-more" onClick={handleViewMoreClick}>
        View More
    </button>;
    </div>

    
    );

    const handleViewMoreClick = async () => {
        try {
        const nextPage = pageNumber.current + 1;
        const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
        nextRecipes((prevRecipes: any) => [...prevRecipes, ...nextRecipes.results]);
        pageNumber.current = nextPage;
        } catch (error) {
        console.error(error);
        }
    };

export default App;

function setRecipes(results: any) {
        throw new Error("Function not implemented.");
    }
