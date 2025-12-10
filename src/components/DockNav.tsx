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
  Gamepad2
} from 'lucide-react';
import './DockNav.css';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const dockItems: DockItem[] = [
  { icon: <Home size={24} />, label: 'Dashboard', href: '/dashboard' },
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

  return (
    <div className="dock-outer">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="dock-panel"
      >
        {dockItems.map((item) => (
          <DockIcon key={item.href} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}
