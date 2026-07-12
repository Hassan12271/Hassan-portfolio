import { BLOG_AUTHOR, BLOG_AUTHOR_ROLE, blogImages, slugify, topicTemplates } from './automation.js';
import {
  generateJsonWithProvider,
  getAiProviderLabel,
  getProviderModel,
  isAnyAiProviderConfigured,
  resolveAiProvider,
} from './aiProviders.js';

const AUTHOR = {
  name: BLOG_AUTHOR,
  designation: BLOG_AUTHOR_ROLE,
  location: 'Karachi, Pakistan',
  website: 'https://www.hassanraxa.com',
};

const TOPIC_CATEGORIES = [
  'Next.js and React development',
  'WordPress for business websites',
  'SEO and technical optimization',
  'UI/UX and conversion-focused design',
  'Freelancing and client projects',
  'Performance and Core Web Vitals',
  'Contact forms, SMTP, and lead generation',
  'Portfolio and personal branding',
];

function pickCategory(date) {
  const dayIndex = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / (1000 * 60 * 60 * 24));
  return TOPIC_CATEGORIES[dayIndex % TOPIC_CATEGORIES.length];
}

function pickImage(date) {
  const numeric = Number(date.replace(/-/g, ''));
  return blogImages[numeric % blogImages.length];
}

function buildSystemPrompt() {
  return [
    `You are the blog writing AI for ${AUTHOR.name}, a web and app developer based in ${AUTHOR.location}.`,
    `Website: ${AUTHOR.website}`,
    'Write practical, original, SEO-friendly blog posts for developers, freelancers, and small business owners.',
    'Tone: clear, professional, helpful, not overly salesy.',
    'Audience: business owners and startups in Pakistan and internationally.',
    'Always return valid JSON only. No markdown fences.',
  ].join(' ');
}

function buildUserPrompt({ date, existingPosts, category, template }) {
  const recentTitles = existingPosts.map((post) => post.title).slice(0, 30);
  const seed = template
    ? `Optional angle: ${template.title}. Do not copy it exactly.`
    : 'Create a completely fresh angle.';

  return [
    `Write one unique blog post for ${date}.`,
    `Focus category: ${category}.`,
    seed,
    `Avoid these existing titles: ${recentTitles.join(' | ') || 'none'}`,
    'Requirements:',
    '- title: 8 to 14 words, specific and clickable',
    '- excerpt: 1 sentence meta description under 160 characters',
    '- tags: exactly 3 relevant tags',
    '- content: exactly 4 paragraphs, each 2 to 3 sentences',
    '- mention practical tips a business website owner can apply',
    'Return JSON with keys: title, excerpt, tags, content.',
  ].join('\n');
}

function normalizeContent(content) {
  if (Array.isArray(content)) {
    return content.map((paragraph) => String(paragraph).trim()).filter(Boolean);
  }

  if (typeof content === 'string') {
    return content
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return [];
}

function validateAiPayload(parsed) {
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('AI response was not a valid object.');
  }

  if (!parsed.title || typeof parsed.title !== 'string') {
    throw new Error('AI response missing title.');
  }

  if (!parsed.excerpt || typeof parsed.excerpt !== 'string') {
    throw new Error('AI response missing excerpt.');
  }

  if (!Array.isArray(parsed.tags) || parsed.tags.length < 2) {
    throw new Error('AI response missing tags.');
  }

  const content = normalizeContent(parsed.content);

  if (content.length < 2) {
    throw new Error('AI response missing content paragraphs.');
  }

  return {
    title: parsed.title.trim(),
    excerpt: parsed.excerpt.trim(),
    tags: parsed.tags.map((tag) => String(tag).trim()).filter(Boolean).slice(0, 4),
    content,
  };
}

function toBlogPost(parsed, date, providerLabel) {
  const title = parsed.title;

  return {
    slug: `${slugify(title)}-${date}`,
    title,
    excerpt: parsed.excerpt,
    date,
    author: AUTHOR.name,
    designation: AUTHOR.designation,
    imgLink: pickImage(date),
    tags: parsed.tags,
    content: parsed.content,
    generatedBy: 'ai',
    model: providerLabel,
  };
}

export function isAiWriterConfigured() {
  return isAnyAiProviderConfigured();
}

export async function generateBlogPostWithAI({ date, existingPosts = [] }) {
  const primaryProvider = resolveAiProvider();

  if (!primaryProvider) {
    throw new Error(
      'No AI provider configured. Add GEMINI_API_KEY (free) or GROQ_API_KEY (free) in environment variables.',
    );
  }

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const template = topicTemplates[dayIndex % topicTemplates.length];
  const category = pickCategory(date);
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt({ date, existingPosts, category, template });

  const providersToTry = [primaryProvider];
  if (primaryProvider === 'gemini' && process.env.GROQ_API_KEY) {
    providersToTry.push('groq');
  } else if (primaryProvider === 'groq' && process.env.GEMINI_API_KEY) {
    providersToTry.push('gemini');
  }

  let lastError = null;

  for (const provider of providersToTry) {
    try {
      const parsed = validateAiPayload(
        await generateJsonWithProvider({ provider, systemPrompt, userPrompt }),
      );

      return toBlogPost(parsed, date, `${provider}:${getProviderModel(provider)}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('AI blog generation failed.');
}
