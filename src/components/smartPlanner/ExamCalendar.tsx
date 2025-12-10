import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { ExamEntry } from '@/mocks/studyPlanner';

interface ExamCalendarProps {
  exams: ExamEntry[];
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

export default function ExamCalendar({ exams, onDateSelect, selectedDate }: ExamCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 1)); // December 2024

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const getExamForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return exams.find(exam => exam.date === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-6 h-6 text-[#C9B458]" />
          <h3 className="text-2xl font-bold text-white">
            {monthNames[month]} {year}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-bold text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const exam = getExamForDate(day);
          const today = isToday(day);
          const selected = isSelected(day);
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          return (
            <motion.button
              key={day}
              onClick={() => onDateSelect(dateStr)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                aspect-square rounded-xl p-2 relative transition-all
                ${exam ? 'border-2' : 'border border-white/10'}
                ${today ? 'ring-2 ring-[#C9B458] ring-offset-2 ring-offset-[#0F1115]' : ''}
                ${selected ? 'bg-white/20' : 'bg-white/5'}
                ${exam ? `hover:shadow-lg` : 'hover:bg-white/10'}
              `}
              style={{
                borderColor: exam ? exam.color : undefined,
                boxShadow: exam ? `0 0 20px ${exam.color}40` : undefined,
              }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className={`text-sm font-bold ${exam ? 'text-white' : 'text-gray-300'}`}>
                  {day}
                </span>
                {exam && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: exam.color }}
                    />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 mb-3 font-semibold">EXAM SUBJECTS</p>
        <div className="flex flex-wrap gap-2">
          {exams.map(exam => (
            <div
              key={exam.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: exam.color }}
              />
              <span className="text-xs font-medium text-white">{exam.subject}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
