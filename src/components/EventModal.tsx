
import { Dialog } from '@headlessui/react';
import { useCalendarStore } from '../store/useCalendarStore';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import './EventModal.css';

interface Props {
  open: boolean;
  onClose: () => void;
  initialDate: Date | null;
}

export function EventModal({ open, onClose, initialDate }: Props) {
  const addEvent = useCalendarStore((s) => s.addEvent);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      start: initialDate ? initialDate.toISOString().slice(0, 16) : '',
      end: initialDate ? initialDate.toISOString().slice(0, 16) : '',
      description: '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    addEvent({
      id: uuid(),
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
      description: values.description,
    });
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 grid place-items-center bg-black/20">
      <Dialog.Panel className="w-80 bg-white dark:bg-zinc-800 p-4 rounded shadow">
        <Dialog.Title className="mb-2 font-medium">Add Event</Dialog.Title>
        <form className="space-y-2" onSubmit={onSubmit}>
          <input
            {...register('title', { required: true })}
            placeholder="Title"
            className="w-full border p-1 rounded"
          />
          <input type="datetime-local" {...register('start', { required: true })} className="w-full border p-1 rounded"/>
          <input type="datetime-local" {...register('end', { required: true })} className="w-full border p-1 rounded" />
          <textarea {...register('description')} placeholder="Description" className="w-full border p-1 rounded" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-1">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full transition duration-200 hover:bg-blue-600 hover:bg-opacity-80">
              Save
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
