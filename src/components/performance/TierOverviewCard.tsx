import { motion } from 'framer-motion';
import { PerformanceTier, TierStatistics } from '@/mocks/performanceTiers';
import { TrendingUp, TrendingDown, Users, Award } from 'lucide-react';

interface TierOverviewCardProps {
  tier: PerformanceTier;
  statistics: TierStatistics | undefined;
  onClick?: () => void;
}

export default function TierOverviewCard({ tier, statistics, onClick }: TierOverviewCardProps) {
  if (!statistics) return null;
  
  const getTierLabel = (tier: PerformanceTier) => {
    return tier === 'BEST' ? 'Top Performers' : tier === 'MEDIUM' ? 'Average' : 'Needs Support';
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 relative overflow-hidden group"
    >
      {/* Accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2"
        style={{ backgroundColor: statistics.color }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"
        style={{
          background: `radial-gradient(circle at top right, ${statistics.color}, transparent)`
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-black uppercase" style={{ color: statistics.color }}>
              {statistics.tier}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{getTierLabel(statistics.tier)}</p>
          </div>
          <Award className="w-8 h-8 opacity-50" style={{ color: statistics.color }} />
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400 font-semibold">STUDENTS</span>
            </div>
            <div className="text-3xl font-black text-white">{statistics.totalStudents}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 font-semibold mb-1">AVG SCORE</div>
            <div className="text-3xl font-black text-white">{statistics.averageScore}%</div>
          </div>
        </div>

        {/* Movement Rates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-xs text-gray-400">Promoted</span>
            </div>
            <div className="text-lg font-bold text-green-400">{statistics.promotionRate}%</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center gap-1 mb-1">
              <TrendingDown className="w-3 h-3 text-red-400" />
              <span className="text-xs text-gray-400">Demoted</span>
            </div>
            <div className="text-lg font-bold text-red-400">{statistics.demotionRate}%</div>
          </div>
        </div>

        {/* Retention Rate */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-semibold">RETENTION RATE</span>
            <span className="text-sm font-bold text-white">{statistics.retentionRate}%</span>
          </div>
          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${statistics.retentionRate}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: statistics.color }}
            />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
