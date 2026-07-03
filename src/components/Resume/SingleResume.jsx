'use client';

import PropTypes from 'prop-types';
import { formatLiveDuration } from '@/utils/experienceDuration';

const SingleResume = ({ element }) => {
  const { title, duration, subTitle, text, isCurrent, durationStart } = element;

  const displayDuration =
    isCurrent && durationStart
      ? formatLiveDuration(duration, durationStart)
      : duration;

  return (
    <div className="st-resume-timeline">
      <h3 className="st-resume-timeline-title">{title}</h3>
      <div className="st-resume-timeline-duration">{displayDuration}</div>
      <h4 className="st-resume-timeline-subtitle">{subTitle}</h4>
      <div className="st-resume-timeline-text">
        <p>{text}</p>
      </div>
    </div>
  );
};

SingleResume.propTypes = {
  element: PropTypes.object,
};

export default SingleResume;
