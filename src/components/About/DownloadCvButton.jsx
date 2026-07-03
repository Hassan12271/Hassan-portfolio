'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import portfolioData from '@/Data.json';
import { generateCvPdf } from '@/utils/generateCvPdf';

const DownloadCvButton = ({ className, children = 'Download CV' }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);

    try {
      generateCvPdf(portfolioData);
    } catch (error) {
      console.error('Failed to generate CV PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isGenerating ? 'Generating CV...' : children}
    </button>
  );
};

DownloadCvButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DownloadCvButton;
