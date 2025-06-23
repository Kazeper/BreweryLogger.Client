import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import breweryAxios from "../utils";

export function useFetchIngredients() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      console.log("fetching data");
      const { data } = await breweryAxios.get("/ingredient/all");
      return data;
    },
  });

  return { isLoading, isError, data };
}

export function useSaveIngredients() {
  const queryClient = useQueryClient();
  const { mutate: saveIngredients, isPending } = useMutation({
    mutationFn: (ingredients) => {
      const input = ingredients.map(({ name, amount, unit }) => {
        return { name, amount, unit };
      });
      console.log(input);
      return breweryAxios.post("/ingredient", input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      notifications.show({
        // id: "ingredients",
        title: "Ingredients",
        message: "Item(s) saved successfully!",
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { saveIngredients, isPending };
}

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();

  const { mutate: updateIngredient, isPending: updateIngredientLoading } =
    useMutation({
      mutationFn: (ingredient) => {
        return breweryAxios.put(`/ingredient/${ingredient.id}`, ingredient);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        notifications.show({
          // id: "ingredients",
          title: "Ingredients",
          message: "Item updated!",
        });
      },
    });
  return { updateIngredient, updateIngredientLoading };
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteIngredient, isPending: deleteIngredientLoading } =
    useMutation({
      mutationFn: (ingredientId) => {
        return breweryAxios.delete(`/ingredient/${ingredientId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
        notifications.show({
          // id: "ingredients",
          title: "Ingredients",
          message: "Item removed!",
        });
      },
    });
  return { deleteIngredient, deleteIngredientLoading };
};
