import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable static caching for dashboard

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const sort = searchParams.get('sort') || 'desc';

    let result;

    if (status && status !== 'all') {
      if (sort.toLowerCase() === 'asc') {
        result = await sql`SELECT * FROM inquiries WHERE status = ${status} ORDER BY created_at ASC`;
      } else {
        result = await sql`SELECT * FROM inquiries WHERE status = ${status} ORDER BY created_at DESC`;
      }
    } else {
      if (sort.toLowerCase() === 'asc') {
        result = await sql`SELECT * FROM inquiries ORDER BY created_at ASC`;
      } else {
        result = await sql`SELECT * FROM inquiries ORDER BY created_at DESC`;
      }
    }

    return NextResponse.json({ inquiries: result.rows });
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
