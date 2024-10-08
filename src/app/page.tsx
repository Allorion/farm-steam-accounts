'use client';

import { useState } from 'react';

export default function Home() {
  const [jobId, setJobId] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(1000);
  const [status, setStatus] = useState<string | null>(null);

  const createTask = async () => {
    const res = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ duration }),
    });

    const data = await res.json();
    setJobId(data.jobId);
  };

  const getTaskStatus = async () => {
    if (!jobId) return;

    const res = await fetch(`/api/task/${jobId}`);
    const data = await res.json();
    setStatus(data.state);
  };

  return (
    <div>
      <h1>Task Queue</h1>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        placeholder="Task Duration (ms)"
      />
      <button onClick={createTask}>Create Task</button>

      {jobId && (
        <>
          <p>Job ID: {jobId}</p>
          <button onClick={getTaskStatus}>Get Task Status</button>
          {status && <p>Status: {status}</p>}
        </>
      )}
    </div>
  );
}
