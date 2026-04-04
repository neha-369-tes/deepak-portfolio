import { execSync } from 'child_process';
import path from 'path';

const projectDir = '/vercel/share/v0-project';

try {
  console.log('[v0] Changing to project directory:', projectDir);
  process.chdir(projectDir);
  
  console.log('[v0] Current directory:', process.cwd());
  
  // Check if we're in a git repo
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    console.log('[v0] ✓ Git repository found');
  } catch (e) {
    console.log('[v0] ✗ Not a git repository');
    process.exit(1);
  }
  
  // Configure git user
  console.log('[v0] Configuring git user...');
  execSync('git config user.email "v0[bot]@users.noreply.github.com"', { stdio: 'pipe' });
  execSync('git config user.name "v0[bot]"', { stdio: 'pipe' });
  console.log('[v0] ✓ Git user configured');
  
  // Check git status
  console.log('[v0] Checking git status...');
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  console.log('[v0] Modified files:\n' + status);
  
  // Stage changes
  console.log('[v0] Staging changes...');
  execSync('git add src/components/Skills.jsx src/components/Skills.css', { stdio: 'pipe' });
  console.log('[v0] ✓ Changes staged');
  
  // Commit
  const commitMessage = `Add continuous auto-scroll to expertise skill cards with pause on interaction

- Implemented auto-scrolling animation that continuously moves skill cards
- Cards pause when user touches/interacts with the carousel  
- Auto-resume scrolling after 3 seconds of inactivity
- Smooth scroll behavior with mouse and touch event handlers
- Improved UX for viewing all expertise categories`;

  console.log('[v0] Creating commit...');
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { stdio: 'pipe' });
  console.log('[v0] ✓ Commit created');
  
  // Get current branch
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  console.log('[v0] Current branch:', currentBranch);
  
  // Push
  console.log('[v0] Pushing to GitHub...');
  execSync(`git push origin ${currentBranch}`, { stdio: 'pipe' });
  console.log('[v0] ✓ Changes pushed to GitHub successfully!');
  
  console.log('\n✓ Auto-scroll functionality has been committed and pushed to GitHub');
  console.log('  - Branch: ' + currentBranch);
  console.log('  - Repository: neha-369-tes/deepak-portfolio');
  
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
