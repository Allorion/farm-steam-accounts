import { NextResponse } from 'next/server';
import { taskQueue } from '@/lib/queue';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const jobId = params.id;
  const job = await taskQueue.getJob(jobId);

  if (job) {
    await job.remove();
    return NextResponse.json({ message: `Task ${jobId} removed` });
  } else {
    return NextResponse.json({ message: `Task ${jobId} not found` }, { status: 404 });
  }
}
