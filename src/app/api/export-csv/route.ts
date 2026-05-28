import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const revalidate = 0; // Disable static caching for export

export async function GET() {
  try {
    const result = await sql`SELECT * FROM inquiries ORDER BY created_at DESC`;
    const inquiries = result.rows;

    if (inquiries.length === 0) {
      return NextResponse.json({ error: 'No data to export' }, { status: 404 });
    }

    // Generate CSV string
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Quantity', 'Source', 'Status', 'Message'];
    
    const csvRows = inquiries.map(inq => {
      // Escape quotes and wrap fields in quotes to handle commas within text
      const cleanField = (val: unknown) => {
        if (!val) return '""';
        return `"${String(val).replace(/"/g, '""')}"`;
      };

      return [
        cleanField(inq.id),
        cleanField(new Date(inq.created_at).toLocaleString()),
        cleanField(inq.name),
        cleanField(inq.phone),
        cleanField(inq.quantity),
        cleanField(inq.source),
        cleanField(inq.status),
        cleanField(inq.message)
      ].join(',');
    });

    const csvContent = [headers.join(','), ...csvRows].join('\n');

    // Return as downloadable file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="blura_leads_export.csv"'
      }
    });

  } catch (error) {
    console.error('Failed to export CSV:', error);
    return NextResponse.json({ error: 'Failed to generate CSV' }, { status: 500 });
  }
}
