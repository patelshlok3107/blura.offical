'use client';
import { useEffect, useState } from 'react';

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  quantity: string;
  message: string;
  source: string;
  status: string;
  tags: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  async function fetchInquiries() {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries?status=${filter}`);
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInquiries();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/inquiry/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      // Optimistic UI update
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const exportCSV = () => {
    window.location.href = '/api/export-csv';
  };

  const statusColors: Record<string, string> = {
    new: '#3b82f6',
    contacted: '#f59e0b',
    closed: '#10b981',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '60px 40px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', color: 'var(--dark-blue)', marginBottom: '8px' }}>
              Lead Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manage bulk inquiries and WhatsApp click tracking.</p>
          </div>
          <button 
            onClick={exportCSV}
            style={{ 
              background: 'var(--dark-blue)', color: 'white', padding: '10px 20px', borderRadius: '4px',
              border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500' 
            }}
          >
            Export to CSV
          </button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          {['all', 'new', 'contacted', 'closed'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: `1px solid ${filter === s ? 'var(--dark-blue)' : 'var(--silver)'}`,
                background: filter === s ? 'var(--dark-blue)' : 'transparent',
                color: filter === s ? 'white' : 'var(--text-secondary)',
                fontSize: '12px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f9fa', borderBottom: '1px solid var(--silver-light)' }}>
                <th style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Date</th>
                <th style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Source</th>
                <th style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Contact Info</th>
                <th style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Details</th>
                <th style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Tags</th>
                <th style={{ padding: '16px', fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>Loading...</td></tr>
              ) : inquiries.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)' }}>No inquiries found.</td></tr>
              ) : (
                inquiries.map(inq => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid var(--silver-light)' }}>
                    <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{ 
                        background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', 
                        fontSize: '11px', color: '#475569' 
                      }}>
                        {inq.source}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{inq.name || '-'}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{inq.phone || '-'}</div>
                    </td>
                    <td style={{ padding: '16px', maxWidth: '250px' }}>
                      {inq.quantity && <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>Qty: {inq.quantity}</div>}
                      {inq.message && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{inq.message}</div>}
                    </td>
                    <td style={{ padding: '16px' }}>
                      {inq.tags && inq.tags.split(',').map(tag => (
                        <span key={tag} style={{ 
                          background: '#e0e7ff', color: '#4338ca', padding: '2px 6px', 
                          borderRadius: '4px', fontSize: '10px', marginRight: '4px', textTransform: 'uppercase'
                        }}>
                          {tag.trim()}
                        </span>
                      ))}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <select 
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          border: `1px solid ${statusColors[inq.status] || '#cbd5e1'}`,
                          color: statusColors[inq.status] || '#475569',
                          background: 'transparent',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          outline: 'none',
                          appearance: 'none',
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

