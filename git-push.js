import { execSync } from 'child_process';
import path from 'path';

const projectDir = '/vercel/share/v0-project';

try {
  console.log('[v0] Starting git commit process...');
  console.log('[v0] Project directory:', projectDir);

  // Change to project directory and run git commands
  const commands = [
    `cd ${projectDir} && git status`,
    `cd ${projectDir} && git add src/components/Skills.jsx src/components/Skills.css`,
    `cd ${projectDir} && git commit -m "feat: Add continuous auto-scroll to expertise skill cards with pause on interaction

- Boxes now scroll continuously by default
- Auto-scroll pauses when user touches/interacts with the cards
- Auto-scroll resumes after 3 seconds of inactivity
- Smooth scrolling behavior with mouse and touch support
- Includes mouse down, touch start, and scroll event handlers"`,
    `cd ${projectDir} && git push origin v0/neha-369-tes-48154d87`
  ];

  for (const cmd of commands) {
    console.log(`[v0] Executing: ${cmd}`);
    const output = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(output);
  }

  console.log('[v0] ✓ Changes successfully committed and pushed to GitHub!');
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  console.error('[v0] Full error:', error);
  process.exit(1);
}
