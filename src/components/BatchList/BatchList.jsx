import { useBatchContext } from "../../hooks/context";

function BatchList() {
  const { greetings } = useBatchContext();
  greetings();
  return <div>BatchList</div>;
}
export default BatchList;
