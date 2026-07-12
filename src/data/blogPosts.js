export const blogPosts = [
  {
    slug: 'nextjs-seo-best-practices',
    title: 'Next.js SEO Best Practices for Portfolio and Business Websites',
    excerpt:
      'Learn how to improve search visibility with metadata, sitemaps, structured data, and performance-focused Next.js setup.',
    date: '2026-03-10',
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: '/images/blog/blog1.jpg',
    tags: ['Next.js', 'SEO', 'Web Development'],
    content: [
      'Search engine optimization is not only about keywords. For modern websites built with Next.js, technical SEO matters just as much as content quality.',
      'Start with strong page metadata: unique titles, descriptions, canonical URLs, and Open Graph tags for every route. This helps Google and social platforms understand each page clearly.',
      'Add a sitemap and robots file so crawlers can discover your pages efficiently. Use structured data such as Person and WebSite schema for portfolio sites to improve rich result eligibility.',
      'Performance is also an SEO signal. Optimize images, reduce JavaScript where possible, and use server rendering for important content pages. A fast website improves both ranking potential and user trust.',
    ],
  },
  {
    slug: 'building-fast-react-portfolio',
    title: 'Building a Fast React Portfolio That Converts Visitors into Clients',
    excerpt:
      'A practical guide to structuring portfolio pages, showcasing projects, and improving lead generation.',
    date: '2026-02-18',
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: '/images/blog/blog2.jpg',
    tags: ['React', 'Portfolio', 'UI/UX'],
    content: [
      'A portfolio website should do one job well: prove your skills and make it easy to contact you.',
      'Use clear sections for About, Services, Projects, Resume, and Contact. Each section should answer a client question quickly without forcing users to hunt for information.',
      'Project cards should include role, tech stack, and live links where possible. Real screenshots and measurable outcomes build more trust than generic template content.',
      'Always include a visible call to action. A contact form, WhatsApp link, or booking button near the top and bottom of the page can significantly improve inquiry rates.',
    ],
  },
  {
    slug: 'responsive-design-checklist',
    title: 'Responsive Design Checklist for Modern Business Websites',
    excerpt:
      'Essential responsive design practices to keep layouts clean on mobile, tablet, and desktop.',
    date: '2026-01-22',
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: '/images/blog/blog3.jpg',
    tags: ['Responsive Design', 'CSS', 'UI/UX'],
    content: [
      'Most users now visit websites from mobile devices, so responsive design is no longer optional.',
      'Use flexible grids, scalable typography, and touch-friendly buttons. Navigation should remain usable on small screens without hiding critical links.',
      'Test real pages on multiple breakpoints, not just browser resize. Check forms, image cropping, spacing, and loading behavior on actual phones.',
      'A responsive site improves engagement, reduces bounce rate, and supports better SEO performance over time.',
    ],
  },
  {
    slug: 'smtp-contact-forms-nextjs',
    title: 'How to Set Up SMTP Contact Forms in Next.js',
    excerpt:
      'Step-by-step overview of secure contact form delivery using API routes and SMTP providers.',
    date: '2025-12-05',
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: '/images/blog/blog1.jpg',
    tags: ['Next.js', 'SMTP', 'API Routes'],
    content: [
      'Contact forms are one of the most important features on service websites. In Next.js, the best approach is an API route that validates input and sends email through SMTP.',
      'Store SMTP credentials in environment variables and never expose them in client-side code. Validate required fields server-side and return clear success or error messages.',
      'For Gmail, use an App Password with 2FA enabled. For production workloads, dedicated email services can provide better deliverability and logging.',
      'After deployment, test the full flow on production and monitor function logs to catch configuration issues early.',
    ],
  },
  {
    slug: 'wordpress-vs-nextjs',
    title: 'WordPress vs Next.js: Which Is Better for Your Business Website?',
    excerpt:
      'Compare flexibility, performance, SEO, and maintenance when choosing between WordPress and Next.js.',
    date: '2025-11-14',
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: '/images/blog/blog2.jpg',
    tags: ['WordPress', 'Next.js', 'Business Websites'],
    content: [
      'WordPress is excellent for content-heavy sites with frequent updates and non-technical editors. Its plugin ecosystem makes many features quick to launch.',
      'Next.js is ideal when performance, custom UI, and scalable architecture are priorities. It works well for portfolios, SaaS landing pages, and modern business sites.',
      'The right choice depends on your team, budget, and long-term goals. Some businesses use WordPress for content and Next.js for high-performance frontends.',
      'In both cases, SEO fundamentals remain the same: fast loading, mobile-friendly design, clear structure, and high-quality content.',
    ],
  },
  {
    slug: 'ui-ux-principles-for-developers',
    title: 'UI/UX Principles Every Web Developer Should Follow',
    excerpt:
      'Simple design principles that improve usability, readability, and conversion on any website.',
    date: '2025-10-02',
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: '/images/blog/blog3.jpg',
    tags: ['UI/UX', 'Design', 'Frontend'],
    content: [
      'Good UI/UX is about clarity. Users should understand what your website offers within the first few seconds.',
      'Maintain visual hierarchy with consistent spacing, typography, and color contrast. Important actions should stand out without overwhelming the layout.',
      'Reduce friction in forms and navigation. Fewer unnecessary fields and clear labels improve completion rates.',
      'Developers who understand UX basics deliver websites that look professional and feel intuitive, which directly supports business goals.',
    ],
  },
];

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
      designation: post.designation,
      date: post.date,
      title: post.title,
      href: `/blog/${post.slug}`,
    })),
  };
}
