import React, { useState } from 'react';
import type { Task } from '../types';
import TrashIcon from './icons/TrashIcon';
import Modal from './Modal';
import Button from './Button';

interface TaskCardProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask, onDeleteTask, onDragStart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedImageUrl, setEditedImageUrl] = useState(task.imageUrl);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (editedTitle.trim()) {
      onUpdateTask({ ...task, title: editedTitle.trim(), description: editedDescription.trim(), imageUrl: editedImageUrl });
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedImageUrl(task.imageUrl);
    setIsModalOpen(true);
  }

  return (
    <>
      <div
        draggable
        onDragStart={(e) => onDragStart(e, task.id)}
        className="bg-slate-900 p-3 rounded-lg border border-slate-700 hover:border-indigo-500 cursor-pointer group transition-all"
        onClick={openModal}
      >
        <div className="flex justify-between items-start">
          <p className="text-sm text-slate-200 font-medium break-words w-full pr-2">{task.title}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
                onDeleteTask(task.id);
              }
            }}
            className="flex-shrink-0 p-1 text-slate-500 rounded-md opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-slate-700/50 transition-opacity"
            aria-label={`Delete task ${task.title}`}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
        {task.imageUrl && (
            <img src={task.imageUrl} alt={task.title} className="mt-2 w-full h-24 object-cover rounded" />
        )}
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Task">
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-task-title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input
              id="edit-task-title"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="edit-task-description" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              id="edit-task-description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={4}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
           <div>
            <label htmlFor="edit-task-image" className="block text-sm font-medium text-slate-300 mb-1">Image</label>
            <input
              id="edit-task-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600"
            />
            {editedImageUrl && (
                <div className="mt-2">
                    <img src={editedImageUrl} alt="Preview" className="w-full h-auto rounded-md max-h-48 object-cover" />
                    <button onClick={() => setEditedImageUrl(undefined)} className="mt-1 text-xs text-red-400 hover:text-red-300">Remove image</button>
                </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={() => setIsModalOpen(false)} variant="secondary">Cancel</Button>
            <Button onClick={handleUpdate} variant="primary">Save Changes</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskCard;