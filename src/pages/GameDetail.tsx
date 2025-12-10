/**
 * PHASE 19: Game Detail Page
 * Individual game page with practice/compete toggle
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DifficultySelector } from '@/components/game/DifficultySelector';
import { getGameById, getTierColor, DifficultyTier } from '@/mocks/gameHub';
import { ArrowLeft, Users, Clock, Trophy, Zap, Target, Gamepad2 } from 'lucide-react';

export default function GameDetail() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'practice' | 'competition'>('practice');
  const [difficulty, setDifficulty] = useState<DifficultyTier>('Gold');
  
  const game = getGameById(gameId || '');

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-black text-gold">Game not found</p>
          <Button onClick={() => navigate('/game-hub')} className="mt-4">
            Back to Hub
          </Button>
        </div>
      </div>
    );
  }

  const tierColor = getTierColor(game.tier);

  const handleStart = () => {
    if (mode === 'practice') {
      navigate(`/game-hub/${game.id}/practice?difficulty=${difficulty}`);
    } else {
      navigate(`/game-hub/${game.id}/lobby?difficulty=${difficulty}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-obsidian/80 backdrop-blur-sm border-b-4 border-gold shadow-brutal sticky top-0 z-20"
      >
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/game-hub')}
            className="border-4 border-gold text-gold hover:bg-gold hover:text-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-gold uppercase tracking-tight">
              {game.title}
            </h1>
            <p className="text-sm text-text/60 uppercase font-bold">
              {game.type} Game
            </p>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-80 rounded-lg overflow-hidden border-4 border-black shadow-brutal"
            >
              {/* Gradient Background */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${tierColor}40 0%, transparent 100%)`,
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="border-2 border-black font-black" style={{ backgroundColor: tierColor, color: '#000' }}>
                  {game.tier} Tier
                </Badge>
                {game.isVRCompatible && (
                  <Badge className="bg-blue border-2 border-black text-black font-black">
                    VR Compatible
                  </Badge>
                )}
                {game.featured && (
                  <Badge className="bg-gold border-2 border-black text-black font-black">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <p className="text-text/90 text-lg mb-4">{game.description}</p>
                <div className="flex gap-2">
                  {game.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-2 border-text/40 text-text/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Mode Toggle */}
            <Card className="border-4 border-black bg-surface shadow-brutal-sm p-6">
              <h2 className="text-xl font-black text-gold uppercase mb-4">Select Game Mode</h2>
              <Tabs value={mode} onValueChange={(value) => setMode(value as 'practice' | 'competition')}>
                <TabsList className="w-full bg-obsidian border-4 border-black h-auto">
                  <TabsTrigger 
                    value="practice" 
                    className="flex-1 py-4 data-[state=active]:bg-gold data-[state=active]:text-black font-black uppercase"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Practice Mode
                  </TabsTrigger>
                  <TabsTrigger 
                    value="competition" 
                    className="flex-1 py-4 data-[state=active]:bg-pink data-[state=active]:text-black font-black uppercase"
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Competition
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Mode Description */}
              <div className="mt-4 p-4 bg-obsidian border-2 border-text/20 rounded">
                {mode === 'practice' ? (
                  <>
                    <h3 className="font-bold text-gold mb-2">Practice Mode</h3>
                    <p className="text-sm text-text/70">
                      Play solo to improve your skills. Earn XP based on performance, but no leaderboard ranking.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-pink mb-2">Competition Mode</h3>
                    <p className="text-sm text-text/70">
                      Compete against real players. Earn bonus XP for rankings and climb the global leaderboard!
                    </p>
                  </>
                )}
              </div>
            </Card>

            {/* Difficulty Selector */}
            <Card className="border-4 border-black bg-surface shadow-brutal-sm p-6">
              <DifficultySelector
                selected={difficulty}
                onChange={setDifficulty}
              />
            </Card>

            {/* Start Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleStart}
                className="w-full h-16 text-xl font-black uppercase bg-gold hover:bg-gold/90 text-black border-4 border-black shadow-brutal"
              >
                <Gamepad2 className="h-6 w-6 mr-2" />
                Start {mode === 'practice' ? 'Practice' : 'Matchmaking'}
              </Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Game Stats */}
            <Card className="border-4 border-black bg-obsidian shadow-brutal p-4">
              <h3 className="text-xl font-black text-gold uppercase mb-4">Game Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface rounded">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue" />
                    <span className="text-sm font-bold text-text/80">Max Players</span>
                  </div>
                  <span className="text-lg font-black text-blue">{game.maxPlayers}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface rounded">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-pink" />
                    <span className="text-sm font-bold text-text/80">Avg Duration</span>
                  </div>
                  <span className="text-lg font-black text-pink">{game.avgDuration}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface rounded">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gold" />
                    <span className="text-sm font-bold text-text/80">XP Range</span>
                  </div>
                  <span className="text-lg font-black text-gold">{game.minXP}-{game.maxXP}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface rounded">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-text/60" />
                    <span className="text-sm font-bold text-text/80">Difficulty</span>
                  </div>
                  <span className="text-lg font-black text-text">{game.difficulty}/10</span>
                </div>
              </div>
            </Card>

            {/* XP Rewards */}
            <Card className="border-4 border-black bg-obsidian shadow-brutal p-4">
              <h3 className="text-xl font-black text-gold uppercase mb-4">XP Rewards</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Bronze Tier</span>
                  <span className="font-bold text-gold">{Math.round(game.minXP * 0.5)} XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Silver Tier</span>
                  <span className="font-bold text-gold">{Math.round(game.minXP * 0.75)} XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Gold Tier</span>
                  <span className="font-bold text-gold">{game.minXP} XP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text/60">Diamond Tier</span>
                  <span className="font-bold text-gold">{game.maxXP} XP</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-text/20">
                <p className="text-xs text-text/50">
                  Bonus XP awarded for: Speed (+20%), Accuracy (+30%), Win Streak (+50%)
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
