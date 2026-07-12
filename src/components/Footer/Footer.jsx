import Link from 'next/link';
import './Footer.scss';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="st-footer-links text-center">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="st-copyright-wrap text-center">
          <div className="st-copyright-text">
            © {currentYear}. Designed by Hassan Raza. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
