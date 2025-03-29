import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import CharAvatar from "../cards/CharAvatar";

import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";

const SideMenu = ({ activeMenu }) => {
  const navigate = useNavigate();

  const { user, clearUser } = useContext(UserContext);

  const handleClick = (route) => {
    if (route === "cerrar-sesion") {
      handleLogout();
      return;
    }

    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/ingresar");
  };

  return (
    <aside className="sideMenu">
      <div className="sideMenu__userDetails">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt={user.name}
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <CharAvatar
            name={user?.name}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <h5 className="user-name">{user?.name || ""}</h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`linkMenu ${
            activeMenu === item.label
              ? "text-secondary bg-(--text-color-primary)"
              : "hover:text-content/90"
          } ${
            item.label === "Salir"
              ? "hover:bg-rose-700/90 hover:text-white"
              : ""
          }`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </aside>
  );
};

export default SideMenu;
