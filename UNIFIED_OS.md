# Unified OS - Educational Operating System

## Overview

Unified OS is a comprehensive workspace-based learning environment that provides an operating system-like experience within EDUMITE. Each learning space is subject-locked and equipped with AI-powered helpers that share context and collaborate to enhance the learning experience.

## Architecture

### Core Concepts

1. **Spaces**: Isolated learning environments for specific subjects
   - Subject-focused (Mathematics, Computer Science, Physics, etc.)
   - Progress tracking and goal-oriented
   - Configurable duration (4-24 weeks)
   - AI or human instructor support

2. **Helpers**: AI-powered tools within each space
   - ChatGPT: Conversational AI tutor
   - YouTube: Subject-filtered video learning
   - NotebookLLM: Presentation generator
   - Classroom: Structured notes and assignments
   - Instructor: Personal mentor (AI or human)
   - Notes: File management with AI indexing

3. **Context Sharing**: All helpers within a space share:
   - Subject matter
   - Learning goals
   - Student level (beginner/intermediate/advanced)
   - Conversation history
   - Uploaded materials

## Features

### Entry Point (`/unified-os`)
- Grid view of all learning spaces
- Search and filter capabilities
- Archive management
- Quick access to recent spaces
- Create new space button

### Space Creation (`/unified-os/create`)
Multi-step wizard with validation:
1. Name: Descriptive space title
2. Subject: Topic or discipline
3. Goal: Specific learning objectives
4. Level: Skill proficiency
5. Duration: Time commitment (weeks)
6. Instructor: AI vs human preference

### Workspace Environment (`/unified-os/workspace/:spaceId`)
Full-screen OS-like interface:
- **Top Bar**: Space info, progress, quick actions
- **Work Area**: Active helper content
- **Helper Sidebar**: Tool switching and management
- **Focus Mode**: Distraction-free environment (Cmd+Shift+F)
- **Keyboard Shortcuts**:
  - `Cmd/Ctrl + \`: Toggle sidebar
  - `Cmd/Ctrl + Shift + F`: Toggle focus mode
  - `Cmd/Ctrl + K`: Command palette (future)

## State Management

### Zustand Store (`src/store/unifiedOSStore.ts`)
Global state with persistence:
- **Spaces**: Array of all user spaces
- **Active Space**: Currently open workspace
- **Active Helpers**: Tools in current space
- **Chat Messages**: Indexed by space_id
- **Notes**: Indexed by space_id
- **UI State**: Sidebar, focus mode, layout

Persistence Strategy:
- UI preferences → localStorage
- Workspace data → Supabase (fresh load on mount)
- Session isolation (no cross-space contamination)

## Data Models

### Space
```typescript
{
  id: string;
  user_id: string;
  name: string;
  subject: string;
  learning_goal: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_weeks: number;
  instructor_id?: string;
  instructor_type: 'ai' | 'human';
  created_at: string;
  updated_at: string;
  last_accessed_at: string;
  progress_percentage: number;
  is_archived: boolean;
}
```

### Helper
```typescript
{
  id: string;
  space_id: string;
  type: 'chatgpt' | 'youtube' | 'notebookllm' | 'classroom' | 'instructor' | 'notes';
  name?: string;
  is_active: boolean;
  config: HelperConfig; // Type-specific configuration
  state: Record<string, any>; // Helper-specific state
  order: number;
  created_at: string;
  updated_at: string;
}
```

## AI Integration

### Gemini-Powered Intelligence
All helpers use the centralized AI client (`src/lib/aiClient.ts`):
- Context-aware prompts based on space configuration
- Subject-specific knowledge injection
- Streaming responses for real-time interaction
- Error handling and retry logic

### ChatGPT Helper Implementation
```typescript
useAIContext({
  contextType: 'study-assistant',
  systemPrompt: `You are an expert tutor for ${space.subject}.
    Student's learning goal: ${space.learning_goal}
    Student's level: ${space.level}
    
    Provide clear, encouraging explanations...`
});
```

## File Structure

```
src/
├── pages/
│   ├── UnifiedOS.tsx          # Entry page (space selector)
│   ├── CreateSpace.tsx        # Multi-step space creation
│   └── WorkspaceLayout.tsx    # Main OS environment
├── components/
│   └── workspace/
│       ├── ChatGPTHelper.tsx       # ✅ Implemented
│       ├── YouTubeHelper.tsx       # 🚧 Placeholder
│       ├── NotebookLLMHelper.tsx   # 🚧 Placeholder
│       ├── ClassroomHelper.tsx     # 🚧 Placeholder
│       ├── InstructorHelper.tsx    # 🚧 Placeholder
│       └── NotesHelper.tsx         # 🚧 Placeholder
├── store/
│   └── unifiedOSStore.ts      # Global state management
└── types/
    └── unifiedOS.ts           # TypeScript definitions
