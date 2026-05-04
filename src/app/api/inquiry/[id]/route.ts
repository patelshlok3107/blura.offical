import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    
    if (!status || !['new', 'contacted', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const result = await sql`
      UPDATE inquiries 
      SET status = ${status} 
      WHERE id = ${parseInt(params.id, 10)}
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update inquiry status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
