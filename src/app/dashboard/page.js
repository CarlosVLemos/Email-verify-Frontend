'use client';

import { useState, useEffect } from 'react';
import { getDashboardOverview, getDashboardCategories, getDashboardSenders } from '@/services/dashboardService';
import DashboardOverview from './_components/DashboardOverview';
import DashboardChart from './_components/DashboardChart';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorMessage from '@/components/shared/ErrorMessage';

export default function DashboardPage() {
  const [overview, setOverview] = useState(null);
  const [categories, setCategories] = useState(null);
  const [senders, setSenders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(30);

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

      setOverview(overviewData);
      setCategories(categoriesData);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage message={error} />
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">Visão geral das análises de emails</p>
          </div>
          
          {/* Filtro de período */}
          <div className="flex gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  days === d
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {d} dias
              </button>
            ))}
          </div>
        </div>

        {/* Overview Cards */}
        {overview && <DashboardOverview data={overview} />}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories Chart */}
          {categories && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Distribuição de Categorias</h2>
              <DashboardChart data={categories} type="categories" />
            </div>
          )}

          {/* Top Senders */}
          {senders && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Top Remetentes</h2>
              <div className="space-y-3">
                {senders.senders && senders.senders.length > 0 ? (
                  senders.senders.map((sender, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-indigo-400">#{index + 1}</span>
                        <div>
                          <p className="text-white font-medium">{sender.sender || 'Desconhecido'}</p>
                          <p className="text-sm text-gray-400">{sender.category || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{sender.count}</p>
                        <p className="text-sm text-gray-400">emails</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">Nenhum remetente encontrado</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
