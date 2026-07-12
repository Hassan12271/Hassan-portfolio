const PROVIDERS = ['gemini', 'groq', 'openai'];

function getExplicitProvider() {
  const value = process.env.BLOG_AI_PROVIDER?.toLowerCase();
  return PROVIDERS.includes(value) ? value : null;
}

export function resolveAiProvider() {
  const explicit = getExplicitProvider();

  if (explicit === 'gemini' && process.env.GEMINI_API_KEY) {
    return 'gemini';
  }

  if (explicit === 'groq' && process.env.GROQ_API_KEY) {
    return 'groq';
  }

  if (explicit === 'openai' && process.env.OPENAI_API_KEY) {
    return 'openai';
  }

  if (process.env.GEMINI_API_KEY) {
    return 'gemini';
  }

  if (process.env.GROQ_API_KEY) {
    return 'groq';
  }

  if (process.env.OPENAI_API_KEY) {
    return 'openai';
  }

  return null;
}

export function getProviderModel(provider) {
  switch (provider) {
    case 'gemini':
      return process.env.GEMINI_MODEL || 'gemini-flash-latest';
    case 'groq':
      return process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    case 'openai':
      return process.env.OPENAI_MODEL || 'gpt-4o-mini';
    default: {
      const unexpected = provider;
      throw new Error(`Unsupported AI provider: ${unexpected}`);
    }
  }
}

function extractJsonObject(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(candidate);
}

async function callGemini({ systemPrompt, userPrompt }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = getProviderModel('gemini');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.85,
          responseMimeType: 'application/json',
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const rawContent = payload.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawContent) {
    throw new Error('Gemini returned an empty response.');
  }

  return extractJsonObject(rawContent);
}

async function callGroq({ systemPrompt, userPrompt }) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = getProviderModel('groq');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.85,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const rawContent = payload.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error('Groq returned an empty response.');
  }

  return extractJsonObject(rawContent);
}

async function callOpenAI({ systemPrompt, userPrompt }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = getProviderModel('openai');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.85,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API failed: ${response.status} ${errorText}`);
  }

  const payload = await response.json();
  const rawContent = payload.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error('OpenAI returned an empty response.');
  }

  return extractJsonObject(rawContent);
}

export async function generateJsonWithProvider({ provider, systemPrompt, userPrompt }) {
  switch (provider) {
    case 'gemini':
      return callGemini({ systemPrompt, userPrompt });
    case 'groq':
      return callGroq({ systemPrompt, userPrompt });
    case 'openai':
      return callOpenAI({ systemPrompt, userPrompt });
    default: {
      const unexpected = provider;
      throw new Error(`Unsupported AI provider: ${unexpected}`);
    }
  }
}

export function isAnyAiProviderConfigured() {
  return resolveAiProvider() !== null;
}

export function getAiProviderLabel() {
  const provider = resolveAiProvider();
  if (!provider) {
    return null;
  }

  return `${provider}:${getProviderModel(provider)}`;
}
