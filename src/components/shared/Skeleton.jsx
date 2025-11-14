/**
 * Componentes de Skeleton Loading
 * Melhora UX mostrando estrutura enquanto carrega
 */

/**
 * Skeleton base - elemento único
 */
export const Skeleton = ({ className = '', variant = 'rectangular', width, height }) => {
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded'
  };

  const baseClass = 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-dark-700 dark:via-dark-600 dark:to-dark-700';
  
  const style = {
    width: width || '100%',
    height: height || '100%'
  };

  return (
    <div 
      className={`${baseClass} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

/**
 * Skeleton para cards de resultado
 */
export const SkeletonResultCard = () => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-dark-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-6 w-32" variant="rectangular" />
        </div>
        <Skeleton variant="circular" width="60px" height="60px" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-50 dark:bg-dark-900 rounded-xl p-4">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>

      {/* Content sections */}
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
};

/**
 * Skeleton para overview do dashboard
 */
export const SkeletonDashboardOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className="bg-white dark:bg-dark-800 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-4">
            <Skeleton variant="circular" width="48px" height="48px" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-32" />
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton para gráfico de chart
 */
export const SkeletonChart = () => {
  return (
    <div className="bg-white dark:bg-dark-800 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-dark-700">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton para lista de top senders
 */
export const SkeletonSendersList = () => {
  return (
    <div className="bg-white dark:bg-dark-800 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-dark-700">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
          >
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="h-8 w-8" variant="rectangular" />
              <div className="flex-1">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="text-right">
              <Skeleton className="h-6 w-12 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton para texto (linhas de loading)
 */
export const SkeletonText = ({ lines = 3 }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-4" 
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton para tabela
 */
export const SkeletonTable = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid gap-4 p-4 border-b border-gray-200 dark:border-dark-700" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-5" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div 
          key={rowIndex}
          className="grid gap-4 p-4 border-b border-gray-200 dark:border-dark-700"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
