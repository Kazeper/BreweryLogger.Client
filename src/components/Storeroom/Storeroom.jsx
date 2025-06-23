import { useStoreroomContext } from "../../hooks/context";
import {
  useFetchIngredients,
  useSaveIngredients,
} from "../../hooks/ingredientsReactQueryHooks";
import IngredientList from "./IngredientList";
import NewIngredientList from "./NewIngredientList";
import { useRef } from "react";
import { Notification, Button, TextInput, Group } from "@mantine/core";

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
    return (
      <Notification loading={true} withCloseButton={false} title="Loading..." />
    );
  }

  return (
    <section>
      <p className="title">
        Welcome in your storeroom! You can add, remove and update your
        ingredients!
      </p>
      <div className="new-items-container">
        <div className="inputs-container">
          <Group gap="xs">
            <TextInput ref={nameInput} name="name" placeholder="name" />
            <TextInput ref={amountInput} name="amount" placeholder="amount" />
            <TextInput
              type="text"
              ref={unitInput}
              name="unit"
              placeholder="unit"
            />
            <Button size="compact-md" ml="sm" onClick={handleAdd}>
              Add
            </Button>
          </Group>
        </div>
        <hr style={{ marginTop: "2rem", width: "100%" }} />

        {isPending ? (
          <h4>handling your request...</h4>
        ) : (
          <>
            <NewIngredientList
              newIngredients={newIngredients}
              removeNewIngredient={removeNewIngredient}
            />
            <Button
              style={{ marginTop: "1rem" }}
              color="teal"
              onClick={handleSubmit}
            >
              SAVE
            </Button>
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
