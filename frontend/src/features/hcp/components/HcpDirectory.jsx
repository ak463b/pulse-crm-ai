import React, { useState } from 'react';
import HcpSearch from './HcpSearch';
import HcpProfileCard from './HcpProfileCard';

// Realistic Mock Data for Life Science / Pharma Representatives
const MOCK_HCPS = [
  { id: 1, name: 'Dr. Jane Smith', specialty: 'Oncology', hospital: 'Metro Cancer Institute', lastSeen: '2026-05-10', status: 'Target' },
  { id: 2, name: 'Dr. Alan Adams', specialty: 'Cardiology', hospital: 'St. Jude Heart Center', lastSeen: '2026-04-28', status: 'Target' },
  { id: 3, name: 'Dr. Robert Chen', specialty: 'Neurology', hospital: 'Neurological Care Center', lastSeen: '2026-05-15', status: 'Active' },
  { id: 4, name: 'Dr. Sarah Jenkins', specialty: 'Endocrinology', hospital: 'University Medical Hospital', lastSeen: '2026-03-12', status: 'Active' },
  { id: 5, name: 'Dr. Michael Chang', specialty: 'Oncology', hospital: 'City Oncology Hospital', lastSeen: '2026-05-02', status: 'Target' },
  { id: 6, name: 'Dr. Emily Taylor', specialty: 'Pediatrics', hospital: 'Childrens Health Center', lastSeen: '2026-05-19', status: 'Active' }
];

const HcpDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHcps = MOCK_HCPS.filter(hcp =>
    hcp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hcp.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hcp.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectHcp = (hcp) => {
    console.log("Selected HCP Record Context:", hcp);
    alert(`Routing view context context to profile page for: ${hcp.name}`);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#f4f5f7', minHeight: 'calc(100vh - 64px)', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#1f2937' }}>Healthcare Professionals Directory</h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
          Select target medical contacts to review historical call activity, clinical notes, and sample management records.
        </p>
      </div>

      <HcpSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredHcps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb', color: '#6b7280' }}>
          No healthcare practitioners found matching your lookup filters.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {filteredHcps.map((hcp) => (
            <HcpProfileCard 
              key={hcp.id} 
              hcp={hcp} 
              onSelect={handleSelectHcp} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HcpDirectory;