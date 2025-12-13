import { Brain, Target, Zap, Trophy, BookOpen, Users, Calendar, Clock, TrendingUp, Award, LayoutGrid, Hand, Radar, Sparkles, Globe, Gamepad2, ArrowRight, Flame, HandMetal, Plus, X, Code, FileText, Heart, Smile, DollarSign, GraduationCap, CheckCircle, AlertCircle, Briefcase, Split } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import GridScan from '@/components/3D/GridScan';
import { ThreeDFallback } from '@/components/3D/ThreeDFallback';
import { ExamCountdownWidget } from '@/components/ExamCountdownWidget';
import { MOCK_ANALYTICS, MOCK_ACTIVITY_LOG, MOCK_TASKS, USE_MOCK_DATA, MOCK_GAME_LEADERBOARD } from '@/mocks';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TranslatedText } from '@/components/TranslatedText';

type Workspace = {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'ml' | 'datascience' | 'cybersecurity' | 'custom';
  isActive: boolean;
  tools: string[];
};

const ROADMAP_OPTIONS = [
  { id: 'frontend', name: 'Frontend Development', icon: <Code />, color: 'gold' },
  { id: 'backend', name: 'Backend Development', icon: <Globe />, color: 'pink' },
  { id: 'ml', name: 'Machine Learning', icon: <Brain />, color: 'blue' },
  { id: 'datascience', name: 'Data Science', icon: <TrendingUp />, color: 'gold' },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: <Award />, color: 'pink' },
  { id: 'classroom', name: 'School Worklist', icon: <GraduationCap />, color: 'purple', special: true },
];

const INSTITUTION_TASKS = [
  { id: 1, title: 'Physics Assignment - Chapter 5', type: 'assignment', deadline: '2025-12-15', priority: 'high', institution: 'School' },
  { id: 2, title: 'Mathematics Final Exam', type: 'exam', deadline: '2025-12-20', priority: 'high', institution: 'School' },
  { id: 3, title: 'History Research Project', type: 'project', deadline: '2025-12-18', priority: 'medium', institution: 'College' },
  { id: 4, title: 'Chemistry Lab Report', type: 'assignment', deadline: '2025-12-14', priority: 'high', institution: 'School' },
];

const SCHOLARSHIPS = [
  { id: 1, name: 'Merit-Based Scholarship', amount: '$5,000', deadline: '2025-01-15', eligible: true },
  { id: 2, name: 'STEM Excellence Grant', amount: '$10,000', deadline: '2025-02-01', eligible: true },
  { id: 3, name: 'Community Service Award', amount: '$3,000', deadline: '2025-01-20', eligible: false },
];

