'use client';

import Link from 'next/link';
import './Header.scss';
import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Resume', href: '/resume' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  const [pathname, setPathname] = useState('');

  const handleToggleMenu = () => {
    setMobileToggle(!mobileToggle);
  };

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`st-site-header st-sticky-header st-style1 ${isScrolled ? 'st-sticky-active' : ''}`}>
      <div className="st-main-header">
        <div className="container">
          <div className="st-main-header-in">
            <div className="st-main-header-left">
              <Link className="st-site-branding" href="/" id="hero">
                <h1>
                  H<span style={{ color: '#FEC537' }}>R</span>
                </h1>
              </Link>
            </div>
            <div className="st-main-header-right">
              <div className="st-nav">
                <ul
                  className="st-nav-list st-onepage-nav"
                  style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                >
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={pathname === item.href ? 'active' : ''}
                        onClick={() => setMobileToggle(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div
                  className={`st-munu-toggle ${mobileToggle ? 'st-toggle-active' : ''} `}
                  onClick={handleToggleMenu}
                >
                  <span></span>
                </div>
                <div className="sp-phone">
                  <svg viewBox="0 0 513.64 513.64">
                    <path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z" />
                  </svg>
                  <div className="sp-phone-no">
                    <a href="tel:+923132453790">+92 3132453790</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
