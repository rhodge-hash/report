import React, { useState } from 'react';
import { generateProjectReport } from '../services/geminiService';
import type { Project } from '../types';
import Modal from './Modal';
import Button from './Button';
import SparklesIcon from './icons/SparklesIcon';
import DownloadIcon from './icons/DownloadIcon';

interface AiReportGeneratorProps {
  project: Project;
}

const AiReportGenerator: React.FC<AiReportGeneratorProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState('');
  const [error, setError] = useState('');
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [generationType, setGenerationType] = useState<'initial' | 'refine'>('initial');

  const runReportGeneration = async (refinePrompt?: string) => {
    setGenerationType(refinePrompt ? 'refine' : 'initial');
    setIsLoading(true);
    setError('');
    
    if (!refinePrompt) {
      setReport('');
      setRefinementPrompt('');
    }
    
    try {
      const generatedReport = await generateProjectReport(project, refinePrompt);
      setReport(generatedReport);
      if (refinePrompt) {
        setRefinementPrompt('');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate report: ${message}`);
      if (!refinePrompt) {
        setReport('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialGeneration = () => {
    setIsModalOpen(true);
    runReportGeneration();
  };

  const handleRefinedGeneration = () => {
    if (refinementPrompt.trim()) {
      runReportGeneration(refinementPrompt.trim());
    }
  };

  const handleDownloadReport = () => {
    if (!report) return;
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}-report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <>
      <Button onClick={handleInitialGeneration} disabled={isLoading}>
        <SparklesIcon className="w-4 h-4 mr-2 inline-block" />
        {isLoading ? 'Generating...' : 'Generate AI Report'}
      </Button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="AI Project Report">
        {isLoading && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400 mb-4"></div>
                <p className="text-slate-300">{generationType === 'refine' ? 'Refining your report...' : 'Generating your project report...'}</p>
                <p className="text-sm text-slate-500 mt-2">This may take a moment.</p>
            </div>
        )}
        {error && !isLoading && <div className="p-4 mb-4 bg-red-900/50 text-red-300 border border-red-700 rounded-md">{error}</div>}
        
        {report && (!isLoading || (isLoading && generationType === 'refine')) && (
          <div className="prose prose-invert prose-sm max-w-none text-slate-300 whitespace-pre-wrap font-mono bg-slate-900/50 p-4 rounded-md border border-slate-700 max-h-[50vh] overflow-y-auto">
            {report}
          </div>
        )}

        {report && !isLoading && (
            <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="space-y-3">
                    <div>
                        <label htmlFor="refinement-prompt" className="block text-sm font-medium text-slate-300 mb-1">
                            Refine Report (Optional)
                        </label>
                        <textarea
                            id="refinement-prompt"
                            value={refinementPrompt}
                            onChange={(e) => setRefinementPrompt(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-700 text-white px-3 py-2 rounded-md border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            placeholder="e.g., Make it more formal, summarize in 3 bullet points..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                    handleRefinedGeneration();
                                }
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <Button onClick={handleDownloadReport} variant="secondary">
                           <DownloadIcon className="w-4 h-4 mr-2 inline-block"/>
                           Download
                        </Button>
                        <Button onClick={handleRefinedGeneration} variant="primary" disabled={!refinementPrompt.trim()}>
                            <SparklesIcon className="w-4 h-4 mr-2 inline-block" />
                            Regenerate
                        </Button>
                    </div>
                </div>
            </div>
        )}
      </Modal>
    </>
  );
};

export default AiReportGenerator;