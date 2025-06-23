import { memo } from "react";
import { Table } from "@mantine/core";
import EditableIngredientRow from "./EditableIngredientRow";

function IngredientList({ ingredients }) {
  const rows = ingredients.map((ingredient) => {
    return <EditableIngredientRow key={ingredient.id} {...ingredient} />;
  });

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
