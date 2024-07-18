'use client'

import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setShowConfirmLogout(true);
  };

  const confirmLogout = () => {
    signOut();
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-4 shadow-md">
        <h1 className="text-2xl font-bold hover:text-gray-300 transition duration-300">
          <Link href="/">NextAuth</Link>
        </h1>

        <ul className="flex gap-x-6 items-center">
          {!session?.user ? (
            <>
              <NavLink href="/">Inicio</NavLink>
              <NavLink href="/auth/login">Iniciar Sesión</NavLink>
              <NavLink href="/auth/register" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Registrar
              </NavLink>
            </>
          ) : (
            <>
              <NavLink href="/dashboard">Dashboard</NavLink>
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700 transition duration-300"
                >
                  {session.user.name}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm">
                      <p className="font-semibold">{session.user.name}</p>
                      <p className="text-gray-400">{session.user.email}</p>
                    </div>
                    <NavLink href="/auth/profile" className="block px-4 py-2 text-sm hover:bg-gray-700">
                      Perfil
                    </NavLink>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </>
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

function NavLink({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) {
  return (
    <li>
      <Link href={href}>
        <a className={`hover:text-gray-300 transition duration-300 ${className}`}>
          {children}
        </a>
      </Link>
    </li>
  );
}

export default Navbar;
