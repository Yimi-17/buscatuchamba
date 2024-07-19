import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          NextAuth
        </Link>
        <div className="space-x-4">
          {!session?.user ? (
            <>
              <Link href="/" className="text-white hover:text-gray-300">
                Inicio
              </Link>
              <Link href="/auth/login" className="text-white hover:text-gray-300">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="text-white hover:text-gray-300">
                Registrar
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <Link href="/api/auth/signout" className="text-white hover:text-gray-300">
                Cerrar Sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;