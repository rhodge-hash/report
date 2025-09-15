import React from 'react';
import { TaskStatus } from '../types';

interface DonutChartProps {
    data: { status: TaskStatus; count: number }[];
    total: number;
}

const STATUS_COLORS: Record<TaskStatus, string> = {
    [TaskStatus.ToDo]: '#38bdf8', // sky-400
    [TaskStatus.InProgress]: '#f59e0b', // amber-500
    [TaskStatus.Done]: '#10b981', // emerald-500
};

const DonutChart: React.FC<DonutChartProps> = ({ data, total }) => {
    const radius = 35;
    const strokeWidth = 10;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke="#475569" // slate-600
                strokeWidth={strokeWidth}
            />
            {total > 0 && data.map(({ status, count }) => {
                const percentage = count / total;
                const dashoffset = circumference * (1 - percentage);
                const rotation = (offset / total) * 360;
                
                offset += count;

                return (
                    <circle
                        key={status}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={STATUS_COLORS[status]}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        strokeLinecap="round"
                        transform={`rotate(${rotation} 50 50)`}
                        className="transition-all duration-700 ease-out"
                        style={{
                            animation: 'donut-fill 1s ease-out forwards',
                            '--dashoffset-target': dashoffset,
                        } as React.CSSProperties}
                    >
                         <style>
                            {`
                                @keyframes donut-fill {
                                    to {
                                        stroke-dashoffset: var(--dashoffset-target);
                                    }
                                }
                            `}
                        </style>
                    </circle>
                );
            })}
             <text x="50" y="52" className="transform rotate-90" textAnchor="middle" dominantBaseline="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
                {total > 0 ? `${Math.round((data.find(d => d.status === TaskStatus.Done)?.count ?? 0) * 100 / total)}%` : '0%'}
            </text>
        </svg>
    );
};

export default DonutChart;
