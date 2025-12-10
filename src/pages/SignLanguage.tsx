/**
 * Sign Language Learning - Main Page
 * 
 * Mobile-first entry point for sign language education
 * Accessibility-focused, life-changing design
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mic,
  Zap,
  BookOpen,
  TrendingUp,
  Play,
  Settings,
  Download,
} from 'lucide-react';
import type {
  SignLanguageType,
  DifficultyLevel,
  LearningSpeed,
  SignLesson,
} from '@/types/signLanguage';
import { getGeminiLessonService } from '@/services/geminiLesson';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignLanguage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentLessons, setRecentLessons] = useState<SignLesson[]>([]);
  const [voiceInput, setVoiceInput] = useState(false);

  // Suggested topics for quick start
  const suggestedTopics = [
    { emoji: '🔢', title: 'Basic Mathematics', subject: 'math' },
    { emoji: '🌍', title: 'World Geography', subject: 'geography' },
    { emoji: '🧬', title: 'Human Biology', subject: 'science' },
    { emoji: '📖', title: 'English Grammar', subject: 'language' },
    { emoji: '💻', title: 'Introduction to Coding', subject: 'technology' },
    { emoji: '🎨', title: 'Art History', subject: 'arts' },
  ];

  // Start voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;

    recognition.onstart = () => {
      setVoiceInput(true);
      if ('vibrate' in navigator) navigator.vibrate([50, 100, 50]);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTopic(transcript);
      setVoiceInput(false);
    };

    recognition.onerror = () => {
      setVoiceInput(false);
    };

    recognition.onend = () => {
      setVoiceInput(false);
    };

    recognition.start();
  };

  // Navigate to setup
  const handleStartLesson = (initialTopic?: string) => {
    navigate('/sign-language/setup', {
      state: { topic: initialTopic || topic },
    });
  };

  // Load recent lessons
  useEffect(() => {
    // TODO: Load from Supabase
    setRecentLessons([]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="relative max-w-md mx-auto px-6 pt-12 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent">
              Sign Language
            </h1>
            <button
              onClick={() => navigate('/sign-language/settings')}
              className="p-2 rounded-xl bg-neutral-800/50 text-neutral-300 active:scale-95 transition"
            >
              <Settings size={20} />
            </button>
          </div>

          {/* Mission statement */}
          <div className="mb-8">
            <p className="text-neutral-300 text-base leading-relaxed">
              Learn <span className="text-amber-400 font-medium">any subject</span> through{' '}
              <span className="text-rose-400 font-medium">sign language</span>.
              <br />
              Powered by AI. Built for accessibility.
            </p>
          </div>

          {/* Topic input */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="What do you want to learn?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && topic.trim()) {
                    handleStartLesson();
                  }
                }}
                className="w-full h-14 px-5 pr-14 bg-neutral-900 border-neutral-700 rounded-2xl text-white placeholder:text-neutral-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
              
              {/* Voice input button */}
              <button
                onClick={handleVoiceInput}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl transition ${
                  voiceInput
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-neutral-800 text-neutral-300 active:scale-95'
                }`}
              >
                <Mic size={20} />
              </button>
            </div>

            {voiceInput && (
              <p className="mt-2 text-xs text-neutral-400 animate-pulse text-center">
                Listening...
              </p>
            )}
          </div>

          {/* Start button */}
          <Button
            onClick={() => handleStartLesson()}
            disabled={!topic.trim() || isGenerating}
            className="w-full h-14 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white rounded-2xl font-medium text-base shadow-lg shadow-amber-900/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                Generating Lesson...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Start Learning
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Quick Start Topics */}
      <div className="max-w-md mx-auto px-6 py-8">
        <h2 className="text-sm font-medium text-neutral-400 mb-4 flex items-center">
          <Sparkles size={16} className="mr-2" />
          Quick Start
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {suggestedTopics.map((item, index) => (
            <button
              key={index}
              onClick={() => handleStartLesson(item.title)}
              className="p-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-2xl text-left active:scale-95 transition group"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-sm font-medium text-white group-hover:text-amber-400 transition">
                {item.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Lessons */}
      {recentLessons.length > 0 && (
        <div className="max-w-md mx-auto px-6 py-8">
          <h2 className="text-sm font-medium text-neutral-400 mb-4 flex items-center">
            <BookOpen size={16} className="mr-2" />
            Continue Learning
          </h2>

          <div className="space-y-3">
            {recentLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => navigate(`/sign-language/lesson/${lesson.id}`)}
                className="w-full p-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-2xl text-left active:scale-95 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{lesson.topic}</h3>
                    <p className="text-xs text-neutral-400">
                      {lesson.completion_percentage}% complete • {lesson.gesture_count} gestures
                    </p>
                  </div>
                  <div className="p-2 bg-amber-900/30 rounded-lg">
                    <Play size={16} className="text-amber-400" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-rose-600"
                    style={{ width: `${lesson.completion_percentage}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-900/30 rounded-2xl">
            <div className="flex items-start">
              <div className="p-2 bg-amber-900/30 rounded-lg mr-4">
                <TrendingUp size={20} className="text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Adaptive Learning</h3>
                <p className="text-sm text-neutral-400">
                  AI adjusts speed and difficulty to match your pace
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-rose-900/20 to-transparent border border-rose-900/30 rounded-2xl">
            <div className="flex items-start">
              <div className="p-2 bg-rose-900/30 rounded-lg mr-4">
                <Download size={20} className="text-rose-400" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">Offline Learning</h3>
                <p className="text-sm text-neutral-400">
                  Download lessons for practice anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support multiple sign languages badge */}
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="text-center text-xs text-neutral-500">
          Supporting ASL • ISL • BSL • CSL • JSL • LSF • DGS
        </div>
      </div>
    </div>
  );
}
