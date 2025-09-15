import React, { useState } from 'react';
import type { Project, Task, TaskStatus } from '../types';
import KanbanColumn from './KanbanColumn';
import AiReportGenerator from './AiReportGenerator';

interface KanbanBoardProps {
  project: Project;
  columns: { id: TaskStatus; title: string }[];
  onAddTask: (title: string, description: string, status: TaskStatus, imageUrl?: string) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ project, columns, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: TaskStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    const taskToMove = project.tasks.find(t => t.id === draggedTaskId);
    if (taskToMove && taskToMove.status !== status) {
      onUpdateTask({ ...taskToMove, status });
    }
    setDraggedTaskId(null);
  };
  
  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">{project.name}</h1>
        <AiReportGenerator project={project} />
      </header>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            status={column.id}
            title={column.title}
            tasks={project.tasks.filter(task => task.status === column.id)}
            onAddTask={onAddTask}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;