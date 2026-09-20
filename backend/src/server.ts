import { connectDB } from './config/db';
import { env } from './config/env';
import app from './app';

const PORT = env.PORT;

const start = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`\n✅  SAHYOG API running on http://localhost:${PORT}`);
    console.log(`📋  Environment : ${env.NODE_ENV}`);
    console.log(`🗄️   MongoDB     : ${env.MONGODB_URI.replace(/\/\/.*@/, '//***@')}`);
    console.log(`🩺  Health      : http://localhost:${PORT}/health\n`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`\n⚠️  ${signal} received – shutting down gracefully…`);
    server.close(async () => {
      const mongoose = await import('mongoose');
      await mongoose.default.connection.close();
      console.log('🔌  MongoDB connection closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
};

start().catch(err => {
  console.error('❌  Failed to start server:', err);
  process.exit(1);
});
