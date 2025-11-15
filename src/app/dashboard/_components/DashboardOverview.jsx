export default function DashboardOverview({ data }) {
  const metrics = [
    {
      title: 'Total de Emails',
      value: data.total_emails || 0,
      icon: '📧',
      color: 'from-primary-400 to-primary-600',
      description: 'Emails processados'
    },
    {
      title: 'Taxa de Produtividade',
      value: `${(data.productivity_rate || 0).toFixed(1)}%`,
      icon: '📈',
      color: 'from-green-400 to-emerald-600',
      description: 'Emails produtivos'
    },
    {
      title: 'Confiança Média',
      value: `${(data.avg_confidence || 0).toFixed(1)}%`,
      icon: '🎯',
      color: 'from-purple-400 to-pink-600',
      description: 'Precisão da IA'
    },
    {
      title: 'Tempo de Processamento',
      value: `${(data.avg_processing_time || 0).toFixed(2)}s`,
      icon: '⚡',
      color: 'from-amber-400 to-orange-600',
      description: 'Média por email'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white dark:bg-dark-800 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-dark-700 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{metric.icon}</span>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${metric.color} opacity-20`}></div>
          </div>
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-2">{metric.title}</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}
