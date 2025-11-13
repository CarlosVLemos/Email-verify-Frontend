import { Line } from 'react-chartjs-2';

const DashboardChart = ({ data, options }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Gráfico de Tendências</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardChart;