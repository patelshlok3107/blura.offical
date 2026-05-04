import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, quantity, message, source, tags } = data;

    // Validate inputs
    if (!source) {
      return NextResponse.json({ error: 'Source is required' }, { status: 400 });
    }
    
    if (source === 'form' && !phone && !name) {
      return NextResponse.json({ error: 'Name or Phone is required for form submissions' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO inquiries (name, phone, quantity, message, source, tags)
      VALUES (${name || null}, ${phone || null}, ${quantity || null}, ${message || null}, ${source}, ${tags || null})
      RETURNING id;
    `;

    return NextResponse.json({ 
      success: true, 
      id: result.rows[0].id 
    });

  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
