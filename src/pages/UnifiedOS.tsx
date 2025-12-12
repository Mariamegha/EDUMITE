/**
 * Unified OS - Main Entry Page
 * 
 * Educational operating system launcher.
 * Shows existing spaces and allows creating new ones.
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUnifiedOSStore } from '@/store/unifiedOSStore';
import { useToast } from '@/hooks/use-toast';
import {
  Plus,
  Search,
  BookOpen,
  Clock,
  TrendingUp,
  Archive,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';
import type { Space } from '@/types/unifiedOS';

// Mock data for initial development
const MOCK_SPACES: Space[] = [
  {
    id: '1',
    user_id: 'user-1',
    name: 'Advanced Calculus',
    subject: 'Mathematics',
    learning_goal: 'Master integration and differentiation techniques',
    level: 'advanced',
    duration_weeks: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_accessed_at: new Date().toISOString(),
    progress_percentage: 67,
    is_archived: false,
  },
  {
    id: '2',
    user_id: 'user-1',
    name: 'Web Development Fundamentals',
    subject: 'Computer Science',
    learning_goal: 'Build modern web applications with React',
    level: 'intermediate',
    duration_weeks: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_accessed_at: new Date(Date.now() - 86400000).toISOString(),
    progress_percentage: 45,
    is_archived: false,
  },
];

export default function UnifiedOS() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const spaces = useUnifiedOSStore((state) => state.spaces);
  const setSpaces = useUnifiedOSStore((state) => state.setSpaces);
  const setActiveSpace = useUnifiedOSStore((state) => state.setActiveSpace);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  // Load spaces on mount
  useEffect(() => {
    // TODO: Load from Supabase
    setSpaces(MOCK_SPACES);
  }, [setSpaces]);

  const filteredSpaces = spaces
    .filter((space) => space.is_archived === showArchived)
    .filter((space) =>
      searchQuery
        ? space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          space.subject.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      const dateA = new Date(a.last_accessed_at || a.created_at).getTime();
      const dateB = new Date(b.last_accessed_at || b.created_at).getTime();
      return dateB - dateA;
    });

  const handleOpenSpace = (space: Space) => {
    setActiveSpace(space);
    navigate(`/unified-os/workspace/${space.id}`);
  };

  const handleCreateSpace = () => {
    navigate('/unified-os/create');
  };

  const getLevelColor = (level: Space['level']) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'intermediate':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    }
  };

  const getTimeAgo = (date: string) => {
    const now = Date.now();
    const then = new Date(date).getTime();
    const diff = now - then;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Unified OS</h1>
              <p className="text-sm text-gray-400 mt-1">
                Your personalized learning workspaces
              </p>
            </div>

            <Button
              onClick={handleCreateSpace}
              className="bg-gray-100 text-gray-900 hover:bg-gray-200"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Space
            </Button>
          </div>

          {/* Search & Filters */}
          <div className="mt-6 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-gray-800 focus:border-gray-700 text-gray-100"
              />
            </div>

            <Button
              variant={showArchived ? 'secondary' : 'ghost'}
              onClick={() => setShowArchived(!showArchived)}
              className="text-gray-400"
            >
              <Archive className="h-4 w-4 mr-2" />
              {showArchived ? 'Show Active' : 'Show Archived'}
            </Button>
          </div>
        </div>
      </div>

      {/* Spaces Grid */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="container mx-auto px-6 py-8">
          {filteredSpaces.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800/50 mb-6">
                <BookOpen className="h-10 w-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchQuery
                  ? 'No spaces found'
                  : showArchived
                  ? 'No archived spaces'
                  : 'No spaces yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? 'Try adjusting your search'
                  : 'Create your first learning space to get started'}
              </p>
              {!searchQuery && !showArchived && (
                <Button onClick={handleCreateSpace} className="bg-gray-100 text-gray-900 hover:bg-gray-200">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Space
                </Button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredSpaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="bg-[#141414] border-gray-800 hover:border-gray-700 transition-all cursor-pointer group overflow-hidden"
                      onClick={() => handleOpenSpace(space)}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-100 mb-1 group-hover:text-white transition-colors">
                              {space.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {space.subject}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              // TODO: Open menu
                            }}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Goal */}
                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                          {space.learning_goal}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className={getLevelColor(space.level)}
                          >
                            {space.level}
                          </Badge>

                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {space.duration_weeks} weeks
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-400 font-medium">
                              {space.progress_percentage}%
                            </span>
                          </div>
                          <Progress
                            value={space.progress_percentage}
                            className="h-1.5 bg-gray-800"
                          />
                        </div>

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {getTimeAgo(space.last_accessed_at || space.created_at)}
                          </div>

                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
