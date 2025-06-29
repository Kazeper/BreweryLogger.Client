import { memo } from "react";
import { Table, Button } from "@mantine/core";

function NewIngredientList({ newIngredients, removeNewIngredient }) {
  const rows = newIngredients.map((ingredient) => (
    <Table.Tr key={ingredient.id}>
      <Table.Td>{ingredient.name}</Table.Td>
      <Table.Td>{ingredient.amount}</Table.Td>
      <Table.Td>{ingredient.unit}</Table.Td>
      <Table.Td>
        <Button
          size="xs"
          type="button"
          color="red"
          onClick={() => removeNewIngredient(ingredient.id)}
        >
          Remove
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Amount</Table.Th>
          <Table.Th>Unit</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Ingredients requested to save</Table.Caption>
    </Table>
  );
}

export default memo(NewIngredientList);
