'use client'

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    signOut();
    setShowConfirmLogout(false);
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-4 shadow-md">
        <h1 className="text-2xl font-bold hover:text-gray-300 transition duration-300">
          <Link href="/">NextAuth</Link>
        </h1>

        <ul className="flex gap-x-6 items-center">
          <NavLink href="/">Inicio</NavLink>
          {!session?.user ? (
            <>
              <NavLink href="/auth/login">Iniciar Sesión</NavLink>
              <NavLink href="/auth/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Registrar
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white">
              Cerrar Sesión
            </button>
          )}
        </ul>
      </nav>

      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4 text-white">¿Está seguro que desea cerrar sesión?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700 text-white"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-white"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ href, children, className = "" }) {
  return (
    <li>
      <Link href={href} className={`hover:text-gray-300 transition duration-300 ${className}`}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
