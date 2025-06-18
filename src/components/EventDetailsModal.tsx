import * as React from 'react';
import { Dialog } from '@headlessui/react';

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: {
    title: string;
    start: Date;
    end: Date;
    description?: string;
  } | null;
}

export function EventDetailsModal({ open, onClose, event }: EventDetailsModalProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 grid place-items-center bg-black/20 z-50">
      <Dialog.Panel className="w-80 bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <Dialog.Title className="mb-2 font-medium">{event.title}</Dialog.Title>
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <b>Start:</b> {event.start.toLocaleString()}
          </div>
          <div>
            <b>End:</b> {event.end.toLocaleString()}
          </div>
        </div>
        {event.description && (
          <div className="mb-2">
            <b>Description:</b> {event.description}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Close
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}