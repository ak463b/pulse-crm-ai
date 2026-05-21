import apiClient from './apiClient';

export const sendChatMessageToAgent = async (message, currentFormData) => {
  try {
    const response = await apiClient.post('/chat', {
      message: message,
      context: currentFormData // Give the agent the current form state
    });
    
    // Expecting FastAPI to return: { reply: string, extractedData: object }
    return response.data; 
  } catch (error) {
    console.error("Error communicating with AI Agent:", error);
    throw error;
  }
};