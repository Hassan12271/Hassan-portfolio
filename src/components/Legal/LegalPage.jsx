import PropTypes from 'prop-types';
import Link from 'next/link';
import './LegalPage.scss';

const LegalPage = ({ title, sections }) => (
  <section className="st-legal-page st-dark-bg">
    <div className="st-height-b100 st-height-lg-b80" />
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <h1 className="st-legal-title">{title}</h1>
          <p className="st-legal-updated">Last updated: July 12, 2026</p>
          {sections.map((section) => (
            <div className="st-legal-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
          <p className="st-legal-contact">
            Questions? Contact us at{' '}
            <Link href="/contact">the contact page</Link> or email{' '}
            <a href="mailto:hassandanyal18@gmail.com">hassandanyal18@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
    <div className="st-height-b100 st-height-lg-b80" />
  </section>
);

LegalPage.propTypes = {
  title: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default LegalPage;
