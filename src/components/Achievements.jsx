import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import Balatro from './Balatro'; // Ensure you have this component in your folder
import './Achievements.css';

gsap.registerPlugin(Flip);

const achievements = [
  { id: '50+events', title: '50+ Events', image: '/achievements/50+events/1.jpeg' },
  { id: '50+events', title: '50+ Events', image: '/achievements/50+events/2.jpeg' },
  { id: 'championship', title: 'Championship', image: '/achievements/champioship/1.jpg' },
  { id: 'championship', title: 'Championship', image: '/achievements/champioship/2.JPG' },
  { id: 'championship', title: 'Championship', image: '/achievements/champioship/4.JPG' },
  { id: 'hindustan', title: 'Hindustan', image: '/achievements/hindustan/1.jpg' },
  { id: 'hindustan', title: 'Hindustan', image: '/achievements/hindustan/2.jpg' },
  { id: 'hindustan', title: 'Hindustan', image: '/achievements/hindustan/3.jpg' },
  { id: 'mentorship', title: 'Mentorship', image: '/achievements/mentorship/IMG-20250731-WA0015.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/1.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/2.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/3.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/4.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/5.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/7.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/8.jpg' },
  { id: 'gojans', title: 'Gojans Festive', image: '/achievements/gojans/9.jpg' },
  { id: 'cit', title: 'CIT', image: '/achievements/cit/1.jpg' },
  { id: 'cit', title: 'CIT', image: '/achievements/cit/2.jpg' },
  { id: 'srm', title: 'SRM ZenithX\'26', image: '/achievements/mentorship/IMG-20250731-WA0015.jpg' },
];

const mainFilters = [
  { id: 'all', label: 'All', description: 'Explore a complete visual journey showcasing diverse achievements, competitive triumphs, and large-scale event organization across multiple domains.' },
  { id: '50+events', label: '50+ Events', description: 'Coordinated and managed over 50 varied events, ranging from technical workshops to large-scale cultural festivals, demonstrating strong leadership and logistical expertise.' },
  { id: 'championship', label: 'Championship', description: 'Secured top positions in competitive arenas, proving excellence, strategy, and teamwork in high-stakes environments.' },
  { id: 'mentorship', label: 'Mentorship', description: 'Guiding peers and juniors through dedicated mentorship sessions, fostering a community of shared learning and professional growth.' },
  { id: 'college_events', label: 'College Events', description: 'High-impact college esports initiatives, structured tournament ecosystems, and large-scale student engagements across multiple campuses.' },
];

const subFilters = [
  { id: 'hindustan', label: 'Hindustan', description: 'Guest Speaker & strategy lead for the Next Gen Esports Summit, driving tournament setups and industry-oriented career guidance.' },
  { id: 'srm', label: 'SRM University', description: 'Main Guest Speaker & orchestrated multi-title BGMI/Free Fire tournaments at ZenithX\'26, establishing a competitive campus ecosystem at scale.' },
  { id: 'cit', label: 'CIT', description: 'Executed structured tournaments & mentored 200+ students on esports career pathways with precision coordination at Trojans\'26.' },
  { id: 'gojans', label: 'Gojans Festive', description: 'Main Jury Member at Gojans Festopia 2026. Evaluated competitive gameplay, ensured fair execution, and delivered industry awareness sessions.' }
];

const filters = [...mainFilters, ...subFilters];

