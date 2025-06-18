
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';

type View = 'month' | 'week' | 'day';

interface Props {
  view: View;
  setView: (v: View) => void;
  activeDate: Date;
  setActiveDate: (d: Date) => void;
}

export function CalendarHeader({ view, setView, activeDate, setActiveDate }: Props) {
  const goToday = () => setActiveDate(new Date());

  const nav = (dir: 1 | -1) => {
    const op = {
      month: dir === 1 ? addMonths : subMonths,
      week: dir === 1 ? addWeeks : subWeeks,
      day: dir === 1 ? addDays : subDays,
    }[view];
    setActiveDate(op(activeDate, 1));
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white dark:bg-zinc-800">
      <div className="flex gap-2">
        <button onClick={() => nav(-1)}>&lt;</button>
        <button onClick={goToday}>Today</button>
        <button onClick={() => nav(1)}>&gt;</button>
      </div>
      <h1 className="font-semibold">
        {activeDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
      </h1>
      <div className="flex gap-2">
        {(['month', 'week', 'day'] as const).map((v) => (
          <button
            key={v}
            className={view === v ? 'font-bold underline' : ''}
            onClick={() => setView(v)}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </header>
  );
}
