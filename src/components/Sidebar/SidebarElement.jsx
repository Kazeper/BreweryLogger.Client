import { Link } from "react-router-dom";
function SidebarElement({ name, path }) {
  return (
    <Link className="nav-item" to={path}>
      {name}
    </Link>
  );
}
export default SidebarElement;
