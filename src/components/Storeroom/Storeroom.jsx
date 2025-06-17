import { useStoreroomContext } from "../../hooks/context";
import AddIngredient from "./NewIngredient";
import IngredientList from "./IngredientList";
import { useCallback, useState } from "react";
import NewIngredientList from "./NewIngredientList";

function Storeroom() {
  const { newIngredients, removeNewIngredient } = useStoreroomContext();

  // const removeNewIngredient = useCallback((id) => {}, []);

  return (
    <section>
      <p>
        Welcome in your storeroom! You can add, remove and update your
        ingredients!
      </p>
      <div className="new-items-container">
        <NewIngredientList
          newIngredients={newIngredients}
          removeNewIngredient={removeNewIngredient}
        />
      </div>
      <IngredientList />
    </section>
  );
}
export default Storeroom;
