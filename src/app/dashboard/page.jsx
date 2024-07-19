"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import Avatar from 'react-avatar'; // Import the Avatar component

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

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="p-8 bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-lg">
        <div className="flex flex-col items-center mb-6">
          {session?.user && (
            <>
              <Avatar name={session.user.name} size="100" round={true} />
              <h1 className="text-4xl font-bold mt-4 text-gray-800">Bienvenido, {session.user.name}</h1>
            </>
          )}
        </div>

        {/* Performance Chart */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Performance Overview</h2>
          <div className="w-72 h-72">
            <Doughnut data={chartData} />
          </div>
        </div>

        {/* Other Dashboard Widgets (replace with your needs) */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          {/* Add a list of recent activities or other relevant data */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