export default function DashboardGold() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<string | null>(null);
  const [showAddWorkspace, setShowAddWorkspace] = useState(false);
  const [moodScore, setMoodScore] = useState(7);
  const [selectedMood, setSelectedMood] = useState<string>('');

  const addWorkspace = (type: string) => {
    // Navigate to workspace route with selected type
    if (type === 'classroom') {
      navigate('/classroom-workspace');
    } else {
      navigate(`/workspace/${type}`);
    }
    setShowAddWorkspace(false);
  };

  const removeWorkspace = (id: string) => {
    setWorkspaces(workspaces.filter(w => w.id !== id));
    if (activeWorkspace === id) {
      setActiveWorkspace(workspaces[0]?.id || null);
    }
  };

  return (
    <div className="relative min-h-screen bg-deepblack text-white">
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
      
      <div className="relative z-10">
        {/* HEADER */}
        <div className="border-b-4 border-gold bg-obsidian/90 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black uppercase">
                  <span className="text-gold">EDUMITE</span>
                  {user && <span className="text-pink ml-3">{user.name}</span>}
                </h1>
                <p className="text-sm text-white/70 font-bold mt-1">Modern Learning Command Center</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gold/20 border-2 border-gold rounded-lg">
                  <Zap className="w-4 h-4 text-gold" />
                  <span className="font-black text-gold">{user?.xp || 0} XP</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-pink/20 border-2 border-pink rounded-lg">
                  <Trophy className="w-4 h-4 text-pink" />
                  <span className="font-black text-pink">Level {user?.level || 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8 space-y-8">

        {/* 1. WORKSPACES SECTION - Full Width YouTube-Style */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black uppercase text-gold flex items-center gap-3">
              <LayoutGrid className="w-8 h-8" />
              <TranslatedText text="Workspaces" />
            </h2>
            <Badge className="bg-gold/20 text-gold border-2 border-gold font-black px-4 py-2">
              PRIMARY FEATURE
            </Badge>
          </div>

          {/* Workspace Tabs (Browser-style) */}
          <div className="flex items-center gap-2 bg-obsidian border-4 border-black shadow-gold-brutal p-2 overflow-x-auto">
            {workspaces.map((workspace) => (
              <motion.div
                key={workspace.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg font-bold cursor-pointer transition-all ${
                  activeWorkspace === workspace.id
                    ? 'bg-gold text-black border-gold'
                    : 'bg-darknavy text-white border-gray-700 hover:border-gold'
                }`}
                onClick={() => setActiveWorkspace(workspace.id)}
              >
                <span className="text-sm">{workspace.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeWorkspace(workspace.id);
                  }}
                  className="hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
            
            {/* Add Workspace Button */}
            <Button
              onClick={() => setShowAddWorkspace(!showAddWorkspace)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-black border-2 border-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Workspace
            </Button>
          </div>

          {/* Add Workspace Modal */}
          {showAddWorkspace && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-obsidian border-4 border-purple-500 shadow-[8px_8px_0px_0px_rgba(138,43,226,1)] p-6"
            >
              <h3 className="text-xl font-black text-purple-400 mb-4 uppercase">
                <TranslatedText text="Choose a Roadmap" />
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                {ROADMAP_OPTIONS.map((roadmap) => (
                  <motion.button
                    key={roadmap.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addWorkspace(roadmap.id)}
                    className={`p-4 border-4 border-black ${
                      roadmap.id === 'classroom'
                        ? 'bg-gradient-to-r from-[#C9B458]/30 to-[#C27BA0]/30 hover:from-[#C9B458]/40 hover:to-[#C27BA0]/40 col-span-2 md:col-span-1'
                        : `bg-${roadmap.color}/20 hover:bg-${roadmap.color}/30`
                    } shadow-${roadmap.color}-heavy transition-all relative overflow-hidden`}
                  >
                    {roadmap.id === 'classroom' && (
                      <div className="absolute top-1 right-1">
                        <Badge className="bg-purple-500 text-white text-xs border-2 border-black">
                          <TranslatedText text="NEW" />
                        </Badge>
                      </div>
                    )}
                    <div className={`${roadmap.id === 'classroom' ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#C9B458] to-[#C27BA0]' : `text-${roadmap.color}`} mb-2 flex justify-center`}>
                      {roadmap.icon}
                    </div>
                    <span className={`text-sm font-black ${roadmap.id === 'classroom' ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#C9B458] to-[#C27BA0]' : `text-${roadmap.color}`} uppercase`}>
                      {roadmap.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Active Workspace Content */}
          {activeWorkspace && (
            <Card className="border-4 border-black shadow-brutal bg-obsidian">
              <CardHeader className="border-b-4 border-gold">
                <CardTitle className="text-2xl font-black text-gold flex items-center gap-2">
                  <Split className="w-6 h-6" />
                  {workspaces.find(w => w.id === activeWorkspace)?.name}
                </CardTitle>
                <CardDescription className="text-white/70 font-bold">
                  Multi-panel learning environment with AI Tutor, IDE, Docs, Notes & more
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'AI Tutor', icon: <Brain />, path: '/ai-bot' },
                    { name: 'Code Editor', icon: <Code />, path: '/workspace' },
                    { name: 'Documentation', icon: <FileText />, path: '/courses' },
                    { name: 'Notes', icon: <BookOpen />, path: '/notes' },
                  ].map((tool) => (
                    <Button
                      key={tool.name}
                      onClick={() => navigate(tool.path)}
                      className="bg-darknavy hover:bg-gold hover:text-black text-white font-black border-2 border-gold py-6"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {tool.icon}
                        <span className="text-xs">{tool.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.section>

        {/* 2. INSTITUTION WORKLIST */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-black uppercase text-pink flex items-center gap-3">
            <GraduationCap className="w-7 h-7" />
            <TranslatedText text="Institution Worklist" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSTITUTION_TASKS.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className={`border-4 border-black bg-obsidian hover:shadow-pink-brutal transition-all cursor-pointer ${
                  task.priority === 'high' ? 'shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]' : 'shadow-pink-heavy'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge className={`${
                        task.type === 'exam' ? 'bg-red-500' :
                        task.type === 'assignment' ? 'bg-blue-500' :
                        'bg-green-500'
                      } text-white font-black text-xs`}>
                        {task.type.toUpperCase()}
                      </Badge>
                      <Badge className="bg-gray-700 text-white font-bold text-xs">
                        {task.institution}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-black text-white mt-2">
                      {task.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Clock className="w-3 h-3" />
                      <span className="font-bold">Due: {task.deadline}</span>
                    </div>
                    <Button
                      onClick={() => {
                        // Navigate to workspace with this task added
                        navigate('/workspace/frontend', { state: { addTask: task } });
                      }}
                      className="w-full bg-gold hover:bg-gold/90 text-black font-black border-2 border-black text-xs py-2"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add to Workspace
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 3. MENTAL WELLNESS CHECK */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-black uppercase text-blue flex items-center gap-3">
            <Heart className="w-7 h-7" />
            <TranslatedText text="Mental Wellness Check" />
          </h2>
          
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] bg-gradient-to-br from-blue/10 to-obsidian">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mood Tracker */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-blue uppercase flex items-center gap-2">
                    <Smile className="w-5 h-5" />
                    Daily Emotion
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {['😢', '😟', '😐', '🙂', '😊'].map((emoji, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedMood(emoji)}
                        className={`text-3xl p-3 rounded-lg border-2 transition-all ${
                          selectedMood === emoji
                            ? 'border-blue bg-blue/20 scale-110'
                            : 'border-gray-700 bg-darknavy hover:border-blue'
                        }`}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="text-sm font-bold text-white/70 mb-2 block">
                      Stress Level: {moodScore}/10
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={moodScore}
                      onChange={(e) => setMoodScore(Number(e.target.value))}
                      className="w-full accent-blue"
                    />
                  </div>
                </div>

                {/* Burnout Indicator */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-pink uppercase">Burnout Check</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Physical Energy', value: 75 },
                      { label: 'Mental Focus', value: 60 },
                      { label: 'Motivation', value: 80 },
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex justify-between text-xs font-bold text-white/70 mb-1">
                          <span>{metric.label}</span>
                          <span>{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <Badge className={`w-full py-2 text-center font-black ${
                    moodScore >= 7 ? 'bg-green-500' :
                    moodScore >= 4 ? 'bg-yellow-500' :
                    'bg-red-500'
                  } text-black`}>
                    {moodScore >= 7 ? '✓ Healthy Range' :
                     moodScore >= 4 ? '⚠ Monitor Closely' :
                     '🚨 Needs Attention'}
                  </Badge>
                </div>

                {/* Compassion Assistant */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gold uppercase">AI Companion</h3>
                  <div className="bg-darknavy border-2 border-blue/50 rounded-lg p-4 space-y-3">
                    <p className="text-sm text-white/90 font-bold">
                      "Remember to take breaks! You've been studying for 2 hours straight. A 10-minute walk can boost your productivity by 30%."
                    </p>
                    <Button
                      onClick={() => navigate('/wellness')}
                      className="w-full bg-blue hover:bg-blue/90 text-white font-black border-2 border-black text-xs"
                    >
                      Talk to Wellness AI
                    </Button>
                  </div>
                  <div className="text-xs text-white/60 font-bold space-y-1">
                    <p>💪 7-day streak logged</p>
                    <p>🎯 3 goals completed this week</p>
                    <p>🌟 Well-being score: 82/100</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* 4. ADDITIONAL ASSISTANCE */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 pb-12"
        >
          <h2 className="text-2xl font-black uppercase text-gold flex items-center gap-3">
            <Sparkles className="w-7 h-7" />
            <TranslatedText text="Additional Assistance" />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Roadmaps */}
            <Card className="border-4 border-black shadow-gold-brutal bg-obsidian">
              <CardHeader className="border-b-4 border-gold">
                <CardTitle className="text-xl font-black text-gold flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Available Roadmaps
                </CardTitle>
                <CardDescription className="text-white/70 font-bold">
                  Academic & skill development pathways
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {ROADMAP_OPTIONS.map((roadmap) => (
                    <motion.div
                      key={roadmap.id}
                      whileHover={{ x: 8 }}
                      className="flex items-center justify-between p-4 border-2 border-gray-700 hover:border-gold rounded-lg bg-darknavy transition-all cursor-pointer"
                      onClick={() => navigate('/roadmap')}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-${roadmap.color}`}>
                          {roadmap.icon}
                        </div>
                        <span className="font-bold text-white">{roadmap.name}</span>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addWorkspace(roadmap.id);
                        }}
                        className="bg-gold/20 hover:bg-gold text-gold hover:text-black font-black border-2 border-gold text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card className="border-4 border-black shadow-pink-brutal bg-obsidian">
              <CardHeader className="border-b-4 border-pink">
                <CardTitle className="text-xl font-black text-pink flex items-center gap-2">
                  <DollarSign className="w-6 h-6" />
                  Scholarships
                </CardTitle>
                <CardDescription className="text-white/70 font-bold">
                  Funding opportunities for your education
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {SCHOLARSHIPS.map((scholarship) => (
                    <motion.div
                      key={scholarship.id}
                      whileHover={{ x: 8 }}
                      className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                        scholarship.eligible
                          ? 'border-green-500 bg-green-500/10 hover:border-green-400'
                          : 'border-gray-700 bg-darknavy hover:border-gray-600'
                      }`}
                      onClick={() => navigate('/schemes')}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-black text-white">{scholarship.name}</h4>
                            {scholarship.eligible && (
                              <Badge className="bg-green-500 text-black font-black text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Eligible
                              </Badge>
                            )}
                          </div>
                          <p className="text-2xl font-black text-gold">{scholarship.amount}</p>
                          <p className="text-xs text-white/60 font-bold mt-1">
                            Deadline: {scholarship.deadline}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/50" />
                      </div>
                    </motion.div>
                  ))}
                  <Button
                    onClick={() => navigate('/schemes')}
                    className="w-full bg-pink hover:bg-pink/90 text-white font-black border-2 border-black mt-4"
                  >
                    View All Scholarships
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        </div>
      </div>
    </div>
  );
}

