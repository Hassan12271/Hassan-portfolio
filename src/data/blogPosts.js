import blogPostsData from './blog-posts.json';

export const blogPosts = blogPostsData;

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogCarouselData() {
  return {
    useFor: 'blog',
    sliderSetting: {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            autoplay: true,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            autoplay: true,
          },
        },
      ],
    },
    informations: blogPosts.map((post) => ({
      imgLink: post.imgLink,
      author: post.author,
      date: post.date,
      title: post.title,
      href: `/blog/${post.slug}`,
    })),
  };
}
