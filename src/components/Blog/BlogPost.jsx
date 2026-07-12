import Link from 'next/link';
import PropTypes from 'prop-types';
import '../Blog/Blog.scss';
import '../Blog/BlogDetails.scss';

const BlogPost = ({ post }) => (
  <section className="st-content">
    <div
      className="st-page-heading st-bg"
      style={{ backgroundImage: 'url(/images/background/hero-bg.jpg)' }}
    >
      <div className="container">
        <div className="st-page-heading-in text-center">
          <h1 className="st-page-heading-title">{post.title}</h1>
          <div className="st-post-label">
            <span>
              By <span>{post.author}</span>
            </span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="st-height-b100 st-height-lg-b80" />
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <div className="st-post-details st-style1">
            <img className="st-zoom-in" src={post.imgLink} alt={post.title} />
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="st-post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="st-tag">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/blog" className="st-btn st-style1 st-color1">
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="st-height-b100 st-height-lg-b80" />
  </section>
);

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imgLink: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default BlogPost;
