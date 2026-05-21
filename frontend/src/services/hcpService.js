import apiClient from './apiClient';
import { buildHcpUrl } from './apiEndpoints';
import { API_ROUTES } from '../utils/constants';

/**
 * Fetches the full list of Healthcare Professionals, optionally applying search filters.
 * Maps to FastAPI GET /api/hcps
 */
export const fetchAllHcps = async (filters = {}) => {
  try {
    const response = await apiClient.get(API_ROUTES.HCPS, { 
      params: filters // Axios automatically converts this to query strings like ?specialty=Oncology
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching HCP directory:", error);
    throw error;
  }
};

/**
 * Fetches a single HCP's detailed profile and interaction history.
 * Maps to FastAPI GET /api/hcps/{hcpId}
 */
export const fetchHcpById = async (hcpId) => {
  try {
    const response = await apiClient.get(buildHcpUrl(hcpId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching HCP with ID ${hcpId}:`, error);
    throw error;
  }
};

/**
 * Updates an HCP's record (e.g., changing their status from 'Active' to 'Target').
 * Maps to FastAPI PATCH or PUT /api/hcps/{hcpId}
 */
export const updateHcpRecord = async (hcpId, updateData) => {
  try {
    const response = await apiClient.patch(buildHcpUrl(hcpId), updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating HCP ${hcpId}:`, error);
    throw error;
  }
};