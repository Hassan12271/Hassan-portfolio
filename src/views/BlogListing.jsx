import SingleBlog from '@/components/Blog/SingleBlog';
import PageHero from '@/components/PageHero/PageHero';
import { pageBanners } from '@/lib/pageBanners';
import { blogPosts } from '@/data/blogPosts';
import '@/components/Blog/Blog.scss';

const BlogListing = () => (
  <>
    <PageHero
      title="Blog"
      subtitle="Tips on web development, SEO, and modern UI/UX."
      background={pageBanners.blog}
    />
    <div className="st-height-b100 st-height-lg-b80" />
    <section id="blog" className="st-blog-listing">
      <div className="container">
        <div className="row g-4 g-lg-5">
          {blogPosts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.slug}>
              <SingleBlog
                element={{
                  imgLink: post.imgLink,
                  author: post.author,
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
