'use client';

import { useState, useEffect } from 'react';
import { getDashboardOverview, getDashboardCategories, getDashboardSenders } from '@/services';
import DashboardOverview from './_components/DashboardOverview';
import DashboardChart from './_components/DashboardChart';
import { ErrorMessage, SkeletonDashboardOverview, SkeletonChart, SkeletonSendersList } from '@/components/shared';

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [categories, setCategories] = useState(null);
  const [senders, setSenders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(30);
  const [showPieChart, setShowPieChart] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [days]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewData, categoriesData, sendersData] = await Promise.all([
        getDashboardOverview(days),
        getDashboardCategories(days),
        getDashboardSenders(10, 1)
      ]);

      console.log('📊 Dashboard Data:');
      console.log('Overview:', overviewData);
      console.log('Categories:', categoriesData);
      console.log('Senders:', sendersData);

      // Extrai os dados corretos dos objetos de resposta
      setOverview(overviewData.overview || overviewData);
      setCategories(categoriesData.distribution || categoriesData);
      setSenders(sendersData);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erro ao carregar dados do dashboard. Verifique se a API está rodando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-10 w-48 bg-gray-200 dark:bg-dark-700 rounded-lg animate-shimmer mb-2"></div>
              <div className="h-4 w-64 bg-gray-200 dark:bg-dark-700 rounded animate-shimmer"></div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 w-20 bg-gray-200 dark:bg-dark-700 rounded-lg animate-shimmer"></div>
              ))}
            </div>
          </div>

          {}
          <SkeletonDashboardOverview />

          {}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonChart />
            <SkeletonSendersList />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 p-8">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage message={error} />
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Visão geral das análises de emails</p>
          </div>
          
          {}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                  days === d
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-200 dark:border-dark-600'
                }`}
              >
                {d} dias
              </button>
            ))}
          </div>
        </div>

        {}
        {overview && <DashboardOverview data={overview} />}

        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {}
          {categories && (
            <div className="bg-white dark:bg-dark-800 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-dark-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Distribuição de Categorias</h2>
                {}
                <button
                  onClick={() => setShowPieChart(!showPieChart)}
                  className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors text-xs sm:text-sm font-medium flex items-center gap-2 justify-center sm:justify-start"
                  title={showPieChart ? 'Mudar para gráfico de barras' : 'Mudar para gráfico de pizza'}
                >
                  {showPieChart ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span className="hidden xs:inline">Barras</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      <span className="hidden xs:inline">Pizza</span>
                    </>
                  )}
                </button>
              </div>
              <DashboardChart data={categories} type="categories" showPie={showPieChart} />
            </div>
          )}

          {}
          {senders && (
            <div className="bg-white dark:bg-dark-800 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-dark-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Top Remetentes</h2>
              <div className="space-y-2 sm:space-y-3">
                {(() => {
                  const allSenders = [
                    ...(senders.top_productive || []),
                    ...(senders.top_unproductive || [])
                  ].slice(0, 10);
                  
                  return allSenders.length > 0 ? (
                    allSenders.map((sender, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <span className="text-lg sm:text-2xl font-bold text-primary-500 flex-shrink-0">#{index + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium truncate">
                              {sender.sender_identifier || sender.sender || 'Desconhecido'}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {sender.productivity_rate !== undefined 
                                ? `${sender.productivity_rate.toFixed(1)}% produtivo` 
                                : (sender.category || 'N/A')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-2">
                          <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                            {sender.total_count || sender.count || 0}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">emails</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 text-center py-4">Nenhum remetente encontrado</p>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
