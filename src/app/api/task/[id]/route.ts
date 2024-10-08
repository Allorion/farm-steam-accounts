import { NextResponse } from 'next/server';
import { taskQueue } from '@/lib/queue';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const jobId = params.id;
    const job = await taskQueue.getJob(jobId);

    if (job) {
        const state = await job.getState();
        const progress = job.progress();
        return NextResponse.json({ jobId, state, progress });
    } else {
        return NextResponse.json({ message: `Task ${jobId} not found` }, { status: 404 });
    }
}
