import React from 'react';
import { TaskStatus } from '../types';
import { KANBAN_COLUMNS } from '../constants';

interface OverallStatusChartProps {
  stats: {
    [TaskStatus.ToDo]: number;
    [TaskStatus.InProgress]: number;
    [TaskStatus.Done]: number;
    total: number;
  };
}

const STATUS_COLORS: Record<TaskStatus, string> = {
    [TaskStatus.ToDo]: 'bg-sky-500',
    [TaskStatus.InProgress]: 'bg-amber-500',
    [TaskStatus.Done]: 'bg-emerald-500',
};

const OverallStatusChart: React.FC<OverallStatusChartProps> = ({ stats }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Overall Task Distribution</h3>
      <div className="flex w-full h-8 bg-slate-700 rounded-full overflow-hidden">
        {KANBAN_COLUMNS.map(col => {
          const count = stats[col.id];
          if (count === 0) return null;
          const width = stats.total > 0 ? (count / stats.total) * 100 : 0;
          return (
            <div
              key={col.id}
              className={`h-full ${STATUS_COLORS[col.id]} transition-all duration-500 ease-out`}
              style={{ width: `${width}%` }}
              title={`${col.title}: ${count} task${count === 1 ? '' : 's'}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
        {KANBAN_COLUMNS.map(col => (
          <div key={col.id} className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${STATUS_COLORS[col.id]}`}></span>
            <span>{col.title}: <strong>{stats[col.id]}</strong></span>
          </div>
        ))}
         <div className="font-bold text-slate-300">Total: <strong>{stats.total}</strong></div>
      </div>
    </div>
  );
};

export default OverallStatusChart;
