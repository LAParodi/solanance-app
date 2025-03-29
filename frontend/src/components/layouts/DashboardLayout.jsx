import { useContext } from "react";

import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

import { UserContext } from "../../context/UserContext";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {    
    return <div>Loading...</div>;
  }
  
  return (
    <section>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1024px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </section>
  );
};

export default DashboardLayout;
