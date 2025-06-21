import { nanoid } from "nanoid";
import { createContext, useCallback, useContext, useState } from "react";

const StoreroomContext = createContext();
const BatchContext = createContext();

//wrapper
export function StoreroomProvider({ children }) {
  const [newIngredients, setNewIngredients] = useState([]);

  const addNewIngredient = ({ name, amount, unit }) => {
    const newValue = [...newIngredients, { id: nanoid(), name, amount, unit }];
    setNewIngredients(newValue);
  };

  const removeNewIngredient = useCallback((id) => {
    setNewIngredients((prevNewIngredients) =>
      prevNewIngredients.filter((i) => i.id !== id)
    );
  }, []);

  const clearNewIngredients = () => {
    setNewIngredients([]);
  };

  return (
    <StoreroomContext.Provider
      value={{
        newIngredients,
        addNewIngredient,
        removeNewIngredient,
        clearNewIngredients,
      }}
    >
      {children}
    </StoreroomContext.Provider>
  );
}

export function BatchProvider({ children }) {
  const greetings = () => console.log("hello from batch context");
  return (
    <BatchContext.Provider value={{ greetings }}>
      {children}
    </BatchContext.Provider>
  );
}

//custom hook
export const useStoreroomContext = () => useContext(StoreroomContext);
export const useBatchContext = () => useContext(BatchContext);
