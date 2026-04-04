import { useRef, useId, useEffect, useState, useLayoutEffect } from "react";
import "./GlassSurface.css";

const useBrowserSupport = () => {
    const [isSupported, setIsSupported] = useState(true);

    useLayoutEffect(() => {
        const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
        const hasBackdropFilter = CSS.supports("backdrop-filter: blur(10px)") || CSS.supports("-webkit-backdrop-filter: blur(10px)");
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        setIsSupported(!isFirefox && hasBackdropFilter && !(isSafari && isMobile));
    }, []);

    return isSupported;
};

const NoiseFilter = ({ id }) => (
    <filter id={`${id}-noise`} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence" />
        <feColorMatrix type="saturate" values="0" x="0%" y="0%" width="100%" height="100%" in="turbulence" result="colormatrix" />
        <feComponentTransfer x="0%" y="0%" width="100%" height="100%" in="colormatrix" result="componentTransfer">
            <feFuncR type="linear" slope="3" />
            <feFuncG type="linear" slope="3" />
            <feFuncB type="linear" slope="3" />
        </feComponentTransfer>
        <feColorMatrix x="0%" y="0%" width="100%" height="100%" in="componentTransfer" result="colormatrix2" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -8" />
    </filter>
);

const GlassFilter = ({ id, width, height, blurRadius, redOffset, blueOffset }) => (
    <filter id={`${id}-glass`} width={width} height={height} x="0" y="0" filterUnits="objectBoundingBox">
        <feGaussianBlur in="SourceGraphic" stdDeviation={blurRadius} result="blur" />
        <feOffset dx={redOffset} dy="0" in="blur" result="red-blur" />
        <feOffset dx={blueOffset} dy="0" in="blur" result="blue-blur" />
        <feColorMatrix in="red-blur" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red-channel" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green-channel" />
        <feColorMatrix in="blue-blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue-channel" />
        <feBlend mode="screen" in="red-channel" in2="green-channel" result="red-green" />
        <feBlend mode="screen" in="red-green" in2="blue-channel" result="rgb-offset" />
        <feTurbulence type="fractalNoise" baseFrequency="2.5" numOctaves="2" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0" in="noise" result="colored-noise" />
        <feBlend mode="multiply" in="rgb-offset" in2="colored-noise" result="frosted" />
    </filter>
);

const GlassSurface = ({
    children,
    className = "",
    style = {},
    blurRadius = 32,
    frostCount = 10,
    frostBase = 0.5,
    glassSaturation = 1.2,
    redOffset = 15,
    blueOffset = -15,
    ...props
}) => {
    const isSupported = useBrowserSupport();
    const id = useId();
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const cssVars = {
        "--glass-frost": frostBase,
        "--filter-id": `url(#${id}-glass)`,
        "--glass-saturation": glassSaturation,
    };

    if (!isSupported) {
        return (
            <div ref={containerRef} className={`glass-surface glass-surface--fallback ${className}`} style={{ ...style, ...cssVars }} {...props}>
                <div className="glass-surface__content">{children}</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`glass-surface glass-surface--svg ${className}`} style={{ ...style, ...cssVars }} {...props}>
            <svg
                width={dimensions.width}
                height={dimensions.height}
                className="glass-surface__filter"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <NoiseFilter id={id} />
                    <GlassFilter id={id} width={dimensions.width} height={dimensions.height} blurRadius={blurRadius} redOffset={redOffset} blueOffset={blueOffset} />
                </defs>
                <rect width="100%" height="100%" filter={`url(#${id}-noise)`} />
                {[...Array(frostCount)].map((_, i) => (
                    <circle key={i} cx={`${Math.random() * 100}%`} cy={`${Math.random() * 100}%`} r={`${Math.random() * 20 + 5}%`} className="glass-surface__frost-point" />
                ))}
            </svg>
            <div className="glass-surface__content">{children}</div>
        </div>
    );
};

export default GlassSurface;
