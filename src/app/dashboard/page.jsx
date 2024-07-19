"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2'; // Import Doughnut component from react-chartjs-2

ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: ["Sales", "Expenses", "Profit"],
    datasets: [
      {
        label: "Performance",
        data: [1000, 500, 500],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);
      // Replace with actual data fetching logic
      setChartData({
        labels: ["Sales", "Expenses", "Profit"],
        datasets: [
          {
            label: "Performance",
            data: [800, 600, 200], // Replace with actual data
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  if (isLoading) {
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

        {/* Performance Chart */}
        <div>
          <h2>Performance Overview</h2>
          <Doughnut data={chartData} />
        </div>

        {/* Other Dashboard Widgets (replace with your needs) */}
        <div>
          <h2>Recent Activity</h2>
          {/* Add a list of recent activities or other relevant data */}
        </div>

        <button
          onClick={handleSignOut}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded mt-6"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
