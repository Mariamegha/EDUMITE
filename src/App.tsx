import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TranslationProvider } from "@/components/TranslationProvider";
import { Navbar } from "@/components/Navbar";
import NavbarGold from "@/components/NavbarGold";
import DockNav from "@/components/DockNav";
import { useUserStore } from "@/store/userStore";
import { initializeAuth } from "@/services/authService";
import { supabase } from "@/lib/supabase";

import Landing from "./pages/Landing";
import LandingGold from "./pages/LandingGold";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardGold from "./pages/DashboardGold";
import AIBot from "./pages/AIBot";
import Roadmap from "./pages/Roadmap";
import Notes from "./pages/Notes";
import FocusRoom from "./pages/FocusRoom";
import StudyVR from "./pages/StudyVR";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import StudyPlanner from "./pages/StudyPlanner";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AuthListener() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize auth state on app load
    initializeAuth();

    // Handle OAuth callback explicitly
    const handleOAuthCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      
      if (accessToken) {
        // Give Supabase time to process the callback
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // Trigger auth initialization
          await initializeAuth();
        }
      }
    };

    handleOAuthCallback();

    // Listen for auth state changes (OAuth callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      
      if (event === 'SIGNED_IN' && session) {
        const userName = session.user.user_metadata?.name || 
                         session.user.user_metadata?.full_name || 
                         session.user.email?.split('@')[0] || 
                         'User';

        // Immediately update store and redirect - don't wait for profile
        const userStoreData = {
          name: userName,
          email: session.user.email!,
          xp: 0,
          level: 1,
          streak: 0,
        };
        
        useUserStore.getState().login(session.user.email!, userName);
        useUserStore.setState({
          isAuthenticated: true,
          user: userStoreData,
        });
        
        // Navigate immediately
        navigate('/dashboard', { replace: true });

        // Fetch/create profile in background (don't block redirect)
        setTimeout(async () => {
          try {
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              useUserStore.setState({
                user: {
                  name: profile.name,
                  email: profile.email,
                  xp: profile.xp,
                  level: profile.level,
                  streak: profile.streak,
                },
              });
            } else if (profileError?.code === 'PGRST116') {
              await supabase
                .from('users')
                .insert({
                  id: session.user.id,
                  email: session.user.email!,
                  name: userName,
                  xp: 0,
                  level: 1,
                  streak: 0,
                });
            }
          } catch (error) {
            // Silent fail - user is already authenticated
          }
        }, 100);
      } else if (event === 'SIGNED_OUT') {
        useUserStore.getState().logout();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return null;
}

function ConditionalLayout() {
  const location = useLocation();
  const hideNavbar = ['/', '/login', '/register'].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col bg-deepblack">
      {!hideNavbar && <NavbarGold />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingGold />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardGold />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ai-bot"
                    element={
                      <ProtectedRoute>
                        <AIBot />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/roadmap"
                    element={
                      <ProtectedRoute>
                        <Roadmap />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes"
                    element={
                      <ProtectedRoute>
                        <Notes />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/focus-room"
                    element={
                      <ProtectedRoute>
                        <FocusRoom />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/study-vr"
                    element={
                      <ProtectedRoute>
                        <StudyVR />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/courses"
                    element={
                      <ProtectedRoute>
                        <Courses />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/courses/:courseId"
                    element={
                      <ProtectedRoute>
                        <CourseDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/study-planner"
                    element={
                      <ProtectedRoute>
                        <StudyPlanner />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            {!hideNavbar && <DockNav />}
          </div>
  );
}

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TranslationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthListener />
              <ConditionalLayout />
            </BrowserRouter>
          </TooltipProvider>
        </TranslationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
