// src/components/MiniDateNavigator.tsx
import * as React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



type MiniDateNavigatorProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onPrev: () => void;
  onNext: () => void;
};

export function MiniDateNavigator({ selectedDate, onDateChange, onPrev, onNext }: MiniDateNavigatorProps) {
  return (
    <div className="calendar-container" style={{ marginRight: '8px' }}>
      <div className="dates-row">
        <Calendar
          value={selectedDate}
          onChange={(date) => onDateChange(date as Date)}
          calendarType="gregory"
          tileClassName={({ date }) =>
            date.toDateString() === selectedDate.toDateString() ? 'selected-day' : ''
          }
          formatMonthYear={(_, date) =>
    date.toLocaleString('default', { month: 'short', year: 'numeric' })
  }
        />
      </div>
    </div>
  );
};
