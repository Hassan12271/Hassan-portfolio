import { getTodayDate } from './automation.js';
import { createDailyBlogPost } from './publishEngine.js';
import { createBlogStorage } from './storage';

export async function publishDailyBlog(date = process.env.BLOG_PUBLISH_DATE || getTodayDate()) {
  const storage = createBlogStorage();
  const existingPosts = await storage.read();
  const result = await createDailyBlogPost(existingPosts, date);

  if (result.status === 'skipped') {
    return {
      ok: true,
      skipped: true,
      reason: result.reason,
      storage: storage.target,
    };
  }

  await storage.write(result.posts);

  return {
    ok: true,
    skipped: false,
    storage: storage.target,
    mode: result.mode,
    post: {
      title: result.post.title,
      slug: result.post.slug,
      date: result.post.date,
    },
  };
}
