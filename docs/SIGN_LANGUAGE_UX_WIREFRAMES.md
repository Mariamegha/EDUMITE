# 📱 Sign Language Learning System - UX Wireframes

## Mobile-First Screen Flow

---

## Screen 1: Sign Language Home

### Layout (Mobile 375x812)
```
┌─────────────────────────────────────┐
│ ◀ Settings                    ⚙️    │ Top Bar (60px)
├─────────────────────────────────────┤
│                                     │
│  Sign Language                      │ Header (gold gradient)
│                                     │
│  Learn any subject through          │
│  sign language.                     │
│  Powered by AI. Built for           │
│  accessibility.                     │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │ Topic Input
│  │ What do you want to learn?  🎤│ │ (voice button)
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   ⚡ Start Learning           │ │ Primary CTA
│  └───────────────────────────────┘ │ (gradient button)
│                                     │
├─────────────────────────────────────┤
│  ✨ Quick Start                     │ Section Header
│                                     │
│  ┌──────────┐ ┌──────────┐        │
│  │ 🔢 Math  │ │ 🌍 Geo   │        │ Topic Cards
│  │ Basic    │ │ World    │        │ (2 columns)
│  └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐        │
│  │ 🧬 Bio   │ │ 📖 Eng   │        │
│  │ Human    │ │ Grammar  │        │
│  └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐        │
│  │ 💻 Code  │ │ 🎨 Art   │        │
│  │ Intro    │ │ History  │        │
│  └──────────┘ └──────────┘        │
│                                     │
├─────────────────────────────────────┤
│  📖 Continue Learning               │ Section (if has data)
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 📐 Trigonometry               │ │
│  │ 65% complete • 18 gestures    │ │ Recent Lesson
│  │ ▓▓▓▓▓▓▓▓▓▓▓░░░░░             │ │ Progress Bar
│  │                           ▶   │ │
│  └───────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  Features                           │
│                                     │
│  📈 Adaptive Learning               │
│  AI adjusts to your pace            │
│                                     │
│  📥 Offline Learning                │
│  Download lessons anywhere          │
│                                     │
├─────────────────────────────────────┤
│  Supporting: ASL • ISL • BSL        │ Footer
│  CSL • JSL • LSF • DGS              │
│                                     │
└─────────────────────────────────────┘
```

### Interactions
- **Tap topic input**: Focus + keyboard
- **Tap voice button**: Start speech recognition
- **Tap quick start card**: Navigate to setup
- **Tap recent lesson**: Resume lesson
- **Swipe up**: Scroll content

---

## Screen 2: Learning Setup

### Layout
```
┌─────────────────────────────────────┐
│ ◀ Back     Personalize Your Lesson  │ Top Bar
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Learning Topic                │ │
│  │ Photosynthesis                │ │ Topic Display
│  └───────────────────────────────┘ │ (amber gradient)
│                                     │
├─────────────────────────────────────┤
│  Sign Language                      │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 🇺🇸 American (ASL)        ✓   │ │ Selected
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ 🇮🇳 Indian (ISL)              │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ 🇬🇧 British (BSL)             │ │
│  └───────────────────────────────┘ │
│  ... (show more)                    │
│                                     │
├─────────────────────────────────────┤
│  Your Skill Level                   │
│                                     │
│  ┌─────────┐ ┌─────────┐          │
│  │Beginner│✓│Intermed │           │ 2x2 Grid
│  │New topic│ │Some exp │           │
│  └─────────┘ └─────────┘          │
│  ┌─────────┐ ┌─────────┐          │
│  │Advanced │ │ Expert  │           │
│  │Solid    │ │ Deep    │           │
│  └─────────┘ └─────────┘          │
│                                     │
├─────────────────────────────────────┤
│  Learning Speed                     │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ 🐢   │ │ 🚶  │✓│ 🏃   │       │ 3 columns
│  │ Slow │ │Medium│ │ Fast │       │
│  └──────┘ └──────┘ └──────┘       │
│                                     │
├─────────────────────────────────────┤
│  Session Length: 20 minutes         │
│  ━━━━━━━━●━━━━━━━━━━━━━━          │ Slider
│  5 min                      60 min  │
│                                     │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐ │
│  │ ⚡ Generate Lesson            │ │ Primary CTA
│  └───────────────────────────────┘ │
│                                     │
│  AI will create a custom lesson     │
│  optimized for visual learning      │ Info
│                                     │
└─────────────────────────────────────┘
```

### Interactions
- **Tap language**: Select (single choice)
- **Tap skill level**: Select (single choice)
- **Tap speed**: Select (single choice)
- **Drag slider**: Adjust session length
- **Tap generate**: Show loading → Navigate to lesson

---

## Screen 3: Lesson View (Main Learning Interface)

