import PieChart from '@/components/shared/PieChart';
import BarChart from '@/components/shared/BarChart';

export default function DashboardChart({ data, type = 'bar', showPie = false }) {
  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhum dado disponível para exibição
      </div>
    );
  }

  // Se quiser exibir gráfico de pizza
  if (showPie) {
    return <PieChart data={data} />;
  }

  // Preparar dados para o BarChart
  const chartData = data.categories.map(cat => ({
    category: cat.category,
    label: cat.category,
    count: cat.count,
    value: cat.count
  }));

  return <BarChart data={chartData} maxValue={data.total_emails} />;
}
