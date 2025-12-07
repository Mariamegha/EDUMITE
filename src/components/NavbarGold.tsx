import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';
import { signOut } from '@/services/authService';
import GooeyNav from '@/components/GooeyNav';
import { useThemeStore } from '@/store/themeStore';
import StaggeredMenu from '@/components/StaggeredMenu';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function NavbarGold() {
  const location = useLocation();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = isAuthenticated
    ? [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'AI Bot', href: '/ai-bot' },
        { label: 'Roadmap', href: '/roadmap' },
        { label: 'Courses', href: '/courses' },
        { label: 'Community', href: '/community' },
        { label: 'Analytics', href: '/analytics' },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Features', href: '#features' },
        { label: 'About', href: '#about' },
      ];

  const currentIndex = navItems.findIndex(item => item.href === location.pathname);

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-black bg-deepblack shadow-brutal">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="text-3xl font-black uppercase tracking-tighter transform hover:scale-105 transition-transform">
            <span className="text-gold drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">Edu</span>
            <span className="text-pink drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">mite</span>
          </Link>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="border-2 border-gold text-gold hover:bg-gold hover:text-black shadow-gold-medium font-black"
                title="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            {isAuthenticated ? (
              <>
                {user && (
                  <div className="text-gold font-bold uppercase text-sm border-2 border-gold px-3 py-1 shadow-medium">
                    {user.name}
                  </div>
                )}
                <Button onClick={handleSignOut} variant="destructive" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Staggered Menu */}
      {isAuthenticated && (
        <StaggeredMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </nav>
  );
}
