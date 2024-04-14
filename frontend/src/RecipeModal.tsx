import React, { useState, useEffect } from "react";
import { RecipeSummary } from "../../backend/src/types";

interface Props {
recipeId: string;
onClose: () => void;
}

const RecipeModal: React.FC<Props> = ({ recipeId, onClose }) => {
const [recipeSummary, setRecipeSummary] =
    (useState < RecipeSummary) | (null > null);

useEffect(() => {
    const fetchRecipeSummary = async () => {
    try {
        const summary = await getRecipeSummary(recipeId);
        setRecipeSummary(summary);
    } catch (error) {
        console.error(error);
    }
    };
    fetchRecipeSummary();
}, [recipeId]);

return (
    <div className="overlay">
    <div className="modal">
        <div className="modal-content">
        <div className="modal-header">
            <h2>{recipeSummary?.title}</h2>
            <span className="close-button" onClick={onClose}>
            &times;
            </span>
        </div>
        <p dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }} />
        </div>
    </div>
    </div>
);
};

export default RecipeModal;