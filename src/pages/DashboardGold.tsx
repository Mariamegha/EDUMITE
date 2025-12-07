import { BentoGrid, BentoCard } from '@/components/BentoCards';
import { Brain, Target, Zap, Trophy, BookOpen, Users } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import FlowingMenu from '@/components/3D/FlowingMenu';
import GridScan from '@/components/3D/GridScan';

export default function DashboardGold() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  
  const menuItems = [
    {
      link: '/ai-bot',
      text: 'AI TUTOR',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
    },
    {
      link: '/roadmap',
      text: 'ROADMAP',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80',
    },
    {
      link: '/courses',
      text: 'COURSES',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    },
    {
      link: '/notes',
      text: 'NOTES',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    },
  ];

  return (
    <div className="relative min-h-screen bg-deepblack text-white py-12">
      {/* GridScan Background */}
      <div className="fixed inset-0 z-0">
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
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        {/* HEADER */}
        <div className="mb-12 border-b-4 border-gold pb-8">
          <h1 className="text-6xl font-black uppercase">
            <span className="text-gold">Welcome Back</span>
            {user && <span className="text-pink ml-4">{user.name}</span>}
          </h1>
          <p className="text-xl text-white/70 font-bold mt-4">YOUR COMMAND CENTER</p>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'XP', value: user?.xp || 0, icon: <Zap />, color: 'gold' },
            { label: 'LEVEL', value: user?.level || 1, icon: <Trophy />, color: 'pink' },
            { label: 'STREAK', value: user?.streak || 0, icon: <Target />, color: 'gold' },
            { label: 'COURSES', value: '12', icon: <BookOpen />, color: 'pink' },
          ].map((stat, i) => (
            <div
              key={i}
              className={`border-4 border-black bg-obsidian p-6 shadow-${stat.color}-heavy hover:shadow-${stat.color}-brutal transition-all`}
            >
              <div className={`text-${stat.color} mb-3`}>{stat.icon}</div>
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className={`text-sm font-bold text-${stat.color} uppercase mt-2`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FLOWING MENU HERO */}
        <div className="mb-12 border-4 border-black shadow-gold-brutal bg-obsidian overflow-hidden" style={{ height: '600px' }}>
          <FlowingMenu items={menuItems} />
        </div>

        {/* BENTO CARDS */}
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
          
          <div onClick={() => navigate('/focus')} className="cursor-pointer">
            <BentoCard
              label="FOCUS MODE"
              title="Pomodoro Timer"
              description="Stay focused with timed sessions"
              icon={<Zap className="w-8 h-8 text-pink" />}
            />
          </div>
        </BentoGrid>
      </div>
    </div>
  );
}
