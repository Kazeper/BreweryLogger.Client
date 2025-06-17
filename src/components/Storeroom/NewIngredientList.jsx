import { memo, useRef } from "react";
import NewIngredient from "./NewIngredient";
import { useStoreroomContext } from "../../hooks/context";

function NewIngredientList({ newIngredients, removeNewIngredient }) {
  const { addNewIngredient } = useStoreroomContext();
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
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
      <div>
        {newIngredients.map((i) => {
          return (
            <NewIngredient
              key={i.id}
              {...i}
              handleRemove={removeNewIngredient}
            />
          );
        })}
        <button type="button" onClick={handleSubmit}>
          SAVE
        </button>
      </div>
    </div>
  );
}
export default memo(NewIngredientList);
