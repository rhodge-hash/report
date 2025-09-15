import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import Modal from './Modal';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onAddTask: (title: string, description: string, status: TaskStatus, imageUrl?: string) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  title,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskImageUrl, setTaskImageUrl] = useState<string | undefined>(undefined);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTaskImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskImageUrl(undefined);
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim(), taskDescription.trim(), status, taskImageUrl);
      setIsModalOpen(false);
      resetForm();
    }
  };

  return (
    <>
      <div
        className="bg-slate-800/50 rounded-lg p-4 flex flex-col h-full"
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
      >
        <header className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-sm text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">{tasks.length}</span>
        </header>
        <div className="flex-1 overflow-y-auto space-y-3 -mr-2 pr-2">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onDragStart={onDragStart}
            />
          ))}
        </div>
        <footer className="mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center p-2 rounded-md text-sm text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </footer>
      </div>

      {/* FIX: Added the required 'title' prop to the Modal component. */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title="Add New Task">
        <div className="space-y-4">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input
              id="task-title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g., Implement user authentication"
            />
          </div>
          <div>
            <label htmlFor="task-description" className="block text-sm font-medium text-slate-300 mb-1">Description (optional)</label>
            <textarea
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              rows={4}
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Add more details about the task..."
            />
          </div>
           <div>
            <label htmlFor="task-image" className="block text-sm font-medium text-slate-300 mb-1">Image (optional)</label>
            <input
              id="task-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600"
            />
            {taskImageUrl && (
                <div className="mt-2">
                    <img src={taskImageUrl} alt="Preview" className="w-full h-auto rounded-md max-h-40 object-cover" />
                    <button onClick={() => setTaskImageUrl(undefined)} className="mt-1 text-xs text-red-400 hover:text-red-300">Remove image</button>
                </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button onClick={() => { setIsModalOpen(false); resetForm(); }} variant="secondary">Cancel</Button>
            <Button onClick={handleAddTask} variant="primary">Add Task</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default KanbanColumn;