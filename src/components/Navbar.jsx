import React, { useState, useEffect } from 'react';
import { FloatingDock } from './ui/floating-dock';
import GlassSurface from './GlassSurface';
import {
  IconHome,
  IconUser,
  IconCode,
  IconBriefcase,
  IconAward,
  IconCertificate,
  IconMail,
  IconSun,
  IconMoon
} from '@tabler/icons-react';
import './Navbar.css';

const Navbar = ({ scrollProgress }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      if (nextMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return nextMode;
    });
  };

  const links = [
    { title: 'Home', icon: <IconHome style={{ width: '100%', height: '100%' }} />, href: '#home' },
    { title: 'About', icon: <IconUser style={{ width: '100%', height: '100%' }} />, href: '#about' },
    { title: 'Expertise', icon: <IconCode style={{ width: '100%', height: '100%' }} />, href: '#skills' },
    { title: 'Experience', icon: <IconBriefcase style={{ width: '100%', height: '100%' }} />, href: '#experience' },
    { title: 'Achievements', icon: <IconAward style={{ width: '100%', height: '100%' }} />, href: '#achievements' },
    { title: 'Wall Of Fame', icon: <IconCertificate style={{ width: '100%', height: '100%' }} />, href: '#wall-of-fame' },
    { title: 'Contact', icon: <IconMail style={{ width: '100%', height: '100%' }} />, href: '#contact' },
    {
      title: isDarkMode ? 'Light Mode' : 'Dark Mode',
      icon: isDarkMode ? <IconSun style={{ width: '100%', height: '100%' }} /> : <IconMoon style={{ width: '100%', height: '100%' }} />,
      onClick: toggleDarkMode,
      href: '#'
    }
  ];

  return (
    <div className="navbar-dock-wrapper">
      <GlassSurface
        width="auto"
        height={65}
        borderRadius={50}
        displace={0.5}
        distortionScale={-80}
        redOffset={10}
        greenOffset={5}
        blueOffset={15}
        brightness={110}
        opacity={0.8}
        mixBlendMode="normal"
        className="custom-glass-nav"
      >
        <FloatingDock items={links} />
      </GlassSurface>
    </div>
  );
};

export default Navbar;
