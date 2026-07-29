declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: Error | null, result: { event: string; info?: { secure_url: string; public_id: string } }) => void
      ) => { open: () => void; close: () => void };
    };
  }
}

const CLOUD_NAME = 'n5vyutlh';
const UPLOAD_PRESET = 'mgraphite_upload';

export function createUploadWidget(
  onSuccess: (url: string, publicId: string) => void,
  onError?: (error: Error) => void
) {
  if (!window.cloudinary) {
    throw new Error('Cloudinary widget not loaded');
  }

  return window.cloudinary.createUploadWidget(
    {
      cloudName: CLOUD_NAME,
      uploadPreset: UPLOAD_PRESET,
      sources: ['local', 'url', 'camera'],
      multiple: false,
      maxFiles: 1,
      cropping: true,
      croppingAspectRatio: 1,
      showAdvancedOptions: false,
      clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      maxFileSize: 5000000,
      styles: {
        palette: {
          window: '#0a0a0a',
          windowBorder: '#f4aaba',
          tabIcon: '#f4aaba',
          menuIcons: '#f4aaba',
          textDark: '#ffffff',
          textLight: '#ffffff',
          link: '#f4aaba',
          action: '#f4aaba',
          inactiveTabIcon: '#555555',
          error: '#ff4444',
          inProgress: '#f4aaba',
          complete: '#20c997',
          sourceBg: '#111111',
        },
        fonts: {
          default: 'Inter',
        },
      },
    },
    (error, result) => {
      if (error) {
        onError?.(error);
        return;
      }
      if (result.event === 'success' && result.info) {
        onSuccess(result.info.secure_url, result.info.public_id);
      }
    }
  );
}
