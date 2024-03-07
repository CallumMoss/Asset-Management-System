import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import '../style.css';
import '../Menustyle.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function FeatureCard({ title, description, subTitle }) {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg m-2 transition-transform duration-300 hover:scale-105">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p>{description}</p>
      {subTitle && <h3 className="text-xl font-bold mt-2">{subTitle}</h3>}
    </div>
  );
}

function Dashboard({ username, userRole }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Asset Types',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const [totalAssets, setTotalAssets] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/assets/refresh');
        const assets = response.data;

        setTotalAssets(assets.length);

        const typeCounts = assets.reduce((acc, asset) => {
          const { type_name } = asset.asset_type || {};
          if (type_name) {
            acc[type_name] = (acc[type_name] || 0) + 1;
          }
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(typeCounts),
          datasets: [
            {
              ...chartData.datasets[0],
              data: Object.values(typeCounts),
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar userRole={userRole} username={username} />
      <main className="flex-grow p-8">
        <h1 className="text-2xl font-semibold mb-4">IT Asset Management Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            title="Total Assets"
            description="Overview of all assets in the system."
            subTitle={`Total: ${totalAssets}`}
          />
          <FeatureCard
            title="Issues Reported"
            description="Track reported issues and maintenance."
          />
          <FeatureCard
            title="Asset Allocation"
            description="View how assets are distributed across departments."
          />
          <div className="bg-white p-4 shadow-md rounded-lg m-2 transition-transform duration-300 hover:scale-105">
            <h2 className="text-lg font-bold mb-2">Asset Distribution</h2>
            <Doughnut data={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
