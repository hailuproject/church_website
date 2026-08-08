import cloudinary from '../config/cloudinary.js';
import AppError from './AppError.js';

const uploadFromBuffer = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: options.resourceType || 'auto',
        folder: options.folder || 'church/misc',
        public_id: options.publicId,
        overwrite: options.overwrite ?? true,
        ...options.extra,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export const uploadMedia = async (file, { folder = 'church/misc', resourceType } = {}) => {
  if (!file || !file.buffer) {
    throw new AppError('No file buffer provided for upload', 400);
  }
  const type = resourceType || inferResourceType(file.mimetype);
  try {
    const result = await uploadFromBuffer(file.buffer, { folder, resourceType: type });
    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
      size: result.bytes,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    throw new AppError(`Cloudinary upload failed: ${error.message}`, 502);
  }
};

export const deleteMedia = async (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  try {
    return await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });
  } catch (error) {
    console.error(`Cloudinary delete failed for ${publicId}: ${error.message}`);
    return null;
  }
};

export const inferResourceType = (mimeType = '') => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'video';
  if (mimeType === 'application/pdf') return 'raw';
  return 'raw';
};

export default { uploadMedia, deleteMedia, inferResourceType };
