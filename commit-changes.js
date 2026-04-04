import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  console.log('[v0] Starting git commit process...');
  
  // Change to project directory
  process.chdir(__dirname);
  
  console.log('[v0] Current directory:', process.cwd());
  
  // Add changes
  console.log('[v0] Adding changes to git...');
  execSync('git add src/components/Skills.jsx src/components/Skills.css', { stdio: 'inherit' });
  
  // Commit
  console.log('[v0] Committing changes...');
  const commitMessage = 'feat: Add continuous auto-scroll to expertise skill cards with pause on interaction\n\n- Implemented smooth auto-scrolling animation for skill cards\n- Cards pause scrolling when user touches or interacts\n- Auto-resume after 3 seconds of inactivity\n- Added mouse and touch event handlers\n- Smooth scroll behavior for better UX';
  
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  // Push
  console.log('[v0] Pushing to remote...');
  execSync('git push origin HEAD', { stdio: 'inherit' });
  
  console.log('[v0] Successfully committed and pushed changes!');
} catch (error) {
  console.error('[v0] Error during git operations:', error.message);
  process.exit(1);
}
