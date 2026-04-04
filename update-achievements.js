const fs = require('fs');
let content = fs.readFileSync('src/components/Achievements.jsx', 'utf8');

const newFilters = \const mainFilters = [
  { id: 'all', label: 'All', title: 'ALL', description: 'Explore a complete visual journey showcasing diverse achievements, competitive triumphs, and large-scale event organization across multiple domains.' },
  { id: '50+events', label: '50+ Events', title: '50+ EVENTS', description: 'Coordinated and managed over 50 varied events, ranging from technical workshops to large-scale cultural festivals, demonstrating strong leadership and logistical expertise.' },        
  { id: 'championship', label: 'Championship', title: 'CHAMPIONSHIP', description: 'Secured top positions in competitive arenas, proving excellence, strategy, and teamwork in high-stakes environments.' },
  { id: 'mentorship', label: 'Mentorship', title: 'MENTORSHIP', description: 'Guiding peers and juniors through dedicated mentorship sessions, fostering a community of shared learning and professional growth.' },
  { id: 'college_events', label: 'College Events', title: 'COLLEGE OPERATIONS & EVENTS', description: (
    <div className="desc-content">
      <p>I have strategically led and contributed to high-impact college esports initiatives, delivering structured tournament ecosystems, industry-oriented career guidance, and large-scale student engagement. My focus has been on transforming campus environments into competitive, career-driven esports platforms.</p>
    </div>
  ) },
];

const subFilters = [
  { 
    id: 'hindustan', 
    label: 'Hindustan', 
    title: 'HINDUSTAN INSTITUTE OF TECHNOLOGY & SCIENCE', 
    description: (
      <div className="desc-content">
        <h4>Next Gen Esports Summit & Battle</h4>
        <p>I spearheaded the end-to-end execution of a flagship esports summit, overseeing tournament architecture, operational workflows, and event delivery at scale. I represented Autobotz Esports as a Guest Speaker, delivering industry insights and career pathways, while bridging the gap between academic environments and the evolving esports ecosystem.</p>
        <p className="key-contrib-title">Key Contributions:</p>
        <ul>
          <li>Directed full-scale event strategy and execution</li>
          <li>Designed structured tournament formats and competitive flow</li>
          <li>Delivered industry-oriented career guidance sessions</li>
          <li>Strengthened brand presence and institutional collaboration</li>
        </ul>
      </div>
    )
  },
  { 
    id: 'srm', 
    label: 'SRM University', 
    title: 'SRM UNIVERSITY', 
    description: (
      <div className="desc-content">
        <h4>ZenithX’26</h4>
        <p>I was invited as the Main Guest Speaker for an esports career development program, where I also led the orchestration of BGMI and Free Fire tournaments. The event emphasized competitive excellence, structured execution, and awareness of emerging opportunities in esports.</p>
        <p className="key-contrib-title">Key Contributions:</p>
        <ul>
          <li>Delivered high-impact keynote session on esports careers</li>
          <li>Orchestrated multi-title esports tournaments</li>
          <li>Enabled large-scale student participation and engagement</li>
          <li>Established a structured competitive environment within campus</li>
        </ul>
      </div>
    )
  },
  { 
    id: 'cit', 
    label: 'CIT', 
    title: 'CHENNAI INSTITUTE OF TECHNOLOGY', 
    description: (
      <div className="desc-content">
        <h4>Trojans’26</h4>
        <p>I executed professionally structured esports tournaments with precision coordination and strong audience engagement. I also mentored over 200+ students, providing strategic guidance on esports careers, skill development, and industry readiness.</p>
        <p className="key-contrib-title">Key Contributions:</p>
        <ul>
          <li>Managed tournament execution with operational excellence</li>
          <li>Mentored 200+ students across esports career pathways</li>
          <li>Conducted career guidance sessions and interactive workshops</li>
          <li>Built awareness around structured esports opportunities</li>
        </ul>
      </div>
    )
  },
  { 
    id: 'gojans', 
    label: 'Gojans Festive', 
    title: 'GOJANS INSTITUTION OF BUSINESS & TECHNOLOGY', 
    description: (
      <div className="desc-content">
        <h4>Gojans Festopia 2026</h4>
        <p>I served as the Main Jury Member for the fest and FFM event, evaluating competitive performance, gameplay standards, and event execution. In addition, I delivered career guidance sessions, contributing to student awareness and engagement in esports.</p>
        <p className="key-contrib-title">Key Contributions:</p>
        <ul>
          <li>Evaluated competitive gameplay and tournament standards</li>
          <li>Ensured fair, structured, and high-quality event execution</li>
          <li>Delivered career guidance and industry awareness sessions</li>
          <li>Contributed to overall event credibility and experience</li>
        </ul>
      </div>
    )
  }
];

const filters = [...mainFilters, ...subFilters];\;

content = content.replace(/const mainFilters = \\[(.|\\n)*?const filters = \\[...mainFilters, ...subFilters\\];/m, newFilters);

const oldPanel = \<div className={"description-panel \"}>
                      <h3>{filters.find(f => f.id === activeCategory)?.label}</h3>
                      <p>{activeDescription}</p>
                  </div>\;
const newPanel = \<div className={"description-panel \"}>
                      <h3>{filters.find(f => f.id === activeCategory)?.title || filters.find(f => f.id === activeCategory)?.label}</h3>
                      {typeof activeDescription === 'string' ? <p>{activeDescription}</p> : activeDescription}
                  </div>\;

// Handle possible string literal differences in classname template literal
content = content.replace(/\\<div className=\\{.*?description-panel.*\\[\\s\\S]*?\\<\\/div\\>/m, newPanel);
// Try a more explicit replace just in case the regex misses
let lines = content.split('\\n');
for(let i=0; i<lines.length; i++) {
   if(lines[i].includes('className={\description-panel \\}')) {
      lines[i+1] = \                      <h3>{filters.find(f => f.id === activeCategory)?.title || filters.find(f => f.id === activeCategory)?.label}</h3>\;
      lines[i+2] = \                      {typeof activeDescription === 'string' ? <p>{activeDescription}</p> : activeDescription}\;
   }
}
content = lines.join('\\n');
fs.writeFileSync('src/components/Achievements.jsx', content);
console.log('updated Achievements.jsx');
