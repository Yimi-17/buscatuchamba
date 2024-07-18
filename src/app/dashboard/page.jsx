// app/dashboard/page.jsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="p-8 bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        {session?.user && (
          <div className="mb-6">
            <p className="text-lg text-gray-700">Bienvenido, <span className="font-semibold">{session.user.name}</span></p>
            <p className="text-md text-gray-600">{session.user.email}</p>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;