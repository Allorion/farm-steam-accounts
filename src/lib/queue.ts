import Bull from 'bull';

export const taskQueue = new Bull('taskQueue', {
  redis: {
    host: '127.0.0.1', // Адрес Redis
    port: 6379,        // Порт Redis
  },
});

taskQueue.process(async (job) => {
  const { duration } = job.data;
  console.log(`Processing job with id ${job.id} and duration ${duration}ms`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Job ${job.id} completed`);
      resolve();
    }, duration);
  });
});
