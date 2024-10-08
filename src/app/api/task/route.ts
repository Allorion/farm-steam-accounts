import { NextResponse } from 'next/server';
import { taskQueue } from '@/lib/queue';

export async function POST(request: Request) {
  const { duration } = await request.json();

  const job = await taskQueue.add({ duration });

  return NextResponse.json({ message: 'Task added to the queue', jobId: job.id });
}
