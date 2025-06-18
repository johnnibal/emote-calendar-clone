import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
};

interface CalendarState {
  events: CalendarEvent[];
  addEvent: (e: CalendarEvent) => void;
  updateEvent: (e: CalendarEvent) => void;
  removeEvent: (id: string) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (e) => set((s) => ({ events: [...s.events, e] })),
      updateEvent: (e) =>
        set((s) => ({ events: s.events.map((ev) => (ev.id === e.id ? e : ev)) })),
      removeEvent: (id) =>
        set((s) => ({ events: s.events.filter((ev) => ev.id !== id) })),
    }),
    {
      name: 'emote-calendar',
      storage: createJSONStorage(() => localStorage, {
        // Convert ISO strings back to Date
        reviver: (key, value) => {
          if (key === 'start' || key === 'end') return new Date(value);
          return value;
        },
      }),
    }
  )
);
