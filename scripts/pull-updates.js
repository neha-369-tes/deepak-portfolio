import { execSync } from 'child_process';

try {
  console.log('Pulling latest updates from main branch...');
  const output = execSync('git pull origin main', { cwd: '/vercel/share/v0-project', encoding: 'utf-8' });
  console.log(output);
  console.log('✓ Successfully pulled the latest updates');
} catch (error) {
  console.error('Error pulling updates:', error.message);
  process.exit(1);
}
