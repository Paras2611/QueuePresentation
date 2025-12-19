
export interface QueueState {
  items: (number | string | null)[];
  front: number;
  rear: number;
  size: number;
}

export type OperationType = 'ENQUEUE' | 'DEQUEUE' | 'ERROR' | 'INFO';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: OperationType;
  message: string;
}
