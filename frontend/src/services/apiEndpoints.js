import { API_ROUTES } from '../utils/constants';

export const buildChatUrl = () => API_ROUTES.CHAT;
export const buildInteractionsUrl = () => API_ROUTES.INTERACTIONS;
export const buildHcpUrl = (hcpId) => `${API_ROUTES.HCPS}/${hcpId}`;