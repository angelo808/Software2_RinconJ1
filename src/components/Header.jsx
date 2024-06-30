import React, { useContext, useState } from "react";
import logo from "../assets/logo.PNG";
import { UserContext } from "../context/UserContext";
import GuestLinks from "./GuestLinks";
import UserInfo from "./UserInfo";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isLoggedIn, removeUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  const handleProfile = () => {
    navigate("/perfil");
  };

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };

  return (
    <header className="container h-16 bg-customColor flex items-center justify-between border-b-2 border-black border-solid p-1 m-auto">
      <div className="flex items-center text-lg font-bold text-neutral-500">
        <img className="w-12" src={logo} alt="logo" />
        <p className="mx-4"><Link to={!isLoggedIn ? "/" : "/inicio"}>EL RINCÓN DEL J1</Link></p>
      </div>
      <nav>
        <ul className="flex items-center">
          <li className="mx-2">
            <Link to="/calendario">Calendario</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="mx-2">
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </li>
              <UserInfo
                user={user}
                isInfoVisible={isInfoVisible}
                toggleInfoVisibility={toggleInfoVisibility}
                handleProfile={handleProfile}
                handleLogout={handleLogout}
              />
            </>
          ) : (
            <GuestLinks />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
