import { BentoGrid, BentoCard } from '@/components/BentoCards';
import { Brain, Target, Zap, Trophy, BookOpen, Users, Calendar, Clock, TrendingUp, Award, LayoutGrid, Hand, Radar, Sparkles, Globe, Gamepad2, ArrowRight, Flame, HandMetal } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import GridScan from '@/components/3D/GridScan';
import { ThreeDFallback } from '@/components/3D/ThreeDFallback';
import { ExamCountdownWidget } from '@/components/ExamCountdownWidget';
import { MOCK_ANALYTICS, MOCK_ACTIVITY_LOG, MOCK_TASKS, USE_MOCK_DATA, MOCK_GAME_LEADERBOARD } from '@/mocks';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function DashboardGold() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const analytics = USE_MOCK_DATA ? MOCK_ANALYTICS : null;
  const recentActivity = USE_MOCK_DATA ? MOCK_ACTIVITY_LOG.slice(0, 5) : [];
  const upcomingTasks = USE_MOCK_DATA ? MOCK_TASKS.filter(t => t.status === 'pending').slice(0, 3) : [];
  const topPlayers = USE_MOCK_DATA ? MOCK_GAME_LEADERBOARD.slice(0, 3) : [];
  
  // Animated counter state
  const [xpDisplay, setXpDisplay] = useState(0);
  const [levelDisplay, setLevelDisplay] = useState(0);
  const [streakDisplay, setStreakDisplay] = useState(0);

  // Count up animation on mount
  useEffect(() => {
    const xpTarget = user?.xp || 0;
    const levelTarget = user?.level || 1;
    const streakTarget = user?.streak || 0;

    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setXpDisplay(Math.floor(xpTarget * progress));
      setLevelDisplay(Math.floor(levelTarget * progress));
      setStreakDisplay(Math.floor(streakTarget * progress));

      if (step >= steps) {
        setXpDisplay(xpTarget);
        setLevelDisplay(levelTarget);
        setStreakDisplay(streakTarget);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [user]);

  const quickActions = [
    { icon: <Brain className="w-6 h-6" />, label: 'AI Tutor', path: '/ai-bot', color: 'gold' },
    { icon: <HandMetal className="w-6 h-6" />, label: 'Sign Language', path: '/sign-language', color: 'pink' },
    { icon: <Target className="w-6 h-6" />, label: 'Roadmap', path: '/roadmap', color: 'gold' },
    { icon: <BookOpen className="w-6 h-6" />, label: 'Courses', path: '/courses', color: 'blue' },
    { icon: <Calendar className="w-6 h-6" />, label: 'Planner', path: '/study-planner', color: 'pink' },
  ];

  return (
    <div className="relative min-h-screen bg-deepblack text-white py-12">
      {/* GridScan Background */}
      <div className="fixed inset-0 z-0">
        <ThreeDFallback fallbackColor="from-gold/5 to-pink/5">
          <GridScan
            linesColor="#C9B458"
            scanColor="#C27BA0"
            scanOpacity={0.4}
            gridScale={0.12}
            lineThickness={1.0}
            bloomIntensity={0.2}
            scanGlow={0.4}
            scanDuration={2.5}
            scanDelay={1.5}
          />
        </ThreeDFallback>
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b-4 border-gold pb-8"
        >
          <h1 className="text-6xl font-black uppercase">
            <span className="text-gold">Welcome Back</span>
            {user && <span className="text-pink ml-4">{user.name}</span>}
          </h1>
          <p className="text-xl text-white/70 font-bold mt-4">YOUR COMMAND CENTER</p>
        </motion.div>

        {/* STATS ROW WITH ANIMATED COUNTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'XP', value: xpDisplay, icon: <Zap />, color: 'gold', max: 1000 },
            { label: 'LEVEL', value: levelDisplay, icon: <Trophy />, color: 'pink', max: 100 },
            { label: 'STREAK', value: streakDisplay, icon: <Flame />, color: 'gold', max: 30 },
            { label: 'COURSES', value: '12', icon: <BookOpen />, color: 'pink', max: null },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              className={`border-4 border-black bg-obsidian p-6 shadow-${stat.color}-heavy hover:shadow-${stat.color}-brutal transition-all cursor-pointer group`}
            >
              <div className={`text-${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-white tabular-nums">
                {stat.value}
              </div>
              <div className={`text-sm font-bold text-${stat.color} uppercase mt-2`}>{stat.label}</div>
              {stat.max && (
                <Progress 
                  value={(Number(stat.value) / stat.max) * 100} 
                  className="h-2 mt-3"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* EXAM COUNTDOWN WIDGET */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <ExamCountdownWidget />
        </motion.div>

        {/* QUICK ACTIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black uppercase text-gold mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8" />
            QUICK ACTIONS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                onClick={() => navigate(action.path)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  p-6 border-4 border-black bg-obsidian 
                  shadow-${action.color}-heavy hover:shadow-${action.color}-brutal
                  transition-all group flex flex-col items-center gap-3
                `}
              >
                <div className={`text-${action.color} group-hover:rotate-12 transition-transform`}>
                  {action.icon}
                </div>
                <span className={`font-black uppercase text-sm text-${action.color}`}>
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* LEADERBOARD PREVIEW */}
        {topPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card className="border-4 border-black shadow-pink-brutal bg-obsidian overflow-hidden">
              <CardHeader className="border-b-4 border-pink bg-gradient-to-r from-pink/20 to-gold/20">
                <CardTitle className="text-2xl font-black uppercase text-pink flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  TOP PLAYERS THIS WEEK
                  <button 
                    onClick={() => navigate('/game-hub')}
                    className="ml-auto text-sm font-bold text-gold hover:text-white transition-colors flex items-center gap-1"
                  >
                    VIEW ALL <ArrowRight className="w-4 h-4" />
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {topPlayers.map((player, index) => (
                    <motion.div
                      key={player.userId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 border-2 border-gold/30 rounded bg-black/30 hover:border-gold transition-colors"
                    >
                      <div className={`
                        w-10 h-10 flex items-center justify-center rounded-full font-black text-lg
                        ${index === 0 ? 'bg-yellow-500 text-black' : ''}
                        ${index === 1 ? 'bg-gray-400 text-black' : ''}
                        ${index === 2 ? 'bg-orange-600 text-black' : ''}
                        ${index > 2 ? 'bg-white/10 text-white' : ''}
                      `}>
                        {player.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">{player.username}</p>
                        <p className="text-xs text-white/60">{player.xp.toLocaleString()} XP</p>
                      </div>
                      <Badge className="bg-gold text-black font-black">
                        {player.winRate}% WIN
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* BENTO CARDS - ALL FEATURES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-3xl font-black uppercase text-pink mb-6 flex items-center gap-3">
            <LayoutGrid className="w-8 h-8" />
            ALL FEATURES
          </h2>
          <BentoGrid>
            <div onClick={() => navigate('/ai-bot')} className="cursor-pointer">
              <BentoCard
                label="AI BOT"
                title="Chat with AI Tutor"
                description="Get instant answers to any question"
                icon={<Brain className="w-8 h-8 text-gold" />}
              />
            </div>
            
            <div onClick={() => navigate('/roadmap')} className="cursor-pointer">
              <BentoCard
                label="ROADMAP"
                title="Your Learning Path"
                description="AI-generated roadmap to your goals"
                icon={<Target className="w-8 h-8 text-pink" />}
              />
            </div>
            
            <div onClick={() => navigate('/courses')} className="cursor-pointer">
              <BentoCard
                label="COURSES"
                title="Explore Courses"
                description="Browse 500+ AI-powered courses"
                icon={<BookOpen className="w-8 h-8 text-gold" />}
              />
            </div>
            
            <div onClick={() => navigate('/community')} className="cursor-pointer">
              <BentoCard
                label="COMMUNITY"
                title="Study Groups"
                description="Join discussions and study together"
                icon={<Users className="w-8 h-8 text-pink" />}
              />
            </div>
            
            <div onClick={() => navigate('/analytics')} className="cursor-pointer">
              <BentoCard
                label="ANALYTICS"
                title="Track Progress"
                description="See your learning stats and insights"
                icon={<Trophy className="w-8 h-8 text-gold" />}
              />
            </div>
            
            <div onClick={() => navigate('/workspace')} className="cursor-pointer">
              <BentoCard
                label="WORKSPACE"
                title="Learning Workspace"
                description="Multi-panel study environment"
                icon={<LayoutGrid className="w-8 h-8 text-pink" />}
              />
            </div>
            
            <div onClick={() => navigate('/focus-room')} className="cursor-pointer">
              <BentoCard
                label="FOCUS MODE"
                title="Pomodoro Timer"
                description="Stay focused with timed sessions"
                icon={<Zap className="w-8 h-8 text-gold" />}
              />
            </div>
            
            <div onClick={() => navigate('/sign-language')} className="cursor-pointer">
              <BentoCard
                label="ACCESSIBILITY"
                title="Sign Language"
                description="Learn & translate sign language with AI"
                icon={<Hand className="w-8 h-8 text-pink" />}
              />
            </div>
            
            <div onClick={() => navigate('/smart-deadline')} className="cursor-pointer">
              <BentoCard
                label="DEADLINE RADAR"
                title="Smart Deadline Radar"
                description="AI-powered deadline tracking & pacing"
                icon={<Radar className="w-8 h-8 text-gold" />}
              />
            </div>

            <div onClick={() => navigate('/adaptive-content')} className="cursor-pointer">
              <BentoCard
                label="CONTENT GENERATOR"
                title="Adaptive Content"
                description="Transform topics into reels, memes & more"
                icon={<Sparkles className="w-8 h-8 text-pink" />}
              />
            </div>

            <div onClick={() => navigate('/knowledge-orbit')} className="cursor-pointer">
              <BentoCard
                label="GALAXY GRAPH"
                title="Knowledge Orbit"
                description="Explore your learning universe in 3D"
                icon={<Globe className="w-8 h-8 text-blue" />}
              />
            </div>

            <div onClick={() => navigate('/game-hub')} className="cursor-pointer">
              <BentoCard
                label="VR GAMES"
                title="Game Hub + XP Arena"
                description="Compete in VR challenges & earn rewards"
                icon={<Gamepad2 className="w-8 h-8 text-pink" />}
              />
            </div>
          </BentoGrid>
        </motion.div>

        {/* ACTIVITY & TASKS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {/* RECENT ACTIVITY */}
          <Card className="border-4 border-black shadow-pink-brutal bg-obsidian">
            <CardHeader className="border-b-4 border-pink">
              <CardTitle className="text-2xl font-black uppercase text-pink flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                RECENT ACTIVITY
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 border-2 border-gold/30 rounded bg-black/30"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{activity.title}</p>
                      <p className="text-xs text-white/60 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* UPCOMING TASKS */}
          <Card className="border-4 border-black shadow-gold-brutal bg-obsidian">
            <CardHeader className="border-b-4 border-gold">
              <CardTitle className="text-2xl font-black uppercase text-gold flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                UPCOMING TASKS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {upcomingTasks.length > 0 ? (
                  upcomingTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 border-2 border-pink/30 rounded bg-black/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-bold text-white">{task.name}</p>
                        <Badge className={`
                          ${task.priority === 'high' ? 'bg-red-500' : ''}
                          ${task.priority === 'medium' ? 'bg-yellow-500' : ''}
                          ${task.priority === 'low' ? 'bg-green-500' : ''}
                          text-black font-black text-xs
                        `}>
                          {task.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Clock className="h-3 w-3" />
                        <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{task.estimatedHours}h estimated</span>
                      </div>
                      <Progress value={0} className="mt-2 h-2" />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-white/60 font-bold py-8">No upcoming tasks</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* STUDY GOALS */}
        {analytics && analytics.goals && (
          <Card className="border-4 border-black shadow-brutal bg-obsidian mt-6">
            <CardHeader className="border-b-4 border-blue">
              <CardTitle className="text-2xl font-black uppercase text-blue flex items-center gap-2">
                <Award className="h-6 w-6" />
                YOUR GOALS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analytics.goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                    className="p-4 border-2 border-gold rounded bg-black/30"
                  >
                    <h4 className="text-lg font-black text-gold mb-3">{goal.title}</h4>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-black text-white">{goal.current}</span>
                      <span className="text-xl text-white/60">/ {goal.target} {goal.unit}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-3 mb-2" />
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Clock className="h-3 w-3" />
                      <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

