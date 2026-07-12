import { buildPostFromTemplate, getTodayDate, topicTemplates } from './automation.js';
import { generateBlogPostWithAI, isAiWriterConfigured } from './blogAiWriter.js';

export function shouldUseAiWriter() {
  if (process.env.BLOG_AUTOMATION_MODE === 'template') {
    return false;
  }

  return isAiWriterConfigured();
}

export async function createDailyBlogPost(existingPosts, date = getTodayDate()) {
  if (existingPosts.some((post) => post.date === date)) {
    return { status: 'skipped', reason: `Post for ${date} already exists.` };
  }

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const template = topicTemplates[dayIndex % topicTemplates.length];
  let newPost = null;
  let mode = 'template';

  if (shouldUseAiWriter()) {
    newPost = await generateBlogPostWithAI({ date, existingPosts });
    mode = newPost.model || 'ai';
  } else if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
    throw new Error(
      'Blog AI is not configured. Add GEMINI_API_KEY (free) or GROQ_API_KEY (free) in Vercel environment variables.',
    );
  } else {
    newPost = buildPostFromTemplate(template, date, dayIndex);
  }

  if (existingPosts.some((post) => post.slug === newPost.slug)) {
    newPost = {
      ...newPost,
      slug: `${newPost.slug}-${Date.now()}`,
    };
  }

  const updatedPosts = [newPost, ...existingPosts].slice(0, 120);

  return {
    status: 'published',
    post: newPost,
    posts: updatedPosts,
    mode,
  };
}
