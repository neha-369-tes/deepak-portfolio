const fs = require('fs');
let content = fs.readFileSync('src/components/Achievements.css', 'utf8');

const newCSS = \
/* Custom formatting for extended description sections */
.description-panel .desc-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.description-panel .desc-content h4 {
  font-family: var(--font-tusker, 'Tusker Grotesk', sans-serif) !important;
  font-size: 1.5rem;
  color: var(--primary-red);
  text-transform: uppercase;
  margin: 0;
}

.description-panel .desc-content .key-contrib-title {
  font-family: var(--font-tusker, 'Tusker Grotesk', sans-serif) !important;
  font-size: 1.2rem;
  color: var(--black);
  text-transform: uppercase;
  margin: 10px 0 0 0;
  font-weight: bold;
}

.description-panel .desc-content ul {
  list-style-type: disc;
  padding-left: 20px;
  color: var(--dark-gray);
  font-size: 0.95rem;
  line-height: 1.5;
}

.description-panel .desc-content ul li {
  margin-bottom: 5px;
}
\;

fs.appendFileSync('src/components/Achievements.css', newCSS);
console.log('Appended CSS to Achievements.css');
