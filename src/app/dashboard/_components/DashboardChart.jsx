import PieChart from '@/components/shared/PieChart';
import BarChart from '@/components/shared/BarChart';

export default function DashboardChart({ data, type = 'bar', showPie = false }) {
  // Aceita tanto data.categories quanto data direto (array)
  const categories = Array.isArray(data) ? data : (data?.categories || data?.distribution || []);
  
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhum dado disponível para exibição
      </div>
    );
  }

  // Se showPie, passa os dados formatados para o PieChart
  if (showPie) {
    const pieData = categories.map(cat => ({
      category: cat.category || cat.label,
      subcategory: cat.subcategory,
      count: cat.count,
      percentage: cat.percentage,
    }));
    return <PieChart data={pieData} />;
  }

  // Formata dados para o BarChart
  const chartData = categories.map(cat => ({
    category: cat.category || cat.label,
    label: cat.category || cat.label,
    count: cat.count,
    value: cat.count,
    subcategory: cat.subcategory,
  }));

  // Calcula total de emails da soma das categorias se não estiver disponível
  const totalEmails = data?.total_emails || categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

  return <BarChart data={chartData} maxValue={totalEmails} />;
}
