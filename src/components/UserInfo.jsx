import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({
  user,
  isInfoVisible,
  toggleInfoVisibility,
  handleProfile,
  handleLogout,
}) => {
  return (
    <div className="flex items-center text-lg font-bold text-neutral-500">
      <div className="mx-4 hover:scale-105 hover:text-black">
        <Link to="mis-etapas">Mis etapas</Link>
      </div>

      <div className="mx-4 hover:scale-105 hover:text-black">
        <Link to="mis-foros">Mis foros</Link>
      </div>

      <div className="mx-4 relative text-black" onClick={toggleInfoVisibility}>
        {isInfoVisible ? (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
              fill="currentColor"
            />
            <path
              d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z"
              fill="currentColor"
            />
            <path d="M22 9H16V11H22V9Z" fill="currentColor" />
          </svg>
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 11C10.2091 11 12 9.20914 12 7C12 4.79086 10.2091 3 8 3C5.79086 3 4 4.79086 4 7C4 9.20914 5.79086 11 8 11ZM8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z"
              fill="currentColor"
            />
            <path
              d="M11 14C11.5523 14 12 14.4477 12 15V21H14V15C14 13.3431 12.6569 12 11 12H5C3.34315 12 2 13.3431 2 15V21H4V15C4 14.4477 4.44772 14 5 14H11Z"
              fill="currentColor"
            />
            <path d="M22 11H16V13H22V11Z" fill="currentColor" />
            <path d="M16 15H22V17H16V15Z" fill="currentColor" />
            <path d="M22 7H16V9H22V7Z" fill="currentColor" />
          </svg>
        )}

        {isInfoVisible && (
          <div className="w-96 h-auto absolute top-16 -right-5 bg-customColor p-4 rounded-lg shadow-lg z-10">
            <div className="flex items-center mb-4">
              <img
                src={user.foto || "https://via.placeholder.com/600"}
                alt="Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-bold text-lg">{user.nombre}</p>
                <p className="text-gray-600">{user.correo}</p>
                <p className="text-gray-600">{user.especialidad}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleProfile}
              >
                Ver Perfil
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
