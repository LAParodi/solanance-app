import {
  LuHandCoins,
  LuLogOut,
  LuWalletMinimal,
  LuLayoutDashboard,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Inicio",
    icon: LuLayoutDashboard,
    path: "/inicio",
  },
  {
    id: "02",
    label: "Ingresos",
    icon: LuWalletMinimal,
    path: "/ingresos",
  },
  {
    id: "03",
    label: "Consumos",
    icon: LuHandCoins,
    path: "/consumos",
  },
  {
    id: "05",
    label: "Salir",
    icon: LuLogOut,
    path: "cerrar-sesion",
  },
];
