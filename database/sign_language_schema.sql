-- Sign Language Learning System - Supabase Schema

-- User Sign Language Profile
CREATE TABLE sign_language_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_language TEXT NOT NULL CHECK (preferred_language IN ('ASL', 'ISL', 'BSL', 'CSL', 'JSL', 'LSF', 'DGS')),
  skill_level TEXT NOT NULL CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  learning_speed TEXT NOT NULL CHECK (learning_speed IN ('slow', 'medium', 'fast')),
  hand_dominance TEXT NOT NULL DEFAULT 'right' CHECK (hand_dominance IN ('left', 'right', 'ambidextrous')),
  accessibility_needs JSONB NOT NULL DEFAULT '{"high_contrast": false, "larger_subtitles": false, "haptic_feedback": true, "color_blind_mode": false}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Sign Language Lessons
CREATE TABLE sign_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  subject_category TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
  sign_language TEXT NOT NULL CHECK (sign_language IN ('ASL', 'ISL', 'BSL', 'CSL', 'JSL', 'LSF', 'DGS')),
  lesson_script JSONB NOT NULL,
  estimated_duration_minutes INTEGER NOT NULL,
  gesture_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed', 'mastered')),
  completion_percentage INTEGER NOT NULL DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  cached_locally BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sign_lessons_user_id ON sign_lessons(user_id);
CREATE INDEX idx_sign_lessons_topic ON sign_lessons(topic);
CREATE INDEX idx_sign_lessons_sign_language ON sign_lessons(sign_language);

-- Gesture Library
CREATE TABLE sign_gestures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  word_or_phrase TEXT NOT NULL,
  sign_language TEXT NOT NULL CHECK (sign_language IN ('ASL', 'ISL', 'BSL', 'CSL', 'JSL', 'LSF', 'DGS')),
  gesture_data JSONB NOT NULL,
  duration_ms INTEGER NOT NULL,
  complexity TEXT NOT NULL CHECK (complexity IN ('simple', 'moderate', 'complex')),
  requires_both_hands BOOLEAN NOT NULL DEFAULT FALSE,
  facial_expression TEXT,
  body_orientation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sign_gestures_word ON sign_gestures(word_or_phrase);
CREATE INDEX idx_sign_gestures_language ON sign_gestures(sign_language);
CREATE INDEX idx_sign_gestures_complexity ON sign_gestures(complexity);

-- Lesson Progress Tracking
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES sign_lessons(id) ON DELETE CASCADE,
  current_section INTEGER NOT NULL DEFAULT 0,
  gestures_learned TEXT[] DEFAULT '{}',
  gestures_mastered TEXT[] DEFAULT '{}',
  weak_gestures TEXT[] DEFAULT '{}',
  accuracy_scores JSONB DEFAULT '[]'::jsonb,
  repetition_count INTEGER DEFAULT 0,
  total_time_spent_minutes INTEGER DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_review_date TIMESTAMP WITH TIME ZONE,
  spaced_repetition_interval_days INTEGER DEFAULT 1,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_next_review ON lesson_progress(next_review_date);

-- Practice Sessions
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES sign_lessons(id) ON DELETE CASCADE,
  gesture_id UUID REFERENCES sign_gestures(id) ON DELETE SET NULL,
  student_recording JSONB NOT NULL,
  reference_recording JSONB NOT NULL,
  comparison_result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_gesture_id ON practice_sessions(gesture_id);

