const fs = require('fs');
let code = fs.readFileSync('src/components/ScrollFloat.jsx', 'utf8');

const replacement = \    useLayoutEffect(() => {
        let tl;
        let stColor;
        let resizeTimeout;
        let initTimeout;

        const buildTimeline = () => {
            const el = elRef.current;
            if (!el) return;

            if (tl) {
                if (tl.scrollTrigger) tl.scrollTrigger.kill();
                tl.kill();
            }
            if (stColor) {
                stColor.kill();
            }

            const markers = Array.from(document.querySelectorAll('.scroll-marker'));
            
            if (markers.length === 0) return;

            markers.sort((a, b) => {
                return (a.getBoundingClientRect().top + window.scrollY) - (b.getBoundingClientRect().top + window.scrollY);
            });

            const getRect = (marker) => {
                const r = marker.getBoundingClientRect();
                return {
                    cx: r.left + window.scrollX + r.width / 2,
                    cy: r.top + window.scrollY + r.height / 2,
                };
            };

            const ballRadius = 35;
            const H = window.innerHeight;
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
            const fixedTop = H / 2 - ballRadius;

            const m0 = getRect(markers[0]);
            gsap.set(el, { 
                position: 'fixed',
                top: fixedTop,
                left: m0.cx - ballRadius,
                autoAlpha: 1,
                zIndex: 9999
            });

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                }
            });

            tl.to({}, {duration: maxScroll});

            markers.forEach((marker, i) => {
                if (i === markers.length - 1) return;

                const mCurr = getRect(markers[i]);
                const mNext = getRect(markers[i+1]);

                let startScroll = Math.max(0, mCurr.cy - H / 2);
                let endScroll = Math.max(0, mNext.cy - H / 2);

                if (i === 0) startScroll = 0;

                const isLastStep = (i === markers.length - 2); 

                let destX = mNext.cx - Math.min(ballRadius, mNext.cx);
                let destTop = fixedTop;

                if (isLastStep) {
                    endScroll = maxScroll;
                    const viewportYAtEnd = mNext.cy - maxScroll;
                    destTop = Math.max(0, viewportYAtEnd - ballRadius);
                }

                const timeDuration = Math.max(1, endScroll - startScroll);

                tl.to(el, {
                    left: mNext.cx - ballRadius,
                    top: destTop,
                    ease: isLastStep ? "power2.inOut" : "none",
                    duration: timeDuration
                }, startScroll);
            });

            tl.to(el, {
                opacity: 0, 
                duration: 30, // Fades out over the last 30 pixels of scroll        
                onStart: () => window.dispatchEvent(new CustomEvent('ball-undocked')),
                onComplete: () => window.dispatchEvent(new CustomEvent('ball-docked')),
                onReverseComplete: () => window.dispatchEvent(new CustomEvent('ball-undocked'))
            }, Math.max(0, maxScroll - 30));

            const floatContainer = el.querySelector('.ball-float-container');       
            
            stColor = ScrollTrigger.create({
                trigger: '#achievements',
                start: "top center", 
                end: "bottom center", 
                toggleClass: { targets: floatContainer, className: "white-glass" }, 
                markers: false
            });

            if (tl.duration() > 0) {
                tl.to(el.querySelector('.ball-inner'), {
                    rotation: 360 * markers.length,
                    ease: "none",
                    duration: tl.duration()
                }, 0);
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                buildTimeline();
                ScrollTrigger.refresh();
            }, 300);
        };

        initTimeout = setTimeout(() => {
            buildTimeline();
        }, 300);

        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);

        return () => {
            clearTimeout(initTimeout);
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
            if (tl) {
                if (tl.scrollTrigger) tl.scrollTrigger.kill();
                tl.kill();
            }
            if (stColor) stColor.kill();
        };
        
    }, []);\

code = code.replace(/useLayoutEffect\\(\\) => \\{[\\s\\S]*?\\}, \\[\\]\\);/, replacement);
fs.writeFileSync('src/components/ScrollFloat.jsx', code);
console.log('Scroll Float updated');
