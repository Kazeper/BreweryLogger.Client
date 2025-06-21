import { memo } from "react";
import { Table } from "@mantine/core";
import { useDeleteIngredient } from "../../hooks/ingredientsReactQueryHooks";

function IngredientList({ ingredients }) {
  const { deleteIngredient } = useDeleteIngredient();

  const rows = ingredients.map((ingredient) => (
    <Table.Tr key={ingredient.id}>
      <Table.Td>{ingredient.name}</Table.Td>
      <Table.Td>{ingredient.amount}</Table.Td>
      <Table.Td>{ingredient.unit}</Table.Td>
      <Table.Td>
        <button type="button" onClick={() => console.log("edit")}>
          Edit
        </button>
        <button type="button" onClick={() => deleteIngredient(ingredient.id)}>
          Remove
        </button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <section>
      <h4>Your ingredients</h4>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Unit</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </section>
  );
}
export default memo(IngredientList);
