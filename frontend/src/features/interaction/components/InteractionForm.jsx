import './LogInteractionScreen.css';

const InteractionForm = () => {
  // In a real app, you'd pull this from Redux: const formData = useSelector(...)
  
  return (
    <div className="interaction-form">
      <h3 className="section-title">Interaction Details</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">HCP Name</label>
          <input type="text" className="form-input" placeholder="Search or select HCP..." />
        </div>
        <div className="form-group">
          <label className="form-label">Interaction Type</label>
          <select className="form-input">
            <option>Meeting</option>
            <option>Call</option>
            <option>Email</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Date</label>
          <input type="date" className="form-input" defaultValue="2025-04-19" />
        </div>
        <div className="form-group">
          <label className="form-label">Time</label>
          <input type="time" className="form-input" defaultValue="19:36" />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label">Attendees</label>
        <input type="text" className="form-input" placeholder="Enter names or search..." />
      </div>

      <div className="form-group" style={{ marginBottom: '8px' }}>
        <label className="form-label">Topics Discussed</label>
        <textarea className="form-input" placeholder="Enter key discussion points..." rows="3"></textarea>
      </div>
      
      <button style={{ background: '#f3f4f6', border: '1px solid #d1d5db', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>🪄</span> Summarize from Voice Note (Requires Consent)
      </button>

      <h3 className="section-title">Materials Shared / Samples Distributed</h3>
      <div className="form-row" style={{ alignItems: 'center' }}>
        <div className="form-group"><label className="form-label">Materials Shared</label><p style={{fontSize:'12px', color:'#9ca3af'}}>No materials added.</p></div>
        <button className="form-input" style={{ width: 'auto', cursor: 'pointer' }}>🔍 Search/Add</button>
      </div>
      <div className="form-row" style={{ alignItems: 'center' }}>
        <div className="form-group"><label className="form-label">Samples Distributed</label><p style={{fontSize:'12px', color:'#9ca3af'}}>No samples added.</p></div>
        <button className="form-input" style={{ width: 'auto', cursor: 'pointer' }}>📦 Add Sample</button>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label">Observed/Inferred HCP Sentiment</label>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
          <label><input type="radio" name="sentiment" value="positive" /> Positive</label>
          <label><input type="radio" name="sentiment" value="neutral" defaultChecked /> Neutral</label>
          <label><input type="radio" name="sentiment" value="negative" /> Negative</label>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label">Outcomes</label>
        <textarea className="form-input" placeholder="Key outcomes or agreements..." rows="2"></textarea>
      </div>

      <div className="form-group" style={{ marginBottom: '16px' }}>
        <label className="form-label">Follow-up Actions</label>
        <textarea className="form-input" placeholder="Enter next steps or tasks..." rows="2"></textarea>
      </div>

      {/* AI Suggested Follow-ups Section */}
      <div style={{ backgroundColor: '#f0fdf4', padding: '12px', borderRadius: '4px', border: '1px solid #bbf7d0' }}>
        <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#166534', margin: '0 0 8px 0' }}>AI Suggested Follow-ups:</p>
        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#2563eb', cursor: 'pointer', listStyleType: 'none' }}>
          <li style={{ marginBottom: '4px' }}>+ Schedule follow-up meeting in 2 weeks</li>
          <li style={{ marginBottom: '4px' }}>+ Send OncoBoost Phase III PDF</li>
          <li>+ Add Dr. Sharma to advisory board invite list</li>
        </ul>
      </div>
    </div>
  );
};

export default InteractionForm;