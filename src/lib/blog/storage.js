import fs from 'node:fs';
import path from 'node:path';

const postsFile = path.join(process.cwd(), 'src/data/blog-posts.json');

export function createLocalBlogStorage() {
  return {
    async read() {
      const raw = fs.readFileSync(postsFile, 'utf8');
      return JSON.parse(raw);
    },
    async write(posts) {
      fs.writeFileSync(postsFile, `${JSON.stringify(posts, null, 2)}\n`, 'utf8');
    },
    target: 'local',
  };
}

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER || 'Hassan12271';
  const repo = process.env.GITHUB_REPO_NAME || 'Hassan-portfolio';
  const branch = process.env.GITHUB_BRANCH || 'main';
  const filePath = process.env.BLOG_POSTS_FILE_PATH || 'src/data/blog-posts.json';

  if (!token) {
    throw new Error('Missing environment variable: GITHUB_TOKEN');
  }

  return { token, owner, repo, branch, filePath };
}

export function createGitHubBlogStorage() {
  const { token, owner, repo, branch, filePath } = getGitHubConfig();

  async function getFileMeta() {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub read failed: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  return {
    target: 'github',
    async read() {
      const file = await getFileMeta();
      const content = Buffer.from(file.content, 'base64').toString('utf8');
      return JSON.parse(content);
    },
    async write(posts) {
      const file = await getFileMeta();
      const content = Buffer.from(`${JSON.stringify(posts, null, 2)}\n`).toString('base64');

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify({
            message: `chore(blog): publish daily post (${new Date().toISOString().slice(0, 10)})`,
            content,
            sha: file.sha,
            branch,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub write failed: ${response.status} ${errorText}`);
      }

      return response.json();
    },
  };
}

export function createBlogStorage() {
  if (process.env.GITHUB_TOKEN) {
    return createGitHubBlogStorage();
  }

  return createLocalBlogStorage();
}
