import { useState } from "react";
import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";

import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <nav className="navbar">
      <button
        onClick={() => {
          setOpenSideMenu(!openSideMenu);
        }}
        className="block lg:hidden text-black cursor-pointer"
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="title">Solnance</h2>

      {openSideMenu && (
        <div className="sideBar">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
