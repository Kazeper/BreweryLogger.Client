function NewIngredient({ id, name, amount, unit, handleRemove }) {
  return (
    <div>
      <input type="text" placeholder="name" value={name} />
      <input type="text" placeholder="amount" value={amount} />
      <input type="text" placeholder="unit" value={unit} />
      <button type="button" onClick={() => handleRemove(id)}>
        Remove
      </button>
    </div>
  );
}
export default NewIngredient;
