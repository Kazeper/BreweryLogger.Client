import { useState } from "react";
import { Table, Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  useDeleteIngredient,
  useUpdateIngredient,
} from "../../hooks/ingredientsReactQueryHooks";

function EditableIngredientRow({ id, name, amount, unit }) {
  console.log("rerender row");

  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newAmount, setNewAmount] = useState(amount);
  const [newUnit, setNewUnit] = useState(unit);

  const { deleteIngredient } = useDeleteIngredient();
  const { updateIngredient } = useUpdateIngredient();

  const cancelEdit = () => {
    setNewName(name);
    setNewAmount(amount);
    setNewUnit(unit);
    setIsEditEnabled(!isEditEnabled);
  };

  const handleUpdate = () => {
    updateIngredient({ id, name: newName, amount: newAmount, unit: newUnit });
    setIsEditEnabled(false);
  };

  const handleRemove = () => {
    //TODO write my own modal
    modals.openConfirmModal({
      title: "Delete record",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete {name} record?</Text>
      ),
      labels: { confirm: "Delete record", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteIngredient(id),
    });
  };

  return (
    <Table.Tr key={id}>
      <Table.Td>
        <input
          className={isEditEnabled ? "" : "input-no-border"}
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          disabled={!isEditEnabled}
        />
      </Table.Td>
      <Table.Td>
        <input
          className={isEditEnabled ? "" : "input-no-border"}
          type="number"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          disabled={!isEditEnabled}
        />
      </Table.Td>
      <Table.Td>
        <input
          className={isEditEnabled ? "" : "input-no-border"}
          type="text"
          value={newUnit}
          onChange={(e) => setNewUnit(e.target.value)}
          disabled={!isEditEnabled}
        />
      </Table.Td>
      <Table.Td>
        {isEditEnabled ? (
          <>
            <Button onClick={handleUpdate}>Save</Button>
            <Button ml="xs" color="gray" onClick={cancelEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => setIsEditEnabled(!isEditEnabled)}
            >
              Edit
            </Button>
            <Button ml="xs" color="red" onClick={handleRemove}>
              {/* <button type="button" onClick={() => deleteIngredient(id)}> */}
              Remove
            </Button>
          </>
        )}
      </Table.Td>
    </Table.Tr>
  );
}
export default EditableIngredientRow;
