import { getTodayDate } from '../src/lib/blog/automation.js';
import { createDailyBlogPost } from '../src/lib/blog/publishEngine.js';
import { createLocalBlogStorage } from '../src/lib/blog/storage.js';

async function main() {
  const storage = createLocalBlogStorage();
  const existingPosts = await storage.read();
  const date = process.env.BLOG_PUBLISH_DATE || getTodayDate();
  const result = await createDailyBlogPost(existingPosts, date);

  if (result.status === 'skipped') {
    console.log(result.reason);
    return;
  }

  await storage.write(result.posts);

  console.log(`Published blog post: ${result.post.title}`);
  console.log(`Slug: ${result.post.slug}`);
  console.log(`Date: ${result.post.date}`);
  console.log(`Mode: ${result.mode}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
