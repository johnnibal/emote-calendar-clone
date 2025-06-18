import { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { EventModal } from './EventModal';
import { MiniDateNavigator } from './MiniDateNavigator';
import './mini-calendar.css'; // ← Optional, for styling overrides

export function CalendarShell() {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [activeDate, setActiveDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState<Date | null>(null);

  const View = view === 'month' ? MonthView : view === 'week' ? WeekView : DayView;

  return (
    <div className="flex h-screen">
      {/* Sidebar with Mini Calendar */}
      <aside className="w-64 p-4 bg-gray-50 border-r border-gray-200">
        <MiniDateNavigator
  selectedDate={activeDate}
  onDateChange={(date) => {
    setActiveDate(date); // jump to that day
    setView('day');      // immediately show the Day view
  }}
  onPrev={() => {}}
  onNext={() => {}}
/>
      </aside>

      {/* Main Calendar View */}
      <main className="flex-1">
        <CalendarHeader
          view={view}
          setView={setView}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
        />
        <View
          date={activeDate}
          onSlotSelect={(d) => {
            setSlot(d);
            setOpen(true);
          }}
        />
        <EventModal open={open} onClose={() => setOpen(false)} initialDate={slot} />
      </main>
    </div>
  );
}
