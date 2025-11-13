export default function DashboardOverview({ data }) {
  const metrics = [
    {
      title: 'Total de Emails',
      value: data.total_emails || 0,
      icon: '📧',
      color: 'from-blue-500 to-cyan-500',
      description: 'Emails processados'
    },
    {
      title: 'Taxa de Produtividade',
      value: `${(data.productivity_rate || 0).toFixed(1)}%`,
      icon: '📈',
      color: 'from-green-500 to-emerald-500',
      description: 'Emails produtivos'
    },
    {
      title: 'Confiança Média',
      value: `${(data.avg_confidence || 0).toFixed(1)}%`,
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      description: 'Precisão da IA'
    },
    {
      title: 'Tempo de Processamento',
      value: `${(data.avg_processing_time || 0).toFixed(2)}s`,
      icon: '⚡',
      color: 'from-orange-500 to-red-500',
      description: 'Média por email'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{metric.icon}</span>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${metric.color} opacity-20`}></div>
          </div>
          <h3 className="text-gray-300 text-sm font-medium mb-2">{metric.title}</h3>
          <p className="text-3xl font-bold text-white mb-1">{metric.value}</p>
          <p className="text-gray-400 text-xs">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}
