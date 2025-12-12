/**
 * Workspace Layout - Main OS Environment
 * 
 * Full-screen learning workspace with helper sidebar.
 * Provides OS-like experience with focus mode and keyboard shortcuts.
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUnifiedOSStore } from '@/store/unifiedOSStore';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  X,
} from 'lucide-react';
import type { HelperType, Helper } from '@/types/unifiedOS';

// Helper components (placeholders for now)
import ChatGPTHelper from '@/components/workspace/ChatGPTHelper';
import YouTubeHelper from '@/components/workspace/YouTubeHelper';
import NotebookLLMHelper from '@/components/workspace/NotebookLLMHelper';
import ClassroomHelper from '@/components/workspace/ClassroomHelper';
import InstructorHelper from '@/components/workspace/InstructorHelper';
import NotesHelper from '@/components/workspace/NotesHelper';

const HELPER_ICONS: Record<HelperType, string> = {
  chatgpt: '💬',
  youtube: '📹',
  notebookllm: '📊',
  classroom: '📚',
  instructor: '👨‍🏫',
  notes: '📝',
};

const HELPER_NAMES: Record<HelperType, string> = {
  chatgpt: 'ChatGPT',
  youtube: 'YouTube',
  notebookllm: 'NotebookLLM',
  classroom: 'Classroom',
  instructor: 'Instructor',
  notes: 'Notes',
};

const HELPER_DESCRIPTIONS: Record<HelperType, string> = {
  chatgpt: 'AI assistant for problem-solving and explanations',
  youtube: 'Curated educational videos for your subject',
  notebookllm: 'Generate slides and presentations from notes',
  classroom: 'Structured lessons with examples and assignments',
  instructor: 'Personal AI mentor for strategic guidance',
  notes: 'Organize files, PDFs, and study materials',
};

export default function WorkspaceLayout() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const navigate = useNavigate();
  const [addHelperOpen, setAddHelperOpen] = useState(false);
  const { toast } = useToast();

  const spaces = useUnifiedOSStore((state) => state.spaces);
  const activeSpace = useUnifiedOSStore((state) => state.active_space);
  const activeHelpers = useUnifiedOSStore((state) => state.active_helpers);
  const activeHelperId = useUnifiedOSStore((state) => state.active_helper_id);
  const sidebarCollapsed = useUnifiedOSStore((state) => state.sidebar_collapsed);
  const focusMode = useUnifiedOSStore((state) => state.focus_mode);
  const setActiveSpace = useUnifiedOSStore((state) => state.setActiveSpace);
  const setActiveHelper = useUnifiedOSStore((state) => state.setActiveHelper);
  const addHelper = useUnifiedOSStore((state) => state.addHelper);
  const removeHelper = useUnifiedOSStore((state) => state.removeHelper);
  const toggleSidebar = useUnifiedOSStore((state) => state.toggleSidebar);
  const setFocusMode = useUnifiedOSStore((state) => state.setFocusMode);

  // Load space on mount
  useEffect(() => {
    if (spaceId) {
      const currentSpaces = useUnifiedOSStore.getState().spaces;
      const space = currentSpaces.find((s) => s.id === spaceId);
      if (space) {
        setActiveSpace(space);
      } else {
        toast({
          title: 'Space not found',
          description: 'Redirecting to spaces list...',
          variant: 'destructive',
        });
        navigate('/unified-os');
      }
    }
  }, [spaceId, setActiveSpace, toast, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Cmd/Ctrl + \ = Toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        toggleSidebar();
      }

      // Cmd/Ctrl + Shift + F = Toggle focus mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        setFocusMode(!focusMode);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [toggleSidebar, setFocusMode, focusMode]);

  if (!activeSpace) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-500">Loading workspace...</div>
      </div>
    );
  }

  const activeHelper = activeHelpers.find((h) => h.id === activeHelperId);

  const renderHelper = () => {
    if (!activeHelper) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No helper selected
            </h3>
            <p className="text-gray-500 mb-6">
              Choose a helper from the sidebar or add a new one to get started.
            </p>
          </div>
        </div>
      );
    }

    const HelperComponent = {
      chatgpt: ChatGPTHelper,
      youtube: YouTubeHelper,
      notebookllm: NotebookLLMHelper,
      classroom: ClassroomHelper,
      instructor: InstructorHelper,
      notes: NotesHelper,
    }[activeHelper.type];

    if (!HelperComponent) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Helper not found
            </h3>
            <p className="text-gray-500 mb-6">
              The helper type "{activeHelper.type}" is not recognized.
            </p>
          </div>
        </div>
      );
    }

    return <HelperComponent helper={activeHelper} space={activeSpace} />;
  };

  return (
    <div className="h-screen bg-[#0a0a0a] text-gray-100 flex flex-col overflow-hidden">
      {/* Top Bar */}
      <AnimatePresence>
        {!focusMode && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            className="border-b border-gray-800 bg-[#0f0f0f] flex-shrink-0"
          >
            <div className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate('/unified-os')}
                  className="text-gray-400 hover:text-gray-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <div>
                  <h2 className="font-semibold text-gray-100">
                    {activeSpace.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {activeSpace.subject} · {activeSpace.progress_percentage}%
                    complete
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="text-gray-400 hover:text-gray-100"
                  title="Toggle sidebar (Cmd+\)"
                >
                  {sidebarCollapsed ? (
                    <PanelRightOpen className="h-4 w-4" />
                  ) : (
                    <PanelRightClose className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setFocusMode(!focusMode)}
                  className="text-gray-400 hover:text-gray-100"
                  title="Focus mode (Cmd+Shift+F)"
                >
                  {focusMode ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Work Area */}
        <div className="flex-1 overflow-hidden">
          {renderHelper()}
        </div>

        {/* Helper Sidebar */}
        <AnimatePresence>
          {!sidebarCollapsed && !focusMode && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 border-l border-gray-800 bg-[#0f0f0f] flex flex-col"
            >
              {/* Sidebar Header */}
              <div className="border-b border-gray-800 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-100">Helpers</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAddHelperOpen(true)}
                    className="text-gray-400 hover:text-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-gray-500">
                  AI-powered tools for {activeSpace.subject}
                </p>
              </div>

              {/* Helper List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  {activeHelpers.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No helpers yet.
                      <br />
                      Click + to add one.
                    </div>
                  ) : (
                    activeHelpers.map((helper) => (
                      <button
                        key={helper.id}
                        onClick={() => setActiveHelper(helper.id)}
                        className={`group w-full p-3 rounded-lg text-left transition-all ${
                          activeHelperId === helper.id
                            ? 'bg-gray-800 border border-gray-700'
                            : 'bg-[#1a1a1a] border border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {HELPER_ICONS[helper.type]}
                            </span>
                            <span className="font-medium text-sm text-gray-100">
                              {helper.name || HELPER_NAMES[helper.type]}
                            </span>
                          </div>

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              removeHelper(helper.id);
                              if (activeHelperId === helper.id) {
                                setActiveHelper(null);
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-100 cursor-pointer p-1 rounded hover:bg-gray-700"
                          >
                            <X className="h-3 w-3" />
                          </div>
                        </div>

                        <p className="text-xs text-gray-500">
                          {HELPER_NAMES[helper.type]}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="border-t border-gray-800 p-4">
                <div className="text-xs text-gray-500">
                  <kbd className="px-2 py-1 bg-[#1a1a1a] border border-gray-800 rounded">
                    ⌘/Ctrl + \
                  </kbd>{' '}
                  to toggle
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Helper Dialog */}
      <Dialog open={addHelperOpen} onOpenChange={setAddHelperOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a] border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Add Helper</DialogTitle>
            <DialogDescription className="text-gray-400">
              Choose an AI-powered tool to add to your workspace
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4">
            {(Object.keys(HELPER_ICONS) as HelperType[]).map((helperType) => {
              const isAdded = activeHelpers.some((h) => h.type === helperType);
              
              return (
                <button
                  key={helperType}
                  onClick={() => {
                    if (!isAdded) {
                      const newHelper: Helper = {
                        id: `helper-${Date.now()}`,
                        type: helperType,
                        name: HELPER_NAMES[helperType],
                        settings: {},
                      };
                      addHelper(newHelper);
                      setAddHelperOpen(false);
                      toast({
                        title: 'Helper Added',
                        description: `${HELPER_NAMES[helperType]} is now available in your workspace.`,
                      });
                      // Auto-select the newly added helper
                      setTimeout(() => {
                        setActiveHelper(newHelper.id);
                      }, 100);
                    }
                  }}
                  disabled={isAdded}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    isAdded
                      ? 'bg-[#0f0f0f] border-gray-800 opacity-50 cursor-not-allowed'
                      : 'bg-[#0f0f0f] border-gray-800 hover:border-gray-700 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{HELPER_ICONS[helperType]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-100 mb-1 flex items-center gap-2">
                        {HELPER_NAMES[helperType]}
                        {isAdded && (
                          <span className="text-xs text-gray-500">✓ Added</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {HELPER_DESCRIPTIONS[helperType]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Focus Mode Overlay Hint */}
      <AnimatePresence>
        {focusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-4 right-4 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-xs text-gray-400"
          >
            Press{' '}
            <kbd className="px-2 py-1 bg-[#1a1a1a] border border-gray-800 rounded">
              ⌘/Ctrl + Shift + F
            </kbd>{' '}
            to exit focus mode
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
