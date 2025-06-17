import { useStoreroomContext } from "../../hooks/context";
import IngredientList from "./IngredientList";
import NewIngredientList from "./NewIngredientList";
import { useRef } from "react";

function Storeroom() {
  const { newIngredients, removeNewIngredient, addNewIngredient } =
    useStoreroomContext();

  const nameInput = useRef(null);
  const amountInput = useRef(null);
  const unitInput = useRef(null);

  const handleAdd = () => {
    //add validation one day...
    const newIngredient = {
      name: nameInput.current.value,
      amount: amountInput.current.value,
      unit: unitInput.current.value,
    };

    addNewIngredient(newIngredient);
    nameInput.current.value = "";
    amountInput.current.value = "";
    unitInput.current.value = "";
  };

  const handleSubmit = () => {};

  return (
    <section>
      <p>
        Welcome in your storeroom! You can add, remove and update your
        ingredients!
      </p>
      <div className="new-items-container">
        <div>
          <input type="text" ref={nameInput} name="name" placeholder="name" />
          <input
            type="text"
            ref={amountInput}
            name="amount"
            placeholder="amount"
          />
          <input type="text" ref={unitInput} name="unit" placeholder="unit" />
          <button type="button" onClick={handleAdd}>
            Add
          </button>
        </div>
        <hr style={{ marginTop: "2rem" }} />

        <NewIngredientList
          newIngredients={newIngredients}
          removeNewIngredient={removeNewIngredient}
        />
        <button type="button" onClick={handleSubmit}>
          SAVE
        </button>
      </div>
      <IngredientList />
    </section>
  );
}
export default Storeroom;
