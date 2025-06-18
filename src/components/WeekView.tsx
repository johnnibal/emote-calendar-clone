
import { getWeek, fmt } from '../lib/date';
import { useCalendarStore } from '../store/useCalendarStore';
import { EventBlock } from './EventBlock';

interface Props {
  date: Date;
  onSlotSelect: (d: Date) => void;
}

export function WeekView({ date, onSlotSelect }: Props) {
  const days = getWeek(date);
  const events = useCalendarStore((s) => s.events);

  return (
    <div className="grid grid-cols-7 border-t">
      {days.map((d) => (
        <div key={d.toDateString()} className="h-48 border-r relative p-1">
          <div className="text-xs text-center mb-1">{fmt(d, 'EEE d')}</div>
          {events
            .filter((e) => e.start.toDateString() === d.toDateString())
            .map((e) => (
              <EventBlock key={e.id} event={e} />
            ))}
          <button
            className="absolute inset-0"
            aria-label="add event"
            onClick={() => onSlotSelect(d)}
          />
        </div>
      ))}
    </div>
  );
}
