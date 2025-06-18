
import { useCalendarStore } from '../store/useCalendarStore';
import { EventBlock } from './EventBlock';
import { fmt } from '../lib/date';

interface Props {
  date: Date;
  onSlotSelect: (d: Date) => void;
}

export function DayView({ date, onSlotSelect }: Props) {
  const events = useCalendarStore((s) => s.events.filter(
    (e) => e.start.toDateString() === date.toDateString()
  ));

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-2">{fmt(date, 'EEEE, MMM d')}</h2>
      <div className="border rounded h-96 relative">
        {events.map((ev) => (
          <div key={ev.id} className="absolute top-2 left-2 right-2">
            <EventBlock event={ev} />
          </div>
        ))}
        <button className="absolute inset-0" onClick={() => onSlotSelect(date)} aria-label="add event"/>
      </div>
    </div>
  );
}
