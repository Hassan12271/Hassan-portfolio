'use client';

import PropTypes from 'prop-types';
import './Preloader.scss';

const Preloader = ({ autoHide = false, onHidden }) => (
  <div
    className={`st-preloader st-flex-center${autoHide ? ' st-preloader--auto-hide' : ''}`}
    onAnimationEnd={autoHide ? onHidden : undefined}
    aria-hidden="true"
  >
    <div className="st-preloader-in" />
  </div>
);

Preloader.propTypes = {
  autoHide: PropTypes.bool,
  onHidden: PropTypes.func,
};

export default Preloader;
