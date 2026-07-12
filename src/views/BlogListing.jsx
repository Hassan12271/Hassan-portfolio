import SingleBlog from '@/components/Blog/SingleBlog';
import PageHero from '@/components/PageHero/PageHero';
import { blogPosts } from '@/data/blogPosts';
import '@/components/Blog/Blog.scss';

const BlogListing = () => (
  <>
    <PageHero title="Blog" subtitle="Tips on web development, SEO, and modern UI/UX." />
    <div className="st-height-b100 st-height-lg-b80" />
    <section id="blog">
      <div className="container">
        <div className="row">
          {blogPosts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.slug}>
              <SingleBlog
                element={{
                  imgLink: post.imgLink,
                  designation: post.designation,
                  date: post.date,
                  title: post.title,
                  href: `/blog/${post.slug}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    <div className="st-height-b100 st-height-lg-b80" />
  </>
);

export default BlogListing;
