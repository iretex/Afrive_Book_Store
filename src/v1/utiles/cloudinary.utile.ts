import dotenv from 'dotenv';
import { v2 } from 'cloudinary';
dotenv.config();
const { CLOUD_NAME, API_SECRET, API_KEY } = process.env;
const cloudinary = v2;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true
});
export const upload = async (path: string, preset: string): Promise<string> => {
    const uploader = await cloudinary.uploader.upload(path, { upload_preset: preset });
    return uploader.secure_url;
};