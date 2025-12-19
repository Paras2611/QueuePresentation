
import React, { useState } from 'react';
import { Terminal, Copy, Check, Info } from 'lucide-react';

const CodeSnippet: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const pythonCode = `class CircularQueue:
    def __init__(self, size):
        self.size = size
        self.queue = [None] * size
        self.front = -1
        self.rear = -1

    def enqueue(self, value):
        # Check overflow condition
        if (self.rear + 1) % self.size == self.front:
            print("Queue Overflow")
            return

        # First insertion
        if self.front == -1:
            self.front = 0
            self.rear = 0
        else:
            self.rear = (self.rear + 1) % self.size
        
        self.queue[self.rear] = value
        print(f"{value} enqueued")

    def dequeue(self):
        # Check underflow condition
        if self.front == -1:
            print("Queue Underflow")
            return None
            
        removed = self.queue[self.front]
        self.queue[self.front] = None

        # Reset if only one element was present
        if self.front == self.rear:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
            
        return removed`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <span className="ml-2 text-slate-400 text-sm font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4" /> circular_queue.py
            </span>
          </div>
          <button 
            onClick={copyToClipboard}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <div className="p-6 bg-[#1e1e1e] overflow-x-auto">
          <pre className="text-sm font-mono text-slate-300 leading-relaxed">
            {pythonCode}
          </pre>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" /> Code Explanation
        </h3>
        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            <strong className="text-slate-800">Constructor (__init__):</strong> Initialises the queue with a fixed size and sets 
            <code className="bg-slate-100 px-1 rounded">front</code> and <code className="bg-slate-100 px-1 rounded">rear</code> 
            to -1 to denote an empty state.
          </p>
          <p>
            <strong className="text-slate-800">Enqueue Method:</strong> First checks for overflow. If not full, it updates 
            <code className="bg-slate-100 px-1 rounded">rear</code> using the modulo operator and inserts the value. 
            On the first insertion, it also sets <code className="bg-slate-100 px-1 rounded">front</code> to 0.
          </p>
          <p>
            <strong className="text-slate-800">Dequeue Method:</strong> Checks for underflow. If not empty, it advances the 
            <code className="bg-slate-100 px-1 rounded">front</code> pointer. If it was the last element, it resets the 
            pointers to -1.
          </p>
          <p>
            <strong className="text-slate-800">Modulo Operator (%):</strong> The secret sauce! It ensures that both pointers 
            "wrap around" to the beginning (index 0) once they hit the end of the array.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeSnippet;