### Layout
```
┌─────────────────────────────────────┐
│ ◀  Section 2/5  ████░░░░ 40%    📖 │ Top Bar
│                                     │ Progress bar
├─────────────────────────────────────┤
│                                     │
│ ████████████████████████████████   │ Progress pills
│ ██████████████▓░░░░░░░░░░░░░░░░   │ (gold = done)
│                                     │
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐  │
│ │ Photosynthesis                │  │ Gesture Label
│ └───────────────────────────────┘  │ (amber/rose bg)
│                                     │
│                                     │
│                                     │
│          ╔════════════════╗         │
│          ║                ║         │
│          ║   🧍          ║         │
│          ║      👋       ║         │ Avatar Area
│          ║                ║         │ (9:16 aspect)
│          ║                ║         │
│          ║                ║         │
│          ║                ║         │
│          ║                ║         │
│          ║   Frame 15/45  ║         │
│          ╚════════════════╝         │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Plants convert light into     │  │ Subtitles
│ │ energy through chlorophyll    │  │ (black bg, blur)
│ └───────────────────────────────┘  │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ ◀  🔄  ▶▶  ⚡  ▶             │ │ Controls
│ └───────────────────────────────┘  │ (bottom bar)
│                                     │
├─────────────────────────────────────┤
│                                     │
│ ┌───────────────────────────────┐  │
│ │ 📐 Photosynthesis             │  │
│ │                               │  │
│ │ Plants use sunlight...        │  │ Content Card
│ │                               │  │ (neutral bg)
│ │ Key Points:                   │  │
│ │ • Chlorophyll importance      │  │
│ │ • Light absorption            │  │
│ └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐  │
│ │ 📷 Try It Yourself        ▶  │  │ Practice CTA
│ │ Practice with your camera     │  │ (rose gradient)
│ └───────────────────────────────┘  │
│                                     │
│ ┌──────────┐       ┌──────────┐   │
│ │◀Previous │       │Next Sect▶│   │ Navigation
│ └──────────┘       └──────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Video Player Controls (Detail)
```
┌─────────────────────────────────────┐
│ ┌───────────────────────────────┐  │
│ │ ◀    🔄    ▶▶    ⚡    ▶     │  │
│ │ Prev Replay Play Speed Next   │  │
│ │                               │  │
│ │        15 of 45               │  │ Counter
│ └───────────────────────────────┘  │
└─────────────────────────────────────┘

Speed Menu (popup):
┌─────────┐
│ 0.5x    │
│ 0.75x   │
│ 1.0x  ✓ │
│ 1.25x   │
│ 1.5x    │
└─────────┘
```

### Interactions
- **Tap video**: Pause/Play
- **Swipe left on video**: Next gesture
- **Swipe right on video**: Previous gesture
- **Tap replay**: Restart current gesture
- **Tap speed**: Show speed menu
- **Long press video**: Show context menu (future)
- **Pinch video**: Zoom (future)

---

## Screen 4: Side Menu (Lesson Overview)

### Layout (Slides from right)
```
┌─────────────────────────────────────┐
│ Lesson Overview               ✕     │ Header
├─────────────────────────────────────┤
│                                     │
│ Topic                               │
│ Photosynthesis                      │
│                                     │
├─────────────────────────────────────┤
│ Sections                            │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Section 1                    │✓│ │ Completed
│ │ Introduction to plants...     │  │
│ └───────────────────────────────┘  │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Section 2                    │▶│ │ Current
│ │ Light absorption process...   │  │ (amber border)
│ └───────────────────────────────┘  │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Section 3                    │░│ │ Locked
│ │ Chemical reactions...         │  │
│ └───────────────────────────────┘  │
│                                     │
│ ...                                 │
│                                     │
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐  │
│ │ 📥 Download Lesson            │  │
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ 📤 Share Progress             │  │
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ 🔄 Restart Section            │  │
│ └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## Screen 5: Practice Mode (Camera)

