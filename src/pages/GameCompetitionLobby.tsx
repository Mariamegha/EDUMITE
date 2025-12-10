/**
 * PHASE 19: Game Competition Lobby
 * Multiplayer matchmaking, ready check, countdown
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayerAvatar } from '@/components/game/PlayerAvatar';
import { getGameById, MOCK_LOBBY, getTierColor, DifficultyTier } from '@/mocks/gameHub';
import { ArrowLeft, MessageSquare, Users, Clock, Play, CheckCircle2 } from 'lucide-react';

export default function GameCompetitionLobby() {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const difficulty = (searchParams.get('difficulty') || 'Gold') as DifficultyTier;
  
  const [lobby, setLobby] = useState(MOCK_LOBBY);
  const [isReady, setIsReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const game = getGameById(gameId || '');
  const tierColor = getTierColor(difficulty);

  // Mock matchmaking animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLobby({ ...MOCK_LOBBY, status: 'waiting' });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mock countdown when all ready
  useEffect(() => {
    const allReady = lobby.players.every(p => p.isReady);
    if (allReady && lobby.status === 'ready-check') {
      setCountdown(5);
    }
  }, [lobby]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate(`/game-hub/${gameId}/results`);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, gameId, navigate]);

  const handleReadyToggle = () => {
    setIsReady(!isReady);
    // Mock updating lobby
    setLobby({
      ...lobby,
      status: 'ready-check',
      players: lobby.players.map((p, i) => 
        i === 0 ? { ...p, isReady: !isReady } : p
      ),
    });
  };

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-obsidian/80 backdrop-blur-sm border-b-4 border-gold shadow-brutal sticky top-0 z-20"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/game-hub/${gameId}`)}
              className="border-4 border-gold text-gold hover:bg-gold hover:text-black"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-black text-gold uppercase tracking-tight">
                {game.title} — Lobby
              </h1>
              <p className="text-sm text-text/60 uppercase font-bold">
                {lobby.status === 'waiting' ? 'Waiting for Players' : 'Ready Check'}
              </p>
            </div>
          </div>

          {/* Lobby Info */}
          <div className="hidden md:flex items-center gap-4">
            <Badge className="border-2 border-black font-black" style={{ backgroundColor: tierColor, color: '#000' }}>
              {difficulty} Tier
            </Badge>
            <div className="flex items-center gap-2 text-text/60">
              <Users className="h-4 w-4" />
              <span className="font-bold">{lobby.players.length}/{lobby.maxPlayers}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Countdown Overlay */}
            <AnimatePresence>
              {countdown !== null && countdown > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    className="text-center"
                  >
                    <p className="text-gold text-2xl font-black uppercase mb-4">Game Starting In</p>
                    <motion.div
                      key={countdown}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-9xl font-black text-gold"
                    >
                      {countdown}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Player Grid */}
            <Card className="border-4 border-black bg-surface shadow-brutal p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gold uppercase">Players</h2>
                <Badge variant="outline" className="border-2 border-gold text-gold font-bold">
                  {lobby.players.length}/{lobby.maxPlayers}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Current Players */}
                {lobby.players.map((player, index) => (
                  <motion.div
                    key={player.userId}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center gap-2 p-4 bg-obsidian rounded border-2 border-text/20"
                  >
                    <PlayerAvatar player={player} size="lg" />
                    <p className="font-bold text-text text-center text-sm truncate w-full">
                      {player.username}
                    </p>
                    {player.isReady && (
                      <Badge className="bg-gold text-black border-2 border-black text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    )}
                  </motion.div>
                ))}

                {/* Empty Slots */}
                {Array.from({ length: lobby.maxPlayers - lobby.players.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-light rounded border-2 border-dashed border-text/20 opacity-50"
                  >
                    <div className="w-24 h-24 rounded-full bg-surface border-2 border-text/10 flex items-center justify-center">
                      <Users className="h-8 w-8 text-text/30" />
                    </div>
                    <p className="text-xs text-text/40 font-bold">Waiting...</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Ready Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleReadyToggle}
                className={`w-full h-16 text-xl font-black uppercase border-4 border-black shadow-brutal ${
                  isReady
                    ? 'bg-pink hover:bg-pink/90 text-black'
                    : 'bg-gold hover:bg-gold/90 text-black'
                }`}
              >
                {isReady ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 mr-2" />
                    Ready — Click to Cancel
                  </>
                ) : (
                  <>
                    <Play className="h-6 w-6 mr-2" />
                    Ready Up
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lobby Info */}
            <Card className="border-4 border-black bg-obsidian shadow-brutal p-4">
              <h3 className="text-xl font-black text-gold uppercase mb-4">Lobby Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text/60 text-sm">Map</span>
                  <span className="font-bold text-text">{lobby.mapName || 'Random'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60 text-sm">Difficulty</span>
                  <span className="font-bold" style={{ color: tierColor }}>{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/60 text-sm">Host</span>
                  <span className="font-bold text-gold">
                    {lobby.players.find(p => p.userId === lobby.hostId)?.username}
                  </span>
                </div>
              </div>
            </Card>

            {/* Chat Box */}
            <Card className="border-4 border-black bg-obsidian shadow-brutal p-4">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-4 border-blue">
                <MessageSquare className="h-6 w-6 text-blue" />
                <h3 className="text-xl font-black text-blue uppercase">Chat</h3>
              </div>
              
              <div className="h-64 bg-surface rounded p-3 space-y-2 overflow-y-auto">
                {/* Mock chat messages */}
                <div className="text-sm">
                  <span className="font-bold text-gold">MathWizard_42:</span>
                  <span className="text-text/70 ml-2">Let's do this!</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-pink">QuantumQueen:</span>
                  <span className="text-text/70 ml-2">Good luck everyone 🎯</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold text-blue">ChemGenius:</span>
                  <span className="text-text/70 ml-2">Ready when you are</span>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-surface border-2 border-text/20 rounded text-sm text-text focus:border-gold focus:outline-none"
                  disabled
                />
                <Button size="sm" disabled className="bg-gold text-black border-2 border-black">
                  Send
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
