import axios from 'axios';

export const pdfUpload = async (formData) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/file/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internal Servor error during upload");
    }
};