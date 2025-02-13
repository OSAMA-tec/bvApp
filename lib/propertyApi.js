import axios from 'axios';
import { BASE_URL } from './api';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const propertyAPI = {
    // Create new property
    createProperty: async (propertyData, token, retryCount = 0) => {
        try {
            const formData = new FormData();

            // Required fields validation
            const requiredFields = ['title', 'description', 'propertyType', 'price', 'address', 'coordinates'];
            const missingFields = requiredFields.filter(field => {
                if (field === 'coordinates') {
                    return !propertyData.coordinates || propertyData.coordinates.length !== 2;
                }
                return !propertyData[field];
            });

            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }

            // Validate coordinates format
            if (!Array.isArray(propertyData.coordinates) || propertyData.coordinates.length !== 2) {
                throw new Error('Coordinates must be an array of exactly 2 numbers');
            }

            const [longitude, latitude] = propertyData.coordinates.map(coord => {
                const num = parseFloat(coord);
                if (isNaN(num)) {
                    throw new Error('Coordinates must be valid numbers');
                }
                return num;
            });

            if (longitude < -180 || longitude > 180) {
                throw new Error('Longitude must be between -180 and 180');
            }
            if (latitude < -90 || latitude > 90) {
                throw new Error('Latitude must be between -90 and 90');
            }

            // Format coordinates as strings for the API
            formData.append('coordinates[0]', longitude.toString());
            formData.append('coordinates[1]', latitude.toString());

            // Add required fields
            formData.append('title', propertyData.title.trim());
            formData.append('description', propertyData.description.trim());
            formData.append('propertyType', propertyData.propertyType);
            formData.append('price', propertyData.price.toString());
            formData.append('address', propertyData.address.trim());

            // Optional numeric fields with validation
            const numericFields = {
                area: { min: 0 },
                bedrooms: { min: 0 },
                bathrooms: { min: 0 },
                yearBuilt: { min: 1800, max: new Date().getFullYear() },
                minimumBid: { min: 0 }
            };

            Object.entries(numericFields).forEach(([field, validation]) => {
                if (propertyData[field] !== undefined && propertyData[field] !== null) {
                    const value = Number(propertyData[field]);
                    if (isNaN(value)) {
                        throw new Error(`${field} must be a valid number`);
                    }
                    if (value < validation.min) {
                        throw new Error(`${field} must be greater than or equal to ${validation.min}`);
                    }
                    if (validation.max && value > validation.max) {
                        throw new Error(`${field} must be less than or equal to ${validation.max}`);
                    }
                    formData.append(field, value.toString());
                }
            });

            // Optional string fields
            const stringFields = ['constructionStatus', 'legalDescription', 'propertyId', 'verificationDocument'];
            stringFields.forEach(field => {
                if (propertyData[field]) {
                    formData.append(field, propertyData[field].trim());
                }
            });

            // Optional array fields
            if (Array.isArray(propertyData.amenities)) {
                formData.append('amenities', JSON.stringify(propertyData.amenities));
            }

            // Optional boolean fields
            if (propertyData.isAuctionEnabled !== undefined) {
                formData.append('isAuctionEnabled', propertyData.isAuctionEnabled.toString());
            }

            // Optional date fields
            if (propertyData.auctionEndTime) {
                // Validate ISO8601 format
                const date = new Date(propertyData.auctionEndTime);
                if (isNaN(date.getTime())) {
                    throw new Error('auctionEndTime must be a valid ISO8601 date string');
                }
                formData.append('auctionEndTime', propertyData.auctionEndTime);
            }

            // Handle image files
            if (propertyData.images && Array.isArray(propertyData.images)) {
                if (propertyData.images.length > 10) {
                    throw new Error('Maximum 10 images allowed');
                }
                propertyData.images.forEach((image, index) => {
                    if (!image.uri) {
                        throw new Error(`Invalid image file at index ${index}`);
                    }
                    const imageFile = {
                        uri: image.uri,
                        type: image.mimeType || 'image/jpeg',
                        name: image.name || `image${index}.jpg`
                    };
                    formData.append('images', imageFile);
                });
            }

            // Handle document files
            if (propertyData.documents) {
                const doc = propertyData.documents;
                if (!doc.uri) {
                    throw new Error('Invalid document file');
                }
                const docFile = {
                    uri: doc.uri,
                    type: doc.mimeType || 'application/pdf',
                    name: doc.name || 'document.pdf'
                };
                formData.append('documents', docFile);
            }

            try {
                const { data } = await api.post('/properties', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    },
                    transformRequest: (data) => data,
                    timeout: 30000,
                    validateStatus: (status) => status >= 200 && status < 300,
                });
                return data;
            } catch (axiosError) {
                // Handle specific HTTP error codes
                if (axiosError.response) {
                    switch (axiosError.response.status) {
                        case 400:
                            const messages = axiosError.response.data?.message;
                            throw new Error(Array.isArray(messages) ? messages.join('\n') : 'Invalid request data');
                        case 401:
                            throw new Error('Authentication required. Please log in again.');
                        case 413:
                            throw new Error('Files are too large. Please reduce file sizes.');
                        case 503:
                            if (retryCount < MAX_RETRIES) {
                                console.log(`Attempt ${retryCount + 1} failed, retrying in ${RETRY_DELAY / 1000} seconds...`);
                                await sleep(RETRY_DELAY);
                                return propertyAPI.createProperty(propertyData, token, retryCount + 1);
                            }
                            throw new Error('Service temporarily unavailable. Please try again later.');
                        default:
                            throw new Error('Failed to create property. Please try again.');
                    }
                }
                throw new Error('Network error. Please check your connection and try again.');
            }
        } catch (error) {
            console.error('Property creation error details:', {
                attempt: retryCount + 1,
                message: error.message,
                response: error.response?.data
            });
            throw error;
        }
    },
};

export default propertyAPI;