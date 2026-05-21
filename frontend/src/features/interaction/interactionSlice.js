import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    hcpName: '',
    interactionType: 'Meeting',
    date: '2025-04-19',
    time: '19:36',
    attendees: '',
    topicsDiscussed: '',
    sentiment: 'neutral',
    outcomes: '',
    followUpActions: ''
  },
  chatMessages: [
    { sender: 'agent', text: 'Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.' }
  ],
  isLoading: false,
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    autoFillFromAgent: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetInteractionState: () => initialState
  }
});

export const { 
  updateFormField, 
  autoFillFromAgent, 
  addChatMessage, 
  setLoading,
  resetInteractionState 
} = interactionSlice.actions;

export default interactionSlice.reducer;