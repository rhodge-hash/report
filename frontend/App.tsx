import React, { useMemo } from 'react';
import { type Project, type Task, TaskStatus } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import ProjectSelector from './components/ProjectSelector';
import KanbanBoard from './components/KanbanBoard';
import Dashboard from './components/Dashboard';
import { KANBAN_COLUMNS } from './constants';

const App: React.FC = () => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', [
    {
      id: 'proj-1',
      name: 'Website Redesign',
      tasks: [
        { id: 'task-1', title: 'Design new homepage', description: 'Create mockups in Figma.', status: TaskStatus.Done, imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
        { id: 'task-2', title: 'Develop homepage components', description: 'Use React and Tailwind.', status: TaskStatus.InProgress },
        { id: 'task-3', title: 'Setup CI/CD pipeline', description: 'Use GitHub Actions.', status: TaskStatus.ToDo },
        { id: 'task-4', title: 'Write user documentation', description: 'For all new components.', status: TaskStatus.ToDo },
      ],
    },
    {
      id: 'proj-2',
      name: 'Mobile App Launch',
      tasks: [
        { id: 'task-5', title: 'Plan marketing campaign', description: '', status: TaskStatus.InProgress },
        { id: 'task-6', title: 'Finalize app store screenshots', description: '', status: TaskStatus.ToDo },
      ],
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useLocalStorage<string | null>('selectedProjectId', projects[0]?.id || null);

  const selectedProject = useMemo(() => {
    return projects.find(p => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  const handleAddProject = (name: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      tasks: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    setSelectedProjectId(newProject.id);
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    if (selectedProjectId === projectId) {
      setSelectedProjectId(updatedProjects[0]?.id || null);
    }
  };

  const updateProjectTasks = (projectId: string, tasks: Task[]) => {
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId ? { ...p, tasks } : p
      )
    );
  };

  const handleAddTask = (title: string, description: string, status: TaskStatus, imageUrl?: string) => {
    if (!selectedProject) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      status,
      imageUrl,
    };
    const updatedTasks = [...selectedProject.tasks, newTask];
    updateProjectTasks(selectedProject.id, updatedTasks);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    if (!selectedProject) return;
    const updatedTasks = selectedProject.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    updateProjectTasks(selectedProject.id, updatedTasks);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!selectedProject) return;
    const updatedTasks = selectedProject.tasks.filter(task => task.id !== taskId);
    updateProjectTasks(selectedProject.id, updatedTasks);
  };

  return (
    <div className="flex h-screen font-sans bg-slate-900 text-slate-100">
      <ProjectSelector
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {selectedProject ? (
          <KanbanBoard
            key={selectedProject.id}
            project={selectedProject}
            columns={KANBAN_COLUMNS}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <Dashboard projects={projects} onSelectProject={setSelectedProjectId} />
        )}
      </main>
    </div>
  );
};

export default App;