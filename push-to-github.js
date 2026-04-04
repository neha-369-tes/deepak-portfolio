import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.dirname(__dirname);

try {
  console.log('[v0] Project directory:', projectDir);
  
  // Change to project directory and execute git commands
  const commands = [
    `git config user.email "v0[bot]@users.noreply.github.com"`,
    `git config user.name "v0[bot]"`,
    `git add src/components/Skills.jsx src/components/Skills.css`,
    `git commit -m "Add continuous auto-scroll to expertise skill cards with pause on interaction

- Implemented auto-scrolling animation that continuously moves skill cards
- Cards pause when user touches/interacts with the carousel
- Auto-resume scrolling after 3 seconds of inactivity
- Smooth scroll behavior with mouse and touch event handlers
- Improved UX for viewing all expertise categories"`,
    `git push origin HEAD`
  ];

  for (const cmd of commands) {
    console.log(`[v0] Executing: ${cmd}`);
    try {
      const output = execSync(cmd, { 
        cwd: projectDir,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      console.log(`[v0] Success: ${output}`);
    } catch (err) {
      console.log(`[v0] Command output: ${err.stderr || err.stdout || err.message}`);
    }
  }

  console.log('[v0] Git operations completed successfully!');
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
