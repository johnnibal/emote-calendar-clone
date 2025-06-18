
import { getMonthGrid, fmt } from '../lib/date';
import { useCalendarStore } from '../store/useCalendarStore';
import { EventBlock } from './EventBlock';

interface Props {
  date: Date;
  onSlotSelect: (d: Date) => void;
}

export function MonthView({ date, onSlotSelect }: Props) {
  const weeks = getMonthGrid(date);
  const events = useCalendarStore((s) => s.events);

  return (
    <div className="border-t">
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7">
          {week.map((d) => (
            <div key={d.toDateString()} className="border-r border-b h-32 p-1 relative">
              <div className="text-xs">{fmt(d, 'd')}</div>
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
      ))}
    </div>
  );
}
