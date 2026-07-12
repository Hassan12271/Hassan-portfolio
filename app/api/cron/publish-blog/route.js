import { NextResponse } from 'next/server';
import { publishDailyBlog } from '@/lib/blog/publishDailyBlog';

function isAuthorized(request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return false;
  }

  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${cronSecret}`;
}

export async function GET(request) {
  return handlePublish(request);
}

export async function POST(request) {
  return handlePublish(request);
}

async function handlePublish(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await publishDailyBlog();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Daily blog publish error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to publish daily blog post.',
      },
      { status: 500 },
    );
  }
}
