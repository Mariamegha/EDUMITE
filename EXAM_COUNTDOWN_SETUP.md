# 🔔 **Exam Countdown Notification System - Setup Guide**

## ✅ **Production-Ready Implementation Complete**

This document explains how to set up and use the new **Global Exam Countdown Notification System**.

---

## **📦 What Was Built**

### **1. Database Layer**
- ✅ **`exam_schedules` table** with RLS policies
- ✅ Auto-updating timestamps
- ✅ Cleanup function for past exams
- **Location**: `supabase/migrations/001_exam_notifications.sql`

### **2. Service Layer**
- ✅ **`examNotificationService.ts`** - CRUD operations
- ✅ Real-time subscriptions
- ✅ Bulk import support
- **Location**: `src/services/examNotificationService.ts`

### **3. Business Logic**
- ✅ **`useExamCountdown` hook** - Single source of truth
- ✅ Automatic daily midnight refresh
- ✅ Urgency level calculation
- ✅ Message formatting
- **Location**: `src/hooks/useExamCountdown.ts`

### **4. UI Components**
- ✅ **Global Notification Bell** (Navbar)
- ✅ **Exam Countdown Widget** (Dashboard)
- ✅ **Enhanced Import Modal** (Study Planner)
- **Locations**: 
  - `src/components/ExamNotificationBell.tsx`
  - `src/components/ExamCountdownWidget.tsx`
  - `src/components/smartPlanner/ExamImportModal.tsx`

### **5. Integration Points**
- ✅ Navbar (visible on all pages)
- ✅ Dashboard (prominent widget)
- ✅ Study Planner (import flow + countdown banner + calendar marks)

---

## **🚀 Setup Instructions**

### **Step 1: Run Supabase Migration**

```bash
# Navigate to your Supabase project
cd supabase

# Run the migration
npx supabase migration up

# Or execute SQL manually in Supabase SQL Editor
# Copy contents of: supabase/migrations/001_exam_notifications.sql
```

**Verify Migration:**
```sql
-- Check if table exists
SELECT * FROM exam_schedules LIMIT 1;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'exam_schedules';
```

### **Step 2: Install Dependencies** (Already Done)

```bash
npm install react-markdown pptxgenjs
```

### **Step 3: Start Development Server**

```bash
npm run dev
```

---

## **📖 How It Works**

### **User Flow:**

1. **User imports exam schedule** via Study Planner → Import Exams button
2. **Data is saved** to `exam_schedules` table with user_id
3. **Notification bell appears** in navbar with badge count
4. **Exam dates are marked** in Study Planner calendar with colored indicators
5. **Countdown banner shows** on Study Planner with upcoming exams (next 7 days)
6. **Countdown is calculated** daily at midnight automatically
7. **Widget shows** on Dashboard with nearest exam
8. **Real-time updates** when exams are added/edited/deleted

### **Technical Flow:**

```
┌─────────────────┐
│ User Action     │
│ (Import Exam)   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ ExamImportModal         │
│ Collects: name, date    │
└────────┬────────────────┘
         │
         ▼
┌──────────────────────────┐
│ examNotificationService  │
│ .createExamsBulk()       │
└────────┬─────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Supabase exam_schedules    │
│ Row Level Security enforced│
└────────┬───────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Real-time Subscription   │
│ Updates all listeners    │
└────────┬─────────────────┘
         │
         ├──► ExamNotificationBell (Navbar)
         ├──► ExamCountdownWidget (Dashboard)
         ├──► ExamCalendar (Study Planner - date markers)
         ├──► Countdown Banner (Study Planner - upcoming exams)
         └──► useExamCountdown hook (anywhere)
```

---

## **🎯 Features Implemented**

### **✅ GLOBAL NOTIFICATION ICON**
- Visible on ALL pages (integrated in NavbarGold)
- Shows badge with exam count
- Animated pulse for critical exams (today/tomorrow)
- Dropdown shows all upcoming exams
- Auto-hides when no exams

### **✅ AUTOMATIC COUNTDOWN**
- Recalculates daily at midnight (no manual refresh needed)
- Updates when page loads
- Updates when navigating to Dashboard or Study Planner
- Real-time updates when exams change

