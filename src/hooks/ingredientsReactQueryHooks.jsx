import { useQuery, useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import breweryAxios from "../utils";

export function useFetchIngredients() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
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
      //TODO add toast
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { saveIngredients, isPending };
}

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteIngredient, isPending: deleteIngredientLoading } =
    useMutation({
      mutationFn: (ingredientId) => {
        return breweryAxios.delete(`/ingredient/${ingredientId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      },
    });
  return { deleteIngredient, deleteIngredientLoading };
};
