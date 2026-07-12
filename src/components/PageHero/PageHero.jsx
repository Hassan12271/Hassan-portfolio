import PropTypes from 'prop-types';
import './PageHero.scss';

const PageHero = ({ title, subtitle, background = '/images/background/hero-bg.jpg' }) => (
  <div className="st-page-heading st-bg" style={{ backgroundImage: `url(${background})` }}>
    <div className="container">
      <div className="st-page-heading-in text-center">
        <h1 className="st-page-heading-title">{title}</h1>
        {subtitle && <p className="st-page-hero-subtitle">{subtitle}</p>}
      </div>
    </div>
  </div>
);

PageHero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  background: PropTypes.string,
};

export default PageHero;
