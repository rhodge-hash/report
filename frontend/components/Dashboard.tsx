import React, { useMemo } from 'react';
import type { Project } from '../types';
import { TaskStatus } from '../types';
import OverallStatusChart from './OverallStatusChart';
import ProjectSummaryCard from './ProjectSummaryCard';

interface DashboardProps {
    projects: Project[];
    onSelectProject: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ projects, onSelectProject }) => {

    const overallStats = useMemo(() => {
        const stats = {
            [TaskStatus.ToDo]: 0,
            [TaskStatus.InProgress]: 0,
            [TaskStatus.Done]: 0,
            total: 0,
        };
        projects.forEach(p => {
            p.tasks.forEach(t => {
                stats[t.status]++;
                stats.total++;
            });
        });
        return stats;
    }, [projects]);

    return (
        <div className="flex-1 flex flex-col p-6 lg:p-8 overflow-y-auto bg-grid-slate-700/[0.05]">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-1">A high-level overview of all your projects.</p>
            </header>

            <div className="mb-8">
                <OverallStatusChart stats={overallStats} />
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Projects Status</h2>
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <ProjectSummaryCard 
                                key={project.id} 
                                project={project}
                                onSelectProject={onSelectProject} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-800/30 rounded-lg">
                        <h3 className="text-xl font-semibold text-slate-400">No Projects Found</h3>
                        <p className="mt-2 text-slate-500">Create your first project to see it here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
