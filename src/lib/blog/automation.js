export const blogImages = [
  '/images/blog/blog1.jpg',
  '/images/blog/blog2.jpg',
  '/images/blog/blog3.jpg',
];

export const topicTemplates = [
  {
    title: 'Why Website Speed Matters for SEO and Conversions',
    excerpt:
      'A fast website improves search rankings, user trust, and lead generation for service businesses.',
    tags: ['Performance', 'SEO', 'Web Development'],
    content: [
      'Page speed is one of the strongest signals for both SEO and user experience. Slow websites lose visitors before they even see your offer.',
      'Optimize images, reduce unused JavaScript, and use modern frameworks like Next.js for efficient rendering.',
      'Measure performance with Lighthouse and real-device testing, not only desktop browser checks.',
      'Small speed improvements often lead to better engagement and more contact form submissions.',
    ],
  },
  {
    title: '5 Signs Your Business Website Needs a Redesign',
    excerpt:
      'Identify outdated design, poor mobile experience, and weak conversion paths before they hurt growth.',
    tags: ['Business Websites', 'UI/UX', 'Redesign'],
    content: [
      'If your website looks outdated, loads slowly, or is hard to use on mobile, it may be costing you clients.',
      'Broken layouts, unclear messaging, and missing call-to-action buttons are common redesign triggers.',
      'A modern redesign should improve branding, page structure, SEO, and lead capture together.',
      'Treat redesign as an investment in credibility, not just visual refresh.',
    ],
  },
  {
    title: 'React vs Next.js: What Should You Choose in 2026?',
    excerpt:
      'Understand when a React SPA is enough and when Next.js is the better production choice.',
    tags: ['React', 'Next.js', 'Frontend'],
    content: [
      'React is excellent for interactive UI, while Next.js adds routing, SEO, and production-ready architecture.',
      'For portfolios, business sites, and marketing pages, Next.js usually delivers better search visibility.',
      'Choose React alone when you are building a highly dynamic app with a separate backend and SEO is less important.',
      'The right choice depends on project goals, timeline, and long-term maintenance.',
    ],
  },
  {
    title: 'How to Structure a High-Converting Landing Page',
    excerpt:
      'Learn the section order and messaging flow that turns visitors into inquiries.',
    tags: ['Landing Pages', 'Conversion', 'UI/UX'],
    content: [
      'A strong landing page answers what you offer, who it is for, and how to contact you within seconds.',
      'Use a clear hero section, social proof, services, portfolio examples, and a visible contact CTA.',
      'Avoid clutter and long paragraphs above the fold. Scannable content performs better on mobile.',
      'Test your page with real users and track form submissions to improve conversion over time.',
    ],
  },
  {
    title: 'WordPress Maintenance Checklist for Business Owners',
    excerpt:
      'Keep your WordPress site secure, fast, and reliable with a simple monthly routine.',
    tags: ['WordPress', 'Maintenance', 'Security'],
    content: [
      'Regular updates for WordPress core, themes, and plugins are essential for security and stability.',
      'Back up your site before major updates and monitor uptime after plugin changes.',
      'Remove unused plugins, optimize images, and review form spam protection periodically.',
      'A maintained WordPress site is faster, safer, and easier to scale as your business grows.',
    ],
  },
  {
    title: 'Best Practices for Portfolio Project Case Studies',
    excerpt:
      'Showcase your work with context, tech stack, and outcomes that build client confidence.',
    tags: ['Portfolio', 'Case Studies', 'Freelancing'],
    content: [
      'Project case studies should explain the problem, your role, the solution, and the final result.',
      'Include screenshots, live links, and the technologies used on each project card or detail page.',
      'Measurable outcomes such as faster load times or improved lead flow make your work more convincing.',
      'Quality case studies help clients understand your process before they contact you.',
    ],
  },
  {
    title: 'Mobile-First Development: A Practical Starter Guide',
    excerpt:
      'Build websites for phones first, then scale up to tablet and desktop layouts.',
    tags: ['Mobile-First', 'Responsive Design', 'CSS'],
    content: [
      'Mobile-first design starts with the smallest screen layout and progressively enhances for larger breakpoints.',
      'Prioritize readable typography, large tap targets, and simple navigation on mobile.',
      'Test forms, menus, and image cropping on real devices to catch issues early.',
      'Google prioritizes mobile-friendly experiences, so this approach supports both UX and SEO.',
    ],
  },
  {
    title: 'How to Improve Contact Form Conversion on Service Websites',
    excerpt:
      'Reduce friction and increase inquiries with better form design and placement.',
    tags: ['Contact Forms', 'Conversion', 'UX'],
    content: [
      'Place your contact form where users naturally look for help: header CTA, dedicated contact page, and footer.',
      'Ask only for necessary fields and provide clear success or error messages after submission.',
      'Use SMTP or a reliable email API in production and test deliverability to inbox and spam folders.',
      'A simple, trustworthy form often outperforms complex multi-step flows for local service businesses.',
    ],
  },
  {
    title: 'Technical SEO Basics Every Developer Should Implement',
    excerpt:
      'Metadata, sitemaps, canonical URLs, and structured data explained for production sites.',
    tags: ['SEO', 'Next.js', 'Metadata'],
    content: [
      'Technical SEO starts with unique page titles, descriptions, and canonical URLs for every route.',
      'Add sitemap.xml and robots.txt so search engines can crawl your site efficiently.',
      'Structured data helps search engines understand your brand, services, and blog content.',
      'Combine technical SEO with fast performance and useful content for sustainable organic growth.',
    ],
  },
  {
    title: 'Choosing the Right Tech Stack for a Small Business Website',
    excerpt:
      'Compare WordPress, React, and Next.js based on budget, speed, and future needs.',
    tags: ['Tech Stack', 'Business Websites', 'Planning'],
    content: [
      'Small businesses need a stack that is affordable, maintainable, and easy to extend.',
      'WordPress works well for content-heavy sites with frequent updates by non-technical users.',
      'Next.js is ideal when performance, branding, and custom UI are top priorities.',
      'Pick the stack that matches your team skills and the next 12 months of business goals.',
    ],
  },
];

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function buildPostFromTemplate(template, date, imageIndex) {
  const baseSlug = slugify(template.title);

  return {
    slug: `${baseSlug}-${date}`,
    title: template.title,
    excerpt: template.excerpt,
    date,
    author: 'Hassan Raza',
    designation: 'Web Developer',
    imgLink: blogImages[imageIndex % blogImages.length],
    tags: template.tags,
    content: template.content,
    generatedBy: 'template',
  };
}