### Layout
```
┌─────────────────────────────────────┐
│ ◀ Back          Practice      ⚙️    │ Top Bar
├─────────────────────────────────────┤
│                                     │
│ ┌───────────────────────────────┐  │
│ │                               │  │
│ │      Reference Gesture        │  │ Top Half
│ │                               │  │ (CCMA avatar)
│ │         🧍                   │  │
│ │           👋                 │  │
│ │                               │  │
│ └───────────────────────────────┘  │
│                                     │
│ ┌───────────────────────────────┐  │
│ │                               │  │
│ │      Your Camera              │  │ Bottom Half
│ │                               │  │ (live feed)
│ │     [Camera View]             │  │
│ │                               │  │
│ │  ╭─────────────────────╮      │  │ Overlay
│ │  │ ✓ Left hand: 85%    │      │  │ (feedback)
│ │  │ ✗ Right hand: 62%   │      │  │
│ │  │ ✓ Body pose: 91%    │      │  │
│ │  ╰─────────────────────╯      │  │
│ └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ Overall Accuracy: 79%               │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░             │ Progress
│                                     │
│ Suggestions:                        │
│ • Raise your right hand slightly    │
│ • Slow down your movement           │
│                                     │
│ ┌──────────┐       ┌──────────┐   │
│ │🔄 Retry  │       │✓ Next    │   │ Actions
│ └──────────┘       └──────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Interactions
- **Auto-start camera**: On load
- **Real-time comparison**: Every frame
- **Haptic feedback**: On good/bad gesture
- **Tap retry**: Restart gesture
- **Tap next**: Move to next gesture

---

## Screen 6: Quiz Mode

### Layout
```
┌─────────────────────────────────────┐
│ ◀ Exit           Quiz          3/10 │ Top Bar
├─────────────────────────────────────┤
│                                     │
│ Question 3 of 10                    │
│                                     │
│ ┌───────────────────────────────┐  │
│ │                               │  │
│ │   [Sign Language Avatar]      │  │
│ │                               │  │ Gesture Display
│ │         🧍                   │  │ (no text!)
│ │           🤚                 │  │
│ │                               │  │
│ └───────────────────────────────┘  │
│                                     │
│ What does this sign mean?           │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ A. Photosynthesis             │  │ Option 1
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ B. Respiration                │  │ Option 2
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ C. Chlorophyll                │  │ Option 3
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ D. Energy                     │  │ Option 4
│ └───────────────────────────────┘  │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Submit Answer                 │  │ CTA
│ └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Feedback Screen
```
┌─────────────────────────────────────┐
│                                     │
│         ✓ Correct!                  │
│                                     │
│ The sign shown means:               │
│ Photosynthesis                      │
│                                     │
│ Remember: This gesture involves     │
│ both hands moving upward to         │
│ represent plant growth.             │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Continue                      │  │
│ └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## Screen 7: Progress Dashboard

### Layout
```
┌─────────────────────────────────────┐
│ ◀ Back        Your Progress     ⚙️  │ Top Bar
├─────────────────────────────────────┤
│                                     │
│ ┌─────────┐ ┌─────────┐ ┌────────┐│
│ │ 156     │ │ 85%     │ │ 12     ││ Stats
│ │Gestures │ │Accuracy │ │Streak  ││ (3 columns)
│ └─────────┘ └─────────┘ └────────┘│
│                                     │
├─────────────────────────────────────┤
│ Accuracy Over Time                  │
│ ┌───────────────────────────────┐  │
│ │       ╱─╲                     │  │ Chart
│ │      ╱   ╲  ╱──╲             │  │
│ │  ───╱     ╲╱    ╲──          │  │
│ │ Jan  Feb  Mar  Apr  May       │  │
│ └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ Weak Areas                          │
│ ┌───────────────────────────────┐  │
│ │ 🟡 Two-handed gestures (64%)  │  │
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ 🟡 Fast movements (68%)       │  │
│ └───────────────────────────────┘  │
│ ┌───────────────────────────────┐  │
│ │ 🟢 Basic signs (92%)          │  │
│ └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ Next Review Scheduled               │
│ 📅 Tomorrow at 10:00 AM             │
│ 5 gestures due for review           │
│                                     │
│ ┌───────────────────────────────┐  │
│ │ Practice Weak Areas           │  │ CTA
│ └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## Gesture Controls Reference

### Mobile Touch Gestures
```
Lesson View:
├─ Tap video        → Pause/Play
├─ Swipe left       → Next gesture
├─ Swipe right      → Previous gesture
├─ Pinch out        → Zoom avatar (future)
├─ Pinch in         → Zoom out (future)
└─ Long press       → Context menu (future)

Practice Mode:
├─ Camera auto-start
├─ Real-time overlay
└─ Haptic on score

Quiz Mode:
└─ Tap option → Select answer
```

---

## Accessibility Features

### Visual
- **High Contrast Mode**: Black backgrounds, white text
- **Larger Subtitles**: 125%, 150%, 175% options
- **Color Blind Mode**: Pattern overlays instead of colors
- **Focus Indicators**: Clear 4px outlines

### Motor
- **Large Touch Targets**: Minimum 44x44px
- **Gesture Alternatives**: Buttons for all swipes
- **One-Hand Mode**: Controls at bottom
- **Haptic Feedback**: Confirmation vibrations

### Cognitive
- **Simple Language**: No complex grammar
- **Visual Hierarchy**: Clear section breaks
- **Progress Indicators**: Always visible
- **Break Reminders**: After 30 minutes

---

## Responsive Breakpoints

### Mobile (Primary Target)
- **375px - 767px**: Full feature set
- Portrait orientation preferred
- Vertical video (9:16)

### Tablet
- **768px - 1023px**: 2-column layouts
- Side-by-side reference + camera

### Desktop (Bonus)
- **1024px+**: Wider content area
- Multi-panel view option

---

## Animation Guidelines

### Timing
- **Micro-interactions**: 150-200ms
- **Page transitions**: 300-400ms
- **Avatar rendering**: 33ms (30 FPS)
- **Gesture transitions**: 200ms ease-in-out

### Easing
- **UI elements**: `ease-in-out`
- **Gestures**: `linear` or custom curves
- **Haptic**: Immediate (0ms delay)

### Motion Reduction
- Respect `prefers-reduced-motion`
- Disable non-essential animations
- Keep functional animations only

---

**This wireframe system ensures a mobile-native, gesture-first, accessibility-focused experience that feels like a real native app, not a web view.**
