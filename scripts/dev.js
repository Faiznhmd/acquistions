import { execSync } from 'child_process';
import fs from 'fs';

// Check .env.development
if (!fs.existsSync('.env.development')) {
  console.error('❌ .env.development file not found!');
  process.exit(1);
}

// Check Docker running
try {
  execSync('docker info', { stdio: 'ignore' });
} catch {
  console.error('❌ Docker is not running!');
  process.exit(1);
}

// Create .neon_local if missing
if (!fs.existsSync('.neon_local')) fs.mkdirSync('.neon_local');

// Run migrations
console.log('🔨 Applying latest schema with Drizzle...');
execSync('npm run db:migrate', { stdio: 'inherit' });

// Start development environment
console.log('📦 Starting development containers...');
execSync('docker compose -f docker-compose.dev.yml up --build', {
  stdio: 'inherit',
});
