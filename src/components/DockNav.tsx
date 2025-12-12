import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Home, 
  Bot, 
  Map, 
  BookOpen, 
  StickyNote, 
  Focus, 
  Calendar, 
  Glasses, 
  Users, 
  BarChart3,
  Settings,
  LayoutGrid,
  Trophy,
  Target,
  Heart,
  Award,
  Gamepad2,
  Hand,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';
import './DockNav.css';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const dockItems: DockItem[] = [
  { icon: <Home size={24} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Sparkles size={24} />, label: 'Unified OS', href: '/unified-os' },
  { icon: <Bot size={24} />, label: 'AI Bot', href: '/ai-bot' },
  { icon: <Map size={24} />, label: 'Roadmap', href: '/roadmap' },
  { icon: <BookOpen size={24} />, label: 'Courses', href: '/courses' },
  { icon: <LayoutGrid size={24} />, label: 'Workspace', href: '/workspace' },
  { icon: <StickyNote size={24} />, label: 'Notes', href: '/notes' },
  { icon: <Focus size={24} />, label: 'Focus Room', href: '/focus-room' },
  { icon: <Calendar size={24} />, label: 'Study Planner', href: '/study-planner' },
  { icon: <Trophy size={24} />, label: 'Performance', href: '/performance-tiers' },
  { icon: <Target size={24} />, label: 'Opportunities', href: '/smart-opportunities' },
  { icon: <Heart size={24} />, label: 'Wellness', href: '/wellness' },
  { icon: <Award size={24} />, label: 'Schemes', href: '/schemes' },
  { icon: <Hand size={24} />, label: 'Sign Language', href: '/sign-language' },
  { icon: <Gamepad2 size={24} />, label: 'Game Center', href: '/game' },
  { icon: <Glasses size={24} />, label: 'Study VR', href: '/study-vr' },
  { icon: <Users size={24} />, label: 'Community', href: '/community' },
  { icon: <BarChart3 size={24} />, label: 'Analytics', href: '/analytics' },
  { icon: <Settings size={24} />, label: 'Settings', href: '/settings' },
];

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: any }) {
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const isActive = location.pathname === item.href;

  return (
    <motion.button
      ref={ref}
      style={{ width, height: width }}
      className={`dock-item ${isActive ? 'dock-item-active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(item.href)}
    >
      <div className="dock-icon" style={{ color: isActive ? '#FFD700' : '#FF1493' }}>
        {item.icon}
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="dock-label"
        >
          {item.label}
        </motion.div>
      )}
    </motion.button>
  );
}

export default function DockNav() {
  const mouseX = useMotionValue(Infinity);
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  };

  const toggleDock = () => {
    setIsVisible(!isVisible);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsVisible(true);
    }
  };

  return (
    <>
      {/* Floating toggle button - always visible at bottom center */}
      <motion.button
        onClick={toggleDock}
        className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-[101] w-12 h-12 rounded-full bg-gradient-to-br from-gold to-pink border-2 border-black flex items-center justify-center shadow-[0_0_20px_rgba(201,180,88,0.5)] hover:shadow-[0_0_30px_rgba(201,180,88,0.8)] transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: isVisible ? -88 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        title="Toggle Dock"
      >
        <motion.div
          animate={{ rotate: isVisible ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-black font-bold text-xl"
        >
          ▲
        </motion.div>
      </motion.button>
      
      <motion.div 
        className="dock-outer"
        initial={{ y: 100 }}
        animate={{ y: isVisible || isPinned ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="dock-panel relative"
        >
          {/* Lock button on dock */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              togglePin();
            }}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-pink border-2 border-black flex items-center justify-center shadow-brutal-sm hover:scale-110 active:scale-95 transition-transform z-10"
            whileHover={{ rotate: isPinned ? 0 : 15 }}
            whileTap={{ scale: 0.9 }}
            title={isPinned ? 'Unlock to allow hiding' : 'Lock to keep visible'}
          >
            {isPinned ? (
              <Lock size={14} className="text-black" />
            ) : (
              <Unlock size={14} className="text-black" />
            )}
          </motion.button>

          {dockItems.map((item) => (
            <DockIcon key={item.href} item={item} mouseX={mouseX} />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
