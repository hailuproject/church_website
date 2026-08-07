let scriptPromise = null;
let scriptLoaded = false;

const loadCloudinaryScript = () => {
  if (scriptLoaded) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.cloudinary && window.cloudinary.createUploadWidget) {
      scriptLoaded = true;
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Cloudinary upload widget.'));
    document.head.appendChild(script);
  });
  return scriptPromise;
};

export const isCloudinaryConfigured = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  return Boolean(cloudName && cloudName !== 'your_cloud_name' && preset);
};

const buildResource = (info) => ({
  url: info.secure_url || info.url || '',
  publicId: info.public_id || '',
  resourceType: info.resource_type || 'image',
  format: info.format || '',
  size: info.bytes || 0,
  width: info.width || null,
  height: info.height || null,
});

export const openCloudinaryWidget = ({
  multiple = false,
  resourceType = 'image',
  folder = 'church/misc',
  maxFiles = 10,
  tags = [],
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await loadCloudinaryScript();
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      if (!cloudName || cloudName === 'your_cloud_name' || !uploadPreset) {
        reject(new Error('Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.'));
        return;
      }

      const results = [];
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName,
          uploadPreset,
          multiple,
          folder,
          tags,
          sources: ['local', 'url', 'camera', 'image_search'],
          maxFiles,
          cropping: false,
          resourceType,
          showPoweredBy: false,
          clientAllowedFormats: resourceType === 'image' ? ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'] : undefined,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          if (result.event === 'success') {
            results.push(buildResource(result.info));
          }
          if (result.event === 'queues-end') {
            resolve(results);
          }
          if (result.event === 'close' && results.length === 0) {
            resolve([]);
          }
        }
      );
      widget.open();
    } catch (error) {
      reject(error);
    }
  });
};

export default { openCloudinaryWidget, isCloudinaryConfigured, loadCloudinaryScript };
