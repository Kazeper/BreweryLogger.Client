import { useStoreroomContext } from "../../hooks/context";
import {
  useFetchIngredients,
  useSaveIngredients,
} from "../../hooks/ingredientsReactQueryHooks";
import IngredientList from "./IngredientList";
import NewIngredientList from "./NewIngredientList";
import { useRef } from "react";

function Storeroom() {
  const {
    newIngredients,
    removeNewIngredient,
    addNewIngredient,
    clearNewIngredients,
  } = useStoreroomContext();

  const { isLoading, isError, data } = useFetchIngredients();
  const { saveIngredients, isPending } = useSaveIngredients();

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

  const handleSubmit = () => {
    if (!newIngredients || newIngredients.length < 1) {
      return;
    }
    saveIngredients(newIngredients, { onSuccess: () => clearNewIngredients() });
  };

  if (isLoading) {
    return <p style={{ marginTop: "1rem" }}>Loading...</p>;
  }

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

        {isPending ? (
          <h4>handling your request...</h4>
        ) : (
          <>
            <NewIngredientList
              newIngredients={newIngredients}
              removeNewIngredient={removeNewIngredient}
            />
            <button type="button" onClick={handleSubmit}>
              SAVE
            </button>
          </>
        )}
      </div>

      {isError ? (
        <p>We are sorry, but we weren't able to retrieve your data</p>
      ) : (
        <IngredientList ingredients={data} />
      )}
    </section>
  );
}
export default Storeroom;
