import React, { useState } from 'react';
import type { Project } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import LayoutDashboardIcon from './icons/LayoutDashboardIcon';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onAddProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  onAddProject,
  onDeleteProject,
}) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      onAddProject(newProjectName.trim());
      setNewProjectName('');
      setIsAdding(false);
    }
  };

  return (
    <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50 flex flex-col p-4">
      <h1 className="text-2xl font-bold text-white mb-6">ProjectFlow</h1>
      <div className="mb-4">
        <button
            onClick={() => onSelectProject(null)}
            className={`w-full flex items-center px-3 py-2 rounded-md transition-colors text-sm font-semibold ${
            !selectedProjectId
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
        >
            <LayoutDashboardIcon className="w-4 h-4 mr-3" />
            Dashboard
        </button>
      </div>
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Projects</h2>
      <ul className="flex-1 space-y-2 overflow-y-auto">
        {projects.map(project => (
          <li key={project.id} className="group flex items-center">
            <button
              onClick={() => onSelectProject(project.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                selectedProjectId === project.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {project.name}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
                   onDeleteProject(project.id);
                }
              }}
              className="ml-2 p-1 text-slate-500 rounded-md opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-slate-700 transition-opacity"
              aria-label={`Delete ${project.name}`}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {isAdding ? (
          <div className="space-y-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="New project name"
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-md text-sm border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAddProject()}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsAdding(false)} className="px-3 py-1 text-xs rounded-md text-slate-300 hover:bg-slate-700">Cancel</button>
              <button onClick={handleAddProject} className="px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Add</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center px-3 py-2 rounded-md text-sm text-slate-300 bg-slate-700/50 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            New Project
          </button>
        )}
      </div>
    </aside>
  );
};

export default ProjectSelector;