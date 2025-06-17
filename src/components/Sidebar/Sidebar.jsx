import sidebarElements from "./elements";
import SidebarElement from "./SidebarElement";

function Sidebar() {
  //TODO refactor once context added
  return (
    <nav>
      {sidebarElements.map((item) => {
        return <SidebarElement key={item.id} {...item} />;
      })}
    </nav>
  );
}
export default Sidebar;
