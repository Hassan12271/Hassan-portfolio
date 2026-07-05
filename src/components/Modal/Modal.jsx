import Image from 'next/image';
import './Modal.scss';

const Modal = ({ img, title, subTitle, modalClose, portfolioUrl }) => {
  const modalStyle = {
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'block',
  };

  return (
    <div className="modal show fade bd-example-modal-lg" style={modalStyle}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                {title} <span className="link">Veiw Full Wesbite</span>
              </a>
            </h4>
            <button type="button" className="btn-close" onClick={modalClose}></button>
          </div>
          <div className="modal-body">
            <div className="st-flex-center modal-image-wrap">
              <Image
                src={img}
                alt={title}
                width={1200}
                height={750}
                sizes="(max-width: 992px) 100vw, 900px"
                quality={80}
                priority
              />
            </div>
            <p className="modal-subtitle">{subTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
