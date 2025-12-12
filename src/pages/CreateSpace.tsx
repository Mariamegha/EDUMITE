/**
 * Create Space - Multi-step Wizard
 * 
 * Guides users through creating a new learning space.
 * Steps: Name → Subject → Goal → Level → Duration → Instructor
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUnifiedOSStore } from '@/store/unifiedOSStore';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  Calendar,
  User,
} from 'lucide-react';
import type { SpaceLevel } from '@/types/unifiedOS';

interface CreateSpaceForm {
  name: string;
  subject: string;
  learning_goal: string;
  level: SpaceLevel;
  duration_weeks: number;
  instructor_type: 'ai' | 'human';
  instructor_id?: string;
}

const STEPS = [
  { id: 1, name: 'Name', icon: BookOpen },
  { id: 2, name: 'Subject', icon: Sparkles },
  { id: 3, name: 'Goal', icon: Target },
  { id: 4, name: 'Level', icon: TrendingUp },
  { id: 5, name: 'Duration', icon: Calendar },
  { id: 6, name: 'Instructor', icon: User },
];

const LEVEL_OPTIONS: Array<{
  value: SpaceLevel;
  label: string;
  description: string;
}> = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'Starting from scratch, learning fundamentals',
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: 'Have basics, want to deepen understanding',
  },
  {
    value: 'advanced',
    label: 'Advanced',
    description: 'Expert-level content and challenges',
  },
];

const DURATION_OPTIONS = [4, 6, 8, 12, 16, 20, 24];

const POPULAR_SUBJECTS = [
  'Mathematics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'History',
  'Economics',
  'Psychology',
  'Engineering',
];

export default function CreateSpace() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const spaces = useUnifiedOSStore((state) => state.spaces);
  const setSpaces = useUnifiedOSStore((state) => state.setSpaces);
  const setActiveSpace = useUnifiedOSStore((state) => state.setActiveSpace);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateSpaceForm>({
    name: '',
    subject: '',
    learning_goal: '',
    level: 'intermediate',
    duration_weeks: 12,
    instructor_type: 'ai',
  });

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.subject.trim().length > 0;
      case 3:
        return formData.learning_goal.trim().length > 0;
      case 4:
        return formData.level !== null;
      case 5:
        return formData.duration_weeks > 0;
      case 6:
        return formData.instructor_type !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid() && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = async () => {
    if (!isStepValid()) return;

    // TODO: Save to Supabase
    const newSpace = {
      id: `space-${Date.now()}`,
      user_id: 'user-1', // TODO: Get from auth
      ...formData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      last_accessed_at: new Date().toISOString(),
      progress_percentage: 0,
      is_archived: false,
    };

    setSpaces([...spaces, newSpace]);
    setActiveSpace(newSpace);

    toast({
      title: 'Space created!',
      description: `"${newSpace.name}" is ready for you.`,
    });

    navigate(`/unified-os/workspace/${newSpace.id}`);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                What would you like to call this space?
              </Label>
              <Input
                id="name"
                placeholder="e.g., Advanced Calculus, Web Development Bootcamp"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-2 bg-[#1a1a1a] border-gray-800 focus:border-gray-700 text-gray-100"
                autoFocus
              />
            </div>
            <p className="text-sm text-gray-500">
              Choose a descriptive name that reflects what you'll be learning.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject" className="text-gray-300">
                What subject will you be studying?
              </Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics, Computer Science, Physics"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="mt-2 bg-[#1a1a1a] border-gray-800 focus:border-gray-700 text-gray-100"
                autoFocus
              />
            </div>

            <div>
              <Label className="text-gray-400 text-sm">Popular subjects</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {POPULAR_SUBJECTS.map((subject) => (
                  <Badge
                    key={subject}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-800 text-gray-400 border-gray-700"
                    onClick={() => setFormData({ ...formData, subject })}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal" className="text-gray-300">
                What's your learning goal?
              </Label>
              <Textarea
                id="goal"
                placeholder="e.g., Master integration techniques and applications in real-world problems"
                value={formData.learning_goal}
                onChange={(e) =>
                  setFormData({ ...formData, learning_goal: e.target.value })
                }
                className="mt-2 bg-[#1a1a1a] border-gray-800 focus:border-gray-700 text-gray-100 min-h-[120px]"
                autoFocus
              />
            </div>
            <p className="text-sm text-gray-500">
              Be specific about what you want to achieve. This helps AI tutors
              provide better guidance.
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label className="text-gray-300">
              What's your current level in this subject?
            </Label>

            <div className="space-y-3">
              {LEVEL_OPTIONS.map((option) => (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer transition-all ${
                    formData.level === option.value
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700'
                  }`}
                  onClick={() => setFormData({ ...formData, level: option.value })}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-100">
                        {option.label}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                    {formData.level === option.value && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <Label className="text-gray-300">
              How many weeks do you want to dedicate to this?
            </Label>

            <div className="grid grid-cols-4 gap-3">
              {DURATION_OPTIONS.map((weeks) => (
                <Card
                  key={weeks}
                  className={`p-4 cursor-pointer text-center transition-all ${
                    formData.duration_weeks === weeks
                      ? 'bg-gray-800 border-gray-600'
                      : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700'
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, duration_weeks: weeks })
                  }
                >
                  <div className="text-2xl font-bold text-gray-100">
                    {weeks}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">weeks</div>
                  {formData.duration_weeks === weeks && (
                    <Check className="h-4 w-4 text-green-500 mx-auto mt-2" />
                  )}
                </Card>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              This helps structure your learning path. You can adjust it later.
            </p>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <Label className="text-gray-300">
              Choose your learning instructor
            </Label>

            <div className="space-y-3">
              <Card
                className={`p-4 cursor-pointer transition-all ${
                  formData.instructor_type === 'ai'
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700'
                }`}
                onClick={() =>
                  setFormData({ ...formData, instructor_type: 'ai' })
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-100 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      AI Instructor (Recommended)
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Powered by Gemini. Available 24/7, adapts to your pace.
                    </p>
                  </div>
                  {formData.instructor_type === 'ai' && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-all ${
                  formData.instructor_type === 'human'
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700'
                }`}
                onClick={() =>
                  setFormData({ ...formData, instructor_type: 'human' })
                }
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-100">
                      Human Instructor
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Connect with expert teachers. Schedule-based sessions.
                    </p>
                  </div>
                  {formData.instructor_type === 'human' && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/unified-os')}
            className="text-gray-400 hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Spaces
          </Button>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="border-b border-gray-800 bg-[#0f0f0f]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gray-100 text-gray-900'
                          : isCompleted
                          ? 'bg-gray-700 text-gray-100'
                          : 'bg-[#1a1a1a] text-gray-600 border border-gray-800'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 ${
                        isActive
                          ? 'text-gray-100'
                          : isCompleted
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>

                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mb-6 transition-all ${
                        isCompleted ? 'bg-gray-700' : 'bg-gray-800'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-[#141414] border-gray-800 p-8">
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="text-gray-400"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>

                  {currentStep < STEPS.length ? (
                    <Button
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="bg-gray-100 text-gray-900 hover:bg-gray-200"
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleCreate}
                      disabled={!isStepValid()}
                      className="bg-gray-100 text-gray-900 hover:bg-gray-200"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Create Space
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