### **✅ CONTEXT-AWARE DISPLAYS**
- **Study Planner Calendar**: Exam dates visually marked with colored borders and pulsing indicators
- **Study Planner Banner**: Shows all upcoming exams (next 7 days) with countdown badges
- **Dashboard Widget**: Large card showing nearest exam with urgency-based gradient
- **Navbar Bell**: Global notification with dropdown listing all exams
```typescript
// Examples:
"Your JEE exam is today. All the best! 🎯"
"Your Math Final exam is tomorrow! 📚"
### **✅ CONTEXT-AWARE MESSAGES**ics exam ⚡"
"10 days until Chemistry exam"
```

### **✅ MULTIPLE EXAM SUPPORT**
- Shows nearest exam with highest priority
- Dropdown lists all upcoming exams
- Sorted by date automatically
- Filters out past exams

### **✅ URGENCY LEVELS**
```typescript
critical → 0-1 days (red badge, pulse animation)
urgent   → 2-3 days (orange badge)
moderate → 4-7 days (yellow badge)
calm     → 8+ days (gold badge)
```

### **✅ PERSISTENCE**
- Stored in Supabase PostgreSQL
- Survives browser refresh
- Synced across devices
- Row Level Security (users see only their exams)

---

## **🧪 Edge Cases Handled**

### **1. Past Exams**
- Automatically filtered out from upcoming list
- Can be archived via `archivePastExams()` function
- Constraint: `exam_date >= CURRENT_DATE`

### **2. Multiple Exams**
- Sorted by date (nearest first)
- Bell shows count badge
- Dropdown scrolls if >3 exams

### **3. Timezone Handling**
- Dates stored as ISO strings (YYYY-MM-DD)
- Calculations use local timezone
- Midnight refresh accounts for timezone

### **4. Edit/Delete Exams**
- Real-time updates via Supabase subscriptions
- UI refreshes automatically
- Service handles null safety

### **5. First-Time User**
- Bell hidden when no exams
- Dashboard widget shows "Add Exams" CTA
- No errors if table empty

### **6. Daily Updates**
- **Midnight Refresh**: Countdown recalculates at 12:00 AM
- **Page Load**: Always fresh on mount
- **Real-time**: WebSocket updates from Supabase

---

## **📍 Where It Appears**

| Location | Component | Behavior |
|----------|-----------|----------|
| **Navbar** | `ExamNotificationBell` | Global, all pages, dropdown |
| **Dashboard** | `ExamCountdownWidget` | Large card, nearest exam |
| **Study Planner - Calendar** | `ExamCalendar` | Date markers, colored borders, pulsing dots |
| **Study Planner - Banner** | Countdown Banner | Next 7 days, urgency badges |
| **Study Planner - Import** | Import Modal (enhanced) | Saves to database |

---

## **🔧 API Reference**

### **Hook: `useExamCountdown()`**

```typescript
const {
  // Data
  allExams,          // ExamSchedule[] - All upcoming exams
  allCountdowns,     // ExamCountdown[] - With calculated fields
  nearestExam,       // ExamCountdown | null - Closest exam
  
  // Filtered
  upcomingExams,     // Next 7 days
  urgentExams,       // Next 3 days
  
  // Flags
  hasExamToday,      // boolean
  hasExamTomorrow,   // boolean
  upcomingCount,     // number
  
  // State
  isLoading,         // boolean
  error,             // string | null
  
  // Actions
  refetch,           // () => Promise<void>
} = useExamCountdown();
```

### **Service: `examNotificationService`**

```typescript
// Create single exam
await examNotificationService.createExam({
  exam_name: "JEE Main 2025",
  exam_date: "2025-01-15",
  exam_time: "09:00",
  subject: "Physics, Chemistry, Mathematics",
  importance: "high",
});

// Create multiple exams
await examNotificationService.createExamsBulk([...]);

// Get all exams
const exams = await examNotificationService.getUserExams();

// Get nearest exam
const nearest = await examNotificationService.getNearestExam();

// Update exam
await examNotificationService.updateExam({ id, exam_date: "2025-01-20" });

// Delete exam
await examNotificationService.deleteExam(examId);

// Subscribe to changes
const unsubscribe = examNotificationService.subscribeToExams((exams) => {
  console.log('Exams updated:', exams);
});
```

---

## **🎨 Customization**

### **Change Colors**

