
import { CalendarEvent } from '../store/useCalendarStore';

interface Props {
  event: CalendarEvent;
  onClick?: () => void;
}

export function EventBlock({ event, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="
        border-l-4 border-[#7b84d3]        /* ← left‑hand accent bar */
        bg-[#7b84d3]/15                    /* 15 % tint for the fill */
        rounded px-1 py-px text-xs
        cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis
        hover:bg-[#7b84d3]/25 transition
      "
      title={event.title}
    >
      {event.title}
    </div>
  );
}
