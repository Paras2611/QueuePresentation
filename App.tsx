
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Info, 
  Code, 
  ChevronRight, 
  AlertCircle,
  Database,
  ArrowRightCircle,
  Hash
} from 'lucide-react';
import { QueueState, LogEntry, OperationType } from './types';
import QueueDisplay from './components/QueueDisplay';
import InfoSection from './components/InfoSection';
import CodeSnippet from './components/CodeSnippet';

const INITIAL_SIZE = 8;

const App: React.FC = () => {
  const [queue, setQueue] = useState<QueueState>({
    items: Array(INITIAL_SIZE).fill(null),
    front: -1,
    rear: -1,
    size: INITIAL_SIZE
  });
  
  const [inputValue, setInputValue] = useState<string>('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'visual' | 'theory' | 'code'>('visual');

  const addLog = useCallback((type: OperationType, message: string) => {
    setLogs(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type,
        message
      },
      ...prev.slice(0, 9) // Keep last 10 logs
    ]);
  }, []);

  const handleEnqueue = useCallback(() => {
    if (!inputValue.trim()) return;

    setQueue(prev => {
      // Overflow Check: (rear + 1) % size == front
      if ((prev.rear + 1) % prev.size === prev.front) {
        addLog('ERROR', 'Queue Overflow! Cannot add element.');
        return prev;
      }

      const newItems = [...prev.items];
      let newFront = prev.front;
      let newRear = prev.rear;

      // First insertion
      if (newFront === -1) {
        newFront = 0;
        newRear = 0;
      } else {
        newRear = (newRear + 1) % prev.size;
      }

      newItems[newRear] = inputValue;
      addLog('ENQUEUE', `Enqueued: ${inputValue} at index ${newRear}`);
      setInputValue('');
      return { ...prev, items: newItems, front: newFront, rear: newRear };
    });
  }, [inputValue, addLog]);

  const handleDequeue = useCallback(() => {
    setQueue(prev => {
      // Underflow Check: front == -1
      if (prev.front === -1) {
        addLog('ERROR', 'Queue Underflow! Cannot remove element.');
        return prev;
      }

      const newItems = [...prev.items];
      const removedVal = newItems[prev.front];
      newItems[prev.front] = null;

      let newFront = prev.front;
      let newRear = prev.rear;

      // If only one element was present
      if (prev.front === prev.rear) {
        newFront = -1;
        newRear = -1;
      } else {
        newFront = (prev.front + 1) % prev.size;
      }

      addLog('DEQUEUE', `Dequeued: ${removedVal} from index ${prev.front}`);
      return { ...prev, items: newItems, front: newFront, rear: newRear };
    });
  }, [addLog]);

  const handleReset = useCallback(() => {
    setQueue({
      items: Array(INITIAL_SIZE).fill(null),
      front: -1,
      rear: -1,
      size: INITIAL_SIZE
    });
    setLogs([]);
    setInputValue('');
    addLog('INFO', 'Queue has been reset.');
  }, [addLog]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">CircularQueue<span className="text-blue-600">Viz</span></h1>
          </div>
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab('visual')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'visual' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Visualizer
            </button>
            <button 
              onClick={() => setActiveTab('theory')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'theory' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Theory
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Code
            </button>
          </nav>
          <div className="text-xs text-slate-400 hidden lg:block">
            Presented by <span className="text-slate-600 font-medium">Rahul Dilip Patil</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Area */}
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'visual' && (
            <>
              {/* Visualization Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center min-h-[500px]">
                <QueueDisplay queue={queue} />
                
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">Front</span>
                    <span className="text-2xl font-mono font-bold text-blue-700">{queue.front === -1 ? '-1' : queue.front}</span>
                  </div>
                  <div className="bg-orange-50 border border-orange-100 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-xs text-orange-500 font-bold uppercase tracking-wider mb-1">Rear</span>
                    <span className="text-2xl font-mono font-bold text-orange-700">{queue.rear === -1 ? '-1' : queue.rear}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Size</span>
                    <span className="text-2xl font-mono font-bold text-slate-700">{queue.size}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col items-center">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Status</span>
                    <span className="text-sm font-bold text-slate-700 h-8 flex items-center text-center">
                      {queue.front === -1 ? 'Empty' : (queue.rear + 1) % queue.size === queue.front ? 'Full' : 'Operational'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Hash className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
                      placeholder="Enter value (e.g. 10, 20, A)"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <button 
                      onClick={handleEnqueue}
                      disabled={!inputValue.trim()}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-200"
                    >
                      <Plus className="w-5 h-5" /> Enqueue
                    </button>
                    <button 
                      onClick={handleDequeue}
                      disabled={queue.front === -1}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-md shadow-slate-200"
                    >
                      <Minus className="w-5 h-5" /> Dequeue
                    </button>
                    <button 
                      onClick={handleReset}
                      className="flex items-center justify-center p-3 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-xl transition-all"
                      title="Reset Queue"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'theory' && <InfoSection />}
          {activeTab === 'code' && <CodeSnippet />}
        </div>

        {/* Right Column: Information & Logs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Logic Card */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Quick Formulae
            </h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                <p className="text-white/70 mb-1">Overflow Condition</p>
                <p className="font-bold">(rear + 1) % size == front</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                <p className="text-white/70 mb-1">Underflow Condition</p>
                <p className="font-bold">front == -1</p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                <p className="text-white/70 mb-1">Increment Pointer</p>
                <p className="font-bold">idx = (idx + 1) % size</p>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-[400px]">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800">
              <Database className="w-5 h-5 text-blue-600" /> Operation Logs
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm italic">
                  No operations yet
                </div>
              ) : (
                logs.map(log => (
                  <div 
                    key={log.id} 
                    className={`p-3 rounded-lg border text-sm flex gap-3 animate-in fade-in slide-in-from-right-2 duration-300 ${
                      log.type === 'ERROR' ? 'bg-red-50 border-red-100 text-red-700' :
                      log.type === 'ENQUEUE' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                      log.type === 'DEQUEUE' ? 'bg-green-50 border-green-100 text-green-700' :
                      'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {log.type === 'ERROR' && <AlertCircle className="w-4 h-4" />}
                      {log.type === 'ENQUEUE' && <Plus className="w-4 h-4" />}
                      {log.type === 'DEQUEUE' && <Minus className="w-4 h-4" />}
                      {log.type === 'INFO' && <Info className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-medium">{log.message}</div>
                      <div className="text-[10px] opacity-60 mt-0.5">
                        {log.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            Interactive Data Structure Visualizer &bull; Built with React & Tailwind
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <span className="text-xs text-slate-400">Presented By: Rahul Dilip Patil</span>
            <span className="text-xs text-slate-400">Roll Number: 2547029</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
