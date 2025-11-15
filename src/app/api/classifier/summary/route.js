import { NextResponse } from 'next/server';

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export async function POST(req) {
  try {
    const bodyBuffer = await req.arrayBuffer();
    const contentType = req.headers.get('content-type') || '';

    const forwardHeaders = {};
    if (contentType) forwardHeaders['content-type'] = contentType;
    if (API_KEY) forwardHeaders['x-api-key'] = API_KEY;

    const backendUrl = `${BACKEND_BASE.replace(/\/$/, '')}/api/classifier/summary/`;

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: forwardHeaders,
      body: bodyBuffer,
    });

    const responseContentType = res.headers.get('content-type') || 'application/json';
    const responseBody = res.body;

    return new Response(responseBody, {
      status: res.status,
      headers: { 'content-type': responseContentType },
    });
  } catch (err) {
    console.error('Proxy error to backend summary:', err);
    return NextResponse.json({ message: 'Proxy error', details: String(err) }, { status: 502 });
  }
}
