'use client';

import Link from 'next/link';
import './Blog.scss';
import PropTypes from 'prop-types';
import { BLOG_AUTHOR } from '@/lib/blog/automation';

const SingleBlog = ({ element }) => {
  const { imgLink, title, date, author, href } = element;
  const authorName = author || BLOG_AUTHOR;

  return (
    <div className={`st-post-single st-style1`}>
      <Link href={href} className="st-post-thumb st-zoom">
        <img src={imgLink} className="st-zoom-in" alt={title} />
      </Link>
      <div className="st-post-info">
        <div className="st-post-date">
          <span>By: {authorName}</span>
          <span className="st-post-date-divider">|</span>
          <span className="st-post-publish-date">{date}</span>
        </div>
        <h4 className="st-post-title">
          <Link href={href}>{title}</Link>
        </h4>
      </div>
    </div>
  );
};

SingleBlog.propTypes = {
  element: PropTypes.object,
};

export default SingleBlog;