const Achievements = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  // Store the Flip state of the previous render
  const lastStateRef = useRef(null);

  const [activeCategory, setActiveCategory] = React.useState('all');
  const [failedImages, setFailedImages] = React.useState(new Set());

  // Filter based on single active category
  const visibleAchievements = React.useMemo(() => {
    return achievements.filter(item => {
        if (failedImages.has(item.image)) return false;
        if (activeCategory === 'all') return true;
        if (activeCategory === 'college_events') {
            return ['hindustan', 'gojans', 'cit', 'srm'].includes(item.id);
        }
        return item.id === activeCategory;
    });
  }, [activeCategory, failedImages]);

  // Get active description
  const activeDescription = filters.find(f => f.id === activeCategory)?.description || '';

  // Use useLayoutEffect to handle layout animations before browser paints
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Get current elements in DOM
    const items = itemsRef.current.slice(0, visibleAchievements.length);
    const validItems = items.filter(el => el && el.isConnected);
    const itemsContainer = container.querySelector('.box-container');
    const descriptionPanel = container.querySelector('.description-panel');
    
    const targets = [itemsContainer, descriptionPanel, ...validItems].filter(Boolean);

    // If we have a previous state, animate FROM it
    if (lastStateRef.current) {
        Flip.from(lastStateRef.current, {
            targets: targets, // Animate these targets
            duration: 0.7,
            stagger: 0.08, // Stagger helps items look like they are "moving towards" each other sequentially
            ease: "power2.inOut",
            scale: false,
            absolute: true, // Make items absolute during animation
            onEnter: elements => gsap.fromTo(elements, 
                { opacity: 0, scale: 0.8, y: 30 }, 
                { opacity: 1, scale: 1, y: 0, duration: 0.5 }
            ),
            onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, y: -30, duration: 0.3 }) 
        });
    }

    // Capture the NEW state for the NEXT render
    // We capture specific targets
    lastStateRef.current = Flip.getState(targets);
    
  }, [activeCategory, visibleAchievements]);


  const handleCategoryClick = (id) => {
      if (id === activeCategory) return;
      setActiveCategory(id);
  };


  const handleImageError = (imageSrc) => {
      console.log("Image failed:", imageSrc);
      setFailedImages(prev => {
          const newSet = new Set(prev);
          newSet.add(imageSrc);
          return newSet;
      });
  };

  return (
    <section id="achievements" ref={sectionRef}>

      {/* Simple — no portal needed */}
      <div className="balatro-bg">
        <Balatro
          spinRotation={-2}
          spinSpeed={7}
          color1="#ec1313"
          color2="#a9283b"
          color3="#0d0204"
          contrast={6.5}
          lighting={1}
          spinAmount={0.35}
          pixelFilter={1950}
        />
      </div>

      <div className="achievements-content">
        <div id="marker-achievements" className="scroll-marker" style={{ top: '50%', right: '10%' }}></div>

          <div className="section-header-centered" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="achievements-title">Achieve<span>.</span>ments</h2>
          </div>

          <div className="container" ref={containerRef}>
              <div className="buttons-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div className="checkboxes">
                  {mainFilters.map((filter) => {
                      const isCollegeActive = filter.id === 'college_events' && ['college_events', 'hindustan', 'gojans', 'cit', 'srm'].includes(activeCategory);
                      return (
                      <button 
                          key={filter.id}
                          className={`tag-button ${activeCategory === filter.id || isCollegeActive ? 'active' : ''}`}
                          onClick={() => handleCategoryClick(filter.id)}
                      >
                          {filter.label}
                      </button>
                  )})}
                  </div>
                  
                  {/* Collapsible Sub-filters for College Events */}
                  <div className={`checkboxes sub-filters-row ${['college_events', 'hindustan', 'gojans', 'cit', 'srm'].includes(activeCategory) ? 'show' : 'hide'}`} style={{ transition: 'opacity 0.4s ease, margin-top 0.4s ease', marginTop: ['college_events', 'hindustan', 'gojans', 'cit', 'srm'].includes(activeCategory) ? '-20px' : '-40px', opacity: ['college_events', 'hindustan', 'gojans', 'cit', 'srm'].includes(activeCategory) ? 1 : 0, pointerEvents: ['college_events', 'hindustan', 'gojans', 'cit', 'srm'].includes(activeCategory) ? 'auto' : 'none', position: ['college_events', 'hindustan', 'gojans', 'cit', 'srm'].includes(activeCategory) ? 'relative' : 'absolute', padding: '0', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {subFilters.map((filter) => (
                      <button 
                          key={filter.id}
                          className={`tag-button ${activeCategory === filter.id ? 'active' : ''}`}
                          onClick={() => handleCategoryClick(filter.id)}
                      >
                          {filter.label}
                      </button>
                  ))}
                  </div>
              </div>
              
              <div className="achievements-content">
                  {/* Description Panel - Shows when a specific category is active, or even for All */}
                  <div className={`description-panel ${activeCategory ? 'active' : ''}`}>
                      <h3>{filters.find(f => f.id === activeCategory)?.label}</h3>
                      <p>{activeDescription}</p>
                  </div>

                  <div className="gallery-panel">
                      <div className="box-container">
                          {visibleAchievements.map((item, index) => (
                          <div 
                              className="item" 
                              data-category={item.id} 
                              key={`${item.id}-${item.image}`} // Stable unique key
                              ref={el => itemsRef.current[index] = el}
                          >
                              <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              onError={() => handleImageError(item.image)}
                              />
                              <span className="item-title">{item.title}</span>
                          </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Achievements;