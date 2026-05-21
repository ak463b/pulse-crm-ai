import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hcpList: [
    { id: 1, name: 'Dr. Jane Smith', specialty: 'Oncology', hospital: 'Metro Cancer Institute', lastSeen: '2026-05-10', status: 'Target' },
    { id: 2, name: 'Dr. Alan Adams', specialty: 'Cardiology', hospital: 'St. Jude Heart Center', lastSeen: '2026-04-28', status: 'Target' },
    { id: 3, name: 'Dr. Robert Chen', specialty: 'Neurology', hospital: 'Neurological Care Center', lastSeen: '2026-05-15', status: 'Active' },
    { id: 4, name: 'Dr. Sarah Jenkins', specialty: 'Endocrinology', hospital: 'University Medical Hospital', lastSeen: '2026-03-12', status: 'Active' },
    { id: 5, name: 'Dr. Michael Chang', specialty: 'Oncology', hospital: 'City Oncology Hospital', lastSeen: '2026-05-02', status: 'Target' },
    { id: 6, name: 'Dr. Emily Taylor', specialty: 'Pediatrics', hospital: 'Childrens Health Center', lastSeen: '2026-05-19', status: 'Active' }
  ],
  selectedHcp: null,
  filters: {
    specialty: 'All',
    status: 'All',
    searchQuery: ''
  },
  isLoading: false,
  error: null
};

const hcpSlice = createSlice({
  name: 'hcp',
  initialState,
  reducers: {
    // Select an HCP to view their profile details or pass their context to the log screen
    setSelectedHcp: (state, action) => {
      state.selectedHcp = action.payload;
    },
    
    // Clear out the selection context
    clearSelectedHcp: (state) => {
      state.selectedHcp = null;
    },
    
    // Dynamically filter down directory queries
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Reset layout view filters completely
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // Core state flags to track data loading statuses from backend database layers
    setHcpLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    setHcpError: (state, action) => {
      state.error = action.payload;
    },
    
    // Update structural database mutations locally inside state (e.g., adding an HCP or updating target statuses)
    updateHcpRecord: (state, action) => {
      const index = state.hcpList.findIndex(hcp => hcp.id === action.payload.id);
      if (index !== -1) {
        state.hcpList[index] = { ...state.hcpList[index], ...action.payload };
      }
    }
  }
});

export const { 
  setSelectedHcp, 
  clearSelectedHcp, 
  updateFilters, 
  resetFilters, 
  setHcpLoading, 
  setHcpError,
  updateHcpRecord
} = hcpSlice.actions;

export default hcpSlice.reducer;