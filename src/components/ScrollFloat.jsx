import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger, Flip);

const ScrollFloat = () => {
    const elRef = useRef(null);
    
    useLayoutEffect(() => {
        const el = elRef.current;
        // Collect all markers
        const markers = Array.from(document.querySelectorAll('.scroll-marker'));
        
        if (!el || markers.length === 0) return;

        // Sort markers by vertical position
        markers.sort((a, b) => {
            return (a.getBoundingClientRect().top + window.scrollY) - (b.getBoundingClientRect().top + window.scrollY);
        });

        // Get Absolute Position
        const getRect = (marker) => {
            const r = marker.getBoundingClientRect();
            return {
                cx: r.left + window.scrollX + r.width / 2,
                cy: r.top + window.scrollY + r.height / 2,
            };
        };

        const ballRadius = 35; // Ball is 70x70
        const H = window.innerHeight;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
        const fixedTop = H / 2 - ballRadius; // Vertically centered in viewport

        // Set initial state
        const m0 = getRect(markers[0]);
        gsap.set(el, { 
            position: 'fixed',
            top: fixedTop, 
            left: m0.cx - ballRadius,
            autoAlpha: 1,
            zIndex: 9999
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                invalidateOnRefresh: true,
            }
        });

        // Lock timeline to exactly match scroll depth
        tl.to({}, {duration: maxScroll});

        // Build path through markers
        markers.forEach((marker, i) => {
            if (i === markers.length - 1) return;

            const mCurr = getRect(markers[i]);
            const mNext = getRect(markers[i+1]);
            
            // Calculate natural scroll triggers where marker is in center of viewport
            let startScroll = Math.max(0, mCurr.cy - H / 2);
            let endScroll = Math.max(0, mNext.cy - H / 2);
            
            // Immediately start moving horizontally from scrolling 0px
            if (i === 0) startScroll = 0;
            
            const isLastStep = (i === markers.length - 2); 
            
            let destX = mNext.cx - ballRadius;
            let destTop = fixedTop; // Keep strictly vertically fixed inside viewpoint

            if (isLastStep) {
                // Dock must be reached at the exact absolute bottom of the page
                endScroll = maxScroll;
                // Calculate where the FAB will visually be in the viewport at max scroll
                const viewportYAtEnd = mNext.cy - maxScroll;
                destTop = viewportYAtEnd - ballRadius;
            }

            const timeDuration = Math.max(1, endScroll - startScroll);
            
            tl.to(el, {
                left: destX,
                top: destTop,
                ease: isLastStep ? "power2.inOut" : "none", 
                duration: timeDuration
            }, startScroll); 
        });

        // Hide the ball element exactly at the end
        tl.to(el, { 
            opacity: 0, 
            duration: 30, // Fades out over the last 30 pixels of scroll
            onStart: () => window.dispatchEvent(new CustomEvent('ball-undocked')),
            onComplete: () => window.dispatchEvent(new CustomEvent('ball-docked')),
            onReverseComplete: () => window.dispatchEvent(new CustomEvent('ball-undocked'))
        }, maxScroll - 30); 

        // Color Toggle Logic for Achievements Section
        const floatContainer = el.querySelector('.ball-float-container');
        
        // Wait for next tick to ensure #achievements is mounted
        const stColor = ScrollTrigger.create({
            trigger: '#achievements',
            start: "top center", // When top of achievements hits center
            end: "bottom center", // When bottom of achievements leaves
            toggleClass: { targets: floatContainer, className: "white-glass" },
            markers: false
        });

        // Add Rotation to Inner Element to simulate rolling
        // We add this to the timeline at time 0, spanning the full duration
        if (tl.duration() > 0) {
            tl.to(el.querySelector('.ball-inner'), {
                rotation: 360 * markers.length,
                ease: "none",
                duration: tl.duration()
            }, 0);
        }

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
            if (stColor) stColor.kill();
        };
        
    }, []);

    return (
        <div ref={elRef} className="moving-element-wrapper">
            <div className="ball-float-container">
                <div className="ball-inner"></div>
            </div>
        </div>
    );
};

export default ScrollFloat;
