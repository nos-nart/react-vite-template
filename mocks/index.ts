export const initMocks = async () => {
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = require('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
};
