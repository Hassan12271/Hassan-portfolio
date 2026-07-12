import PropTypes from 'prop-types';
import '@/components/Blog/BlogDetails.scss';
import './PageHero.scss';

const PageHero = ({
  title,
  subtitle,
  background = '/images/background/hero-bg.jpg',
  compact = true,
}) => (
  <div
    className={`st-page-heading st-bg${compact ? ' st-style1' : ''}`}
    style={{ backgroundImage: `url(${background})` }}
  >
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
  compact: PropTypes.bool,
};

export default PageHero;
