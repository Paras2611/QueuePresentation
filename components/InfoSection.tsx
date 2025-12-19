
import React from 'react';
import { HelpCircle, Layers, RefreshCw, Zap } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Introduction */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">What is a Circular Queue?</h2>
        </div>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            A circular queue is a linear data structure in which the operations are performed based on the 
            <strong> First-In, First-Out (FIFO)</strong> principle, and the last position is connected back to 
            the first position, forming a circle.
          </p>
          <p>
            This unique arrangement allows for <strong>efficient utilisation of space</strong> within the queue. 
            Unlike a linear queue, which can suffer from inefficient space usage once elements are dequeued 
            from the front, a circular queue intelligently reuses empty slots.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg italic">
            "This wrap-around mechanism prevents the need for shifting elements, making it particularly 
            useful in scenarios requiring continuous data flow like CPU scheduling."
          </div>
        </div>
      </section>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800">Key Operations</h3>
          </div>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>
              <span className="font-bold text-slate-800 block">Enqueue:</span>
              Adds an element to the rear. Uses modulo for wrap-around logic.
            </li>
            <li>
              <span className="font-bold text-slate-800 block">Dequeue:</span>
              Removes an element from the front. Resets to -1 if queue becomes empty.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-5 h-5 text-green-500" />
            <h3 className="font-bold text-slate-800">Advantages</h3>
          </div>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>
              <span className="font-bold text-slate-800 block">Memory Efficiency:</span>
              Reuses empty spaces immediately after deletion.
            </li>
            <li>
              <span className="font-bold text-slate-800 block">Constant Time:</span>
              O(1) complexity for both insertion and deletion operations.
            </li>
          </ul>
        </div>
      </div>

      {/* Logic Summary */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-600" /> Algorithm Logic
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-blue-600 mb-3 text-sm uppercase">Insertion (Enqueue)</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
              <li>Check if full: <code className="bg-slate-100 px-1 rounded">(rear + 1) % size == front</code></li>
              <li>If empty (front == -1), set front = 0</li>
              <li>Increment rear: <code className="bg-slate-100 px-1 rounded">rear = (rear + 1) % size</code></li>
              <li>Add element at <code className="bg-slate-100 px-1 rounded">queue[rear]</code></li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase">Deletion (Dequeue)</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
              <li>Check if empty: <code className="bg-slate-100 px-1 rounded">front == -1</code></li>
              <li>Retrieve element from <code className="bg-slate-100 px-1 rounded">queue[front]</code></li>
              <li>If only one element (front == rear), reset both to -1</li>
              <li>Else, increment front: <code className="bg-slate-100 px-1 rounded">front = (front + 1) % size</code></li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
