import { NextResponse } from 'next/server';

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    
    const backendUrl = `${BACKEND_BASE.replace(/\/$/, '')}/api/analytics/dashboard/keywords/${queryString ? `?${queryString}` : ''}`;

    const forwardHeaders = {};
    if (API_KEY) forwardHeaders['x-api-key'] = API_KEY;

    const res = await fetch(backendUrl, {
      method: 'GET',
      headers: forwardHeaders,
    });

    const responseContentType = res.headers.get('content-type') || 'application/json';
    const responseBody = res.body;

    return new Response(responseBody, {
      status: res.status,
      headers: { 'content-type': responseContentType },
    });
  } catch (err) {
    console.error('Proxy error to backend analytics keywords:', err);
    return NextResponse.json({ message: 'Proxy error', details: String(err) }, { status: 502 });
  }
}
