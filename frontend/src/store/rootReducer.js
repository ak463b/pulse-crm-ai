import { combineReducers } from '@reduxjs/toolkit';
import interactionReducer from '../features/interaction/interactionSlice';
// import hcpReducer from '../features/hcp/hcpSlice'; // Uncomment when adding HCP module

const rootReducer = combineReducers({
  interaction: interactionReducer,
  // hcp: hcpReducer,
});

export default rootReducer;