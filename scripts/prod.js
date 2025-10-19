import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Starting Acquisition App in Production Mode');

// Check .env.production
if (!fs.existsSync('.env.production')) {
  console.error('❌ .env.production file not found!');
  process.exit(1);
}

// Check Docker running
try {
  execSync('docker info', { stdio: 'ignore' });
} catch {
  console.error('❌ Docker is not running!');
  process.exit(1);
}

// Build and start containers
console.log('📦 Starting production container...');
execSync('docker compose -f docker-compose.prod.yml up --build -d', {
  stdio: 'inherit',
});

// Run migrations inside container
console.log('📜 Applying latest schema with Drizzle...');
execSync('docker exec -it acquisition-app-prod npm run db:migrate', {
  stdio: 'inherit',
});

console.log('\n🎉 Production environment started!');
console.log('Application: http://localhost:3000');
console.log('Logs: docker logs -f acquisition-app-prod');