-- Quiz Results
CREATE TABLE quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES sign_lessons(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  answers JSONB NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_lesson_id ON quiz_results(lesson_id);

-- Offline Cached Lessons
CREATE TABLE offline_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES sign_lessons(id) ON DELETE CASCADE,
  lesson_data JSONB NOT NULL,
  video_cache_url TEXT,
  frame_sequence JSONB,
  size_mb DECIMAL(10, 2) NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_offline_lessons_user_id ON offline_lessons(user_id);
CREATE INDEX idx_offline_lessons_expires_at ON offline_lessons(expires_at);

-- Learning Analytics
CREATE TABLE learning_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_lessons_completed INTEGER DEFAULT 0,
  total_gestures_learned INTEGER DEFAULT 0,
  average_accuracy DECIMAL(5, 2) DEFAULT 0,
  learning_streak_days INTEGER DEFAULT 0,
  weekly_minutes INTEGER DEFAULT 0,
  strong_gesture_types TEXT[] DEFAULT '{}',
  weak_areas TEXT[] DEFAULT '{}',
  retention_rate DECIMAL(5, 2) DEFAULT 0,
  practice_frequency TEXT DEFAULT 'occasional' CHECK (practice_frequency IN ('daily', 'frequent', 'occasional', 'rare')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_learning_analytics_user_id ON learning_analytics(user_id);

-- Adaptive Learning State
CREATE TABLE adaptive_learning_state (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_speed TEXT NOT NULL DEFAULT 'medium' CHECK (current_speed IN ('slow', 'medium', 'fast')),
  auto_repeat_threshold INTEGER DEFAULT 70 CHECK (auto_repeat_threshold >= 0 AND auto_repeat_threshold <= 100),
  visual_complexity_level TEXT DEFAULT 'standard' CHECK (visual_complexity_level IN ('minimal', 'standard', 'detailed')),
  preferred_session_length_minutes INTEGER DEFAULT 20,
  break_reminders_enabled BOOLEAN DEFAULT TRUE,
  cognitive_load_score INTEGER DEFAULT 50 CHECK (cognitive_load_score >= 0 AND cognitive_load_score <= 100),
  last_adjusted TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_adaptive_learning_state_user_id ON adaptive_learning_state(user_id);

-- Teacher Custom Lessons
CREATE TABLE teacher_custom_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  topic TEXT NOT NULL,
  target_difficulty TEXT NOT NULL CHECK (target_difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
  custom_gestures JSONB NOT NULL,
  sharing_enabled BOOLEAN DEFAULT FALSE,
  classroom_ids TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_teacher_custom_lessons_teacher_id ON teacher_custom_lessons(teacher_id);

-- Classroom Sign Sessions
CREATE TABLE classroom_sign_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  classroom_id UUID NOT NULL,
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES sign_lessons(id) ON DELETE SET NULL,
  active_students TEXT[] DEFAULT '{}',
  session_mode TEXT NOT NULL CHECK (session_mode IN ('live_teaching', 'practice', 'quiz')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_classroom_sign_sessions_classroom_id ON classroom_sign_sessions(classroom_id);
CREATE INDEX idx_classroom_sign_sessions_teacher_id ON classroom_sign_sessions(teacher_id);

-- Row Level Security Policies
ALTER TABLE sign_language_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sign_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE sign_gestures ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE adaptive_learning_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_custom_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE classroom_sign_sessions ENABLE ROW LEVEL SECURITY;

-- Policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON sign_language_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON sign_language_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON sign_language_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own lessons" ON sign_lessons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own lessons" ON sign_lessons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own lessons" ON sign_lessons FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view gestures" ON sign_gestures FOR SELECT USING (true);

CREATE POLICY "Users can view own progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON lesson_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own practice" ON practice_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own practice" ON practice_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own quiz results" ON quiz_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz results" ON quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own offline lessons" ON offline_lessons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own offline lessons" ON offline_lessons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own offline lessons" ON offline_lessons FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own analytics" ON learning_analytics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own analytics" ON learning_analytics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own analytics" ON learning_analytics FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own adaptive state" ON adaptive_learning_state FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own adaptive state" ON adaptive_learning_state FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own adaptive state" ON adaptive_learning_state FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Teachers can view own lessons" ON teacher_custom_lessons FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can insert own lessons" ON teacher_custom_lessons FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update own lessons" ON teacher_custom_lessons FOR UPDATE USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can view own sessions" ON classroom_sign_sessions FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can insert own sessions" ON classroom_sign_sessions FOR INSERT WITH CHECK (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update own sessions" ON classroom_sign_sessions FOR UPDATE USING (auth.uid() = teacher_id);