```

## Routing

```
/unified-os                      → Entry page (space selector)
/unified-os/create              → Space creation wizard
/unified-os/workspace/:spaceId  → Active workspace environment
```

Navbar and DockNav are hidden for all `/unified-os/*` routes to maintain the OS-like immersive experience.

## Styling

### Design Principles
- **Dark Mode First**: #0a0a0a background, #0f0f0f surfaces
- **Calm Colors**: Dull grays instead of bright/neon (eye comfort)
- **Subtle Animations**: Framer Motion with gentle transitions
- **High Information Density**: Maximize usable space
- **Keyboard-First**: All actions accessible via shortcuts

### Color Palette
```css
Background:    #0a0a0a (deep black)
Surface:       #0f0f0f (elevated)
Card:          #141414 (raised)
Border:        #1a1a1a, #2a2a2a (subtle)
Text Primary:  #e5e5e5, #f5f5f5 (soft white)
Text Muted:    #9ca3af, #6b7280 (gray)
```

## Development Status

### Completed ✅
- [x] Data architecture (types, interfaces)
- [x] Zustand store with persistence
- [x] Entry page with space grid
- [x] Space creation wizard (6 steps)
- [x] OS layout shell (focus mode, sidebar)
- [x] ChatGPT Helper (Gemini-powered)
- [x] Routing integration
- [x] Navigation links (DockNav)

### In Progress 🚧
- [ ] YouTube Helper
- [ ] NotebookLLM Helper
- [ ] Classroom Helper
- [ ] Instructor Helper
- [ ] Notes Helper

### Planned 📋
- [ ] Supabase persistence (spaces, helpers, chat, notes)
- [ ] Auto-save workspace state
- [ ] Restore last active space on load
- [ ] Helper drag-and-drop reordering
- [ ] Command palette (Cmd+K)
- [ ] Space sharing/collaboration
- [ ] Export workspace as PDF
- [ ] Mobile responsive layout

## Usage

### Creating a Space
1. Navigate to `/unified-os`
2. Click "Create New Space"
3. Follow the 6-step wizard:
   - Name your space
   - Select subject (or enter custom)
   - Define learning goal
   - Choose skill level
   - Set duration
   - Pick instructor type
4. Click "Create Space" to launch workspace

### Working in a Space
1. Open space from entry page
2. Add helpers from sidebar "+" button
3. Click helper to activate in work area
4. Use keyboard shortcuts:
   - `Cmd/Ctrl + \` to toggle sidebar
   - `Cmd/Ctrl + Shift + F` for focus mode
5. All helpers share context automatically

### Using ChatGPT Helper
1. Add "ChatGPT" helper to space
2. Ask questions about the subject
3. AI tutor responds with subject-aware context
4. Conversation history persists per space
5. Markdown formatting for code/math

## Technical Notes

### Performance Optimizations
- Zustand selectors for granular re-renders
- useMemo for derived state (message lists)
- Lazy loading for helper components
- Virtual scrolling for long chat histories (future)

### Security
- User ID isolation (Supabase RLS)
- API key never exposed to client
- Input sanitization for user-generated content
- Rate limiting on AI requests (future)

### Accessibility
- Keyboard navigation throughout
- ARIA labels on interactive elements
- Focus management in modals/dialogs
- Screen reader compatibility (future)

## Future Enhancements

### Short-term
1. Complete all 6 helpers
2. Supabase integration
3. Helper add/remove dialog with descriptions
4. Space archive/delete confirmations
5. Progress visualization in workspace

### Long-term
1. Real-time collaboration (multiple users in space)
2. Voice input for helpers
3. Mobile app (React Native)
4. Offline mode with sync
5. Marketplace for custom helpers
6. Integration with external tools (Notion, Drive)

## Contributing

When implementing new helpers:
1. Follow `ChatGPTHelper.tsx` structure
2. Use `useUnifiedOSStore` for state
3. Integrate with `useAIContext` for Gemini
4. Maintain subject-awareness in all interactions
5. Add proper TypeScript types
6. Include loading/error states

## License

Part of EDUMITE platform. All rights reserved.

---

**Status**: Phase 36 - Foundation Complete  
**Next**: Implement remaining 5 helpers and Supabase persistence  
**Updated**: 2025-01-06
