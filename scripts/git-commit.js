import { execSync } from 'child_process';
import { chdir } from 'process';

try {
  chdir('/vercel/share/v0-project');

  // Stage the files
  console.log('Staging files...');
  execSync('git add src/components/Skills.jsx src/components/Skills.css', { stdio: 'inherit' });

  // Commit the changes
  console.log('Committing changes...');
  const commitMessage = `Add continuous auto-scroll to expertise skill cards with pause on interaction

- Implement auto-scroll animation that continuously scrolls skill cards
- Pause scrolling when user interacts (touch/click/drag)
- Resume scrolling automatically after 3 seconds of inactivity
- Smooth scroll behavior for better UX
- Works on both desktop and mobile`;

  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });

  // Push to the branch
  console.log('Pushing to GitHub...');
  execSync('git push origin v0/neha-369-tes-48154d87', { stdio: 'inherit' });

  console.log('✓ Changes committed and pushed successfully to GitHub!');
} catch (error) {
  console.error('Error during git operations:', error.message);
  process.exit(1);
}
