import PropTypes from 'prop-types';
import Image from 'next/image';
import { Icon } from '@iconify/react';

const SinglePortfolio = ({ data, getData, priority = false }) => {
  const { imgLink, imgLinkLg, webLink, title, subTitle, effect, duration, delay } = data;

  return (
    <div className="col-lg-4 col-md-6" data-aos={effect} data-aos-duration={duration} data-aos-delay={delay}>
      <div className="st-portfolio-single st-style1" onClick={() => getData(imgLinkLg, title, subTitle, webLink)}>
        <div className="st-portfolio-item">
          <div className="st-portfolio st-zoom">
            <div className="st-portfolio-img st-zoom-in">
              <Image
                src={imgLink}
                alt={title}
                width={400}
                height={250}
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw"
                quality={75}
                priority={priority}
                loading={priority ? undefined : 'lazy'}
              />
            </div>
            <div className="st-portfolio-item-hover">
              <Icon icon="mdi:plus-circle" />
              <h5>{title}</h5>
              <p>{subTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SinglePortfolio.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  priority: PropTypes.bool,
};

export default SinglePortfolio;