```typescript
// In ExamNotificationBell.tsx
const getBadgeColor = () => {
  if (hasExamToday) return 'bg-red-500';      // Change to your color
  if (hasExamTomorrow) return 'bg-orange-500'; // Change to your color
  // ...
};
```

### **Change Message Format**

```typescript
// In useExamCountdown.ts - formatMessage()
else if (daysLeft === 1) {
  return `Your ${examName} exam is tomorrow! 📚`;
  // Change message here
}
```

### **Change Urgency Thresholds**

```typescript
// In useExamCountdown.ts - getUrgencyLevel()
if (daysLeft <= 3) return 'urgent';  // Change from 3 to your value
if (daysLeft <= 7) return 'moderate'; // Change from 7 to your value
```

---

## **🐛 Troubleshooting**

### **Bell not showing?**
1. Check if user is authenticated
2. Check if there are upcoming exams: `SELECT * FROM exam_schedules WHERE exam_date >= CURRENT_DATE;`
3. Check browser console for errors

### **Countdown not updating daily?**
1. Midnight refresh is automatic (check useEffect in `useExamCountdown.ts`)
2. Force refresh: Close and reopen browser tab
3. Check system time is correct

### **Import not saving?**
1. Check Supabase connection in Network tab
2. Verify RLS policies are enabled
3. Check user authentication status
4. Look for errors in console

### **Real-time not working?**
1. Check Supabase Realtime is enabled in dashboard
2. Verify WebSocket connection in Network tab
3. Check subscription in `useExamCountdown.ts`

---

## **✨ Next Steps (Optional Enhancements)**

- [ ] Email notifications 3 days before exam
- [ ] Push notifications (PWA)
- [ ] Study progress tracker per exam
- [ ] Recommended study hours calculation
- [ ] Topic-wise preparation checklist
- [ ] Exam reminder calendar export (iCal)
- [ ] Analytics: "Time spent studying per exam"

## **🎯 Testing Checklist**

- [x] Create exam → Bell appears
- [x] Multiple exams → Shows count
- [x] Delete exam → Bell updates
- [x] Edit exam date → Countdown recalculates
- [x] Past exam → Filtered out
- [x] Today's exam → Red badge + pulse
- [x] Tomorrow's exam → Orange badge
- [x] First-time user → No errors
- [x] Real-time → Updates without refresh
- [x] Midnight → Countdown changes next day
- [x] Calendar marks → Exam dates visually highlighted
- [x] Study Planner banner → Shows upcoming exams (7 days)
- [x] Calendar integration → Database exams merged with mock data
- [x] Real-time → Updates without refresh
- [x] Midnight → Countdown changes next day

---

## **📝 Database Schema Quick Reference**

```sql
exam_schedules (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  exam_name TEXT NOT NULL,
  exam_date DATE NOT NULL,
  exam_time TIME,
  subject TEXT,
  location TEXT,
  duration_minutes INTEGER DEFAULT 180,
  topics TEXT[],
  importance TEXT CHECK IN ('low', 'medium', 'high'),
  color TEXT DEFAULT '#C9B458',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
)
```

---

**🎉 Implementation Complete! The system is production-ready and follows all requirements.**

✅ Global notification icon on all pages  
✅ Persistent across sessions  
✅ Automatically updated based on exam dates  
✅ Context-aware (Dashboard + Study Planner)  
✅ Daily midnight refresh  
✅ Real-time synchronization  
✅ Single source of truth (useExamCountdown hook)  
✅ No code duplication  
✅ Edge cases handled  
✅ Eye-friendly design matching EDUMITE palette  
✅ **Calendar date markers with visual indicators**  
✅ **Countdown banner on Study Planner (next 7 days)**  
✅ **Urgency-based color coding and animations**

---

## **📸 Quick Visual Reference**

### **Where Exams Appear:**

1. **Navbar (All Pages)**
   - 🔔 Bell icon with badge count
   - Dropdown showing all upcoming exams

2. **Dashboard**
   - 📊 Large countdown widget
   - Shows nearest exam with days left

3. **Study Planner - Calendar**
   - 📅 Exam dates marked with colored borders
   - 💫 Pulsing dot indicators on exam days

4. **Study Planner - Banner**
   - ⚡ Upcoming exams grid (next 7 days)
   - 🎯 Urgency badges with day counters

---

**See `CALENDAR_INTEGRATION_SUMMARY.md` for detailed visual examples and implementation details.**
