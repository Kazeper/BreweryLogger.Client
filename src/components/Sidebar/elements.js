import { nanoid } from "nanoid";

//TODO consider nested elements
const sidebarElements = [
  { id: nanoid(), name: "Batches", icon: "", path: "/batches" },
  { id: nanoid(), name: "Storeroom", icon: "", path: "/storeroom" },
];

export default sidebarElements;
