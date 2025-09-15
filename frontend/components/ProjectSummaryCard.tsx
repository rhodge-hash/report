import React, { useMemo } from 'react';
import type { Project } from '../types';
import { TaskStatus } from '../types';
import DonutChart from './DonutChart';

interface ProjectSummaryCardProps {
    project: Project;
    onSelectProject: (id: string) => void;
}

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ project, onSelectProject }) => {

    const projectStats = useMemo(() => {
        const stats = {
            [TaskStatus.ToDo]: 0,
            [TaskStatus.InProgress]: 0,
            [TaskStatus.Done]: 0,
        };
        project.tasks.forEach(t => {
            stats[t.status]++;
        });
        return stats;
    }, [project.tasks]);

    const totalTasks = project.tasks.length;
    
    const chartData = [
        // FIX: Use bracket notation to access properties on projectStats for consistency and to handle kebab-case keys.
        { status: TaskStatus.Done, count: projectStats[TaskStatus.Done] },
        { status: TaskStatus.InProgress, count: projectStats[TaskStatus.InProgress] },
        { status: TaskStatus.ToDo, count: projectStats[TaskStatus.ToDo] },
    ];

    return (
        <div 
            onClick={() => onSelectProject(project.id)}
            className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 cursor-pointer transition-all duration-300 ease-out hover:border-indigo-500/80 hover:shadow-2xl hover:shadow-indigo-900/50"
            style={{ transformStyle: 'preserve-3d' }}
        >
           <div className="transition-transform duration-300 ease-out group-hover:transform group-hover:-translate-y-1 group-hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white truncate">{project.name}</h3>
                        <p className="text-sm text-slate-400">{totalTasks} task{totalTasks === 1 ? '' : 's'}</p>
                    </div>
                    <div className="w-20 h-20 flex-shrink-0 ml-4">
                        <DonutChart data={chartData} total={totalTasks} />
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50 text-xs text-slate-400 flex justify-between">
                   {/* FIX: Use bracket notation to access properties on projectStats for consistency and to handle kebab-case keys. */}
                   <span>To Do: {projectStats[TaskStatus.ToDo]}</span>
                   <span>In Progress: {projectStats[TaskStatus.InProgress]}</span>
                   <span>Done: {projectStats[TaskStatus.Done]}</span>
                </div>
            </div>
        </div>
    );
}

export default ProjectSummaryCard;