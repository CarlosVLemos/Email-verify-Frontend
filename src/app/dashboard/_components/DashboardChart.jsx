export default function DashboardChart({ data, type }) {
  console.log('📈 Chart Data Completo:', JSON.stringify(data, null, 2));
  console.log('📈 Categorias Array:', data?.categories);
  console.log('📈 Total de categorias:', data?.categories?.length);
  
  if (!data || !data.categories || data.categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Nenhum dado disponível para exibição
      </div>
    );
  }

  // Cores para as categorias e subcategorias
  const categoryColors = {
    // Categorias principais
    'work': { bg: 'bg-blue-500', text: 'text-blue-400' },
    'personal': { bg: 'bg-green-500', text: 'text-green-400' },
    'promotional': { bg: 'bg-yellow-500', text: 'text-yellow-400' },
    'spam': { bg: 'bg-red-500', text: 'text-red-400' },
    'other': { bg: 'bg-gray-500', text: 'text-gray-400' },
    
    // Subcategorias
    'productive': { bg: 'bg-emerald-500', text: 'text-emerald-400' },
    'non-productive': { bg: 'bg-orange-500', text: 'text-orange-400' },
    'urgent': { bg: 'bg-red-600', text: 'text-red-400' },
    'important': { bg: 'bg-purple-500', text: 'text-purple-400' },
    'normal': { bg: 'bg-blue-400', text: 'text-blue-300' },
    'low-priority': { bg: 'bg-gray-400', text: 'text-gray-300' }
  };

  const maxCount = Math.max(...data.categories.map(cat => cat.count));
  
  console.log('📈 Max count:', maxCount);
  console.log('📈 Processando categorias:');
  data.categories.forEach((cat, idx) => {
    console.log(`  ${idx + 1}. ${cat.category}: ${cat.count} emails`);
  });

  return (
    <div className="space-y-4">
      {data.categories.map((category, index) => {
        const percentage = ((category.count / data.total_emails) * 100).toFixed(1);
        const barWidth = (category.count / maxCount) * 100;
        const colors = categoryColors[category.category] || categoryColors['other'];

        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors.bg}`}></div>
                <span className="text-white font-medium capitalize">{category.category}</span>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">{category.count}</span>
                <span className="text-gray-400 text-sm ml-2">({percentage}%)</span>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full ${colors.bg} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${barWidth}%` }}
              ></div>
            </div>
          </div>
        );
      })}

      {/* Total */}
      <div className="pt-4 mt-4 border-t border-white/20">
        <div className="flex justify-between items-center">
          <span className="text-gray-300 font-medium">Total</span>
          <span className="text-white font-bold text-lg">{data.total_emails} emails</span>
        </div>
      </div>
    </div>
  );
}
