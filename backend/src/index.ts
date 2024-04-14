import express from "express";
import cors from "cors";
import * as RecipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";
import { getFavoriteRecipesByIds } from "../src/recipe-api";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipe/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);

    const results = await RecipeAPI.searchRecipes(searchTerm, page);
    return res.json(results);
});

app.listen(5000, () => {
console.log("Server running on localhost:5000")});

app.get("/api/recipe/:recipeId/summary", async (req, res) => {
    const recipeId = req.params.recipeId;
    const result = await recipeSummary(recipeId);
    res.json(result);
});

const prismaClient = new PrismaClient();

app.post("/api/recipes/favorite", async (req, res) => {
const { recipeId } = req.body;
try {
    const favoriteRecipe = await prismaClient.favoriteRecipe.create({
    data: { recipeId },
    });
    res.status(201).json(favoriteRecipe);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
}
});

app.get("/api/recipes/favorite", async (req, res) => {
    try {
    const favoriteRecipes = await prismaClient.favoriteRecipe.findMany();
    const recipeIds = favoriteRecipes.map((recipe: { recipeId: { toString: () => any; }; }) =>
        recipe.recipeId.toString()
    );
    const favorites = await getFavoriteRecipesByIds(recipeIds);
    res.json(favorites);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
    }
});

app.delete("/api/recipes/favorite", async (req, res) => {
    const { recipeId } = req.body;
    try {
    await prismaClient.favoriteRecipe.delete({
        where: { recipeId },
    });
    res.status(204).send();
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
    }
});