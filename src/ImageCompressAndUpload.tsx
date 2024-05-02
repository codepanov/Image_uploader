import { useState, ChangeEvent } from 'react';
import imageCompression from 'compressorjs';

interface ImageCompressAndUploadProps {
  onImageSelect: (image: File) => void;
}

function ImageCompressAndUpload({
  onImageSelect,
}: ImageCompressAndUploadProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const MAX_FILE_SIZE_BYTES = 1048576; // 1MB
  const MAX_COMPRESSED_SIZE_KB = 500; // 500KB

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!file) {
      return; // No file selected
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(
        'File size exceeds the maximum limit (1MB). Please choose a smaller file.'
      );
    } else if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Only JPG, PNG, GIF, and WebP files are allowed.');
    } else {
      // Compress the image
      const compressedImage = await compressImage(file);

      // Check compressed image size
      if (compressedImage.size > MAX_COMPRESSED_SIZE_KB * 1024) {
        setErrorMessage(
          `Compressed image size exceeds ${MAX_COMPRESSED_SIZE_KB}KB.`
        );
      } else {
        onImageSelect(compressedImage);
        setErrorMessage('');
      }
    }
  };

  const compressImage = (image: File) => {
    return new Promise<File>((resolve, reject) => {
      new imageCompression(image, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.73, // Adjust quality level as needed
        success(compressedImage) {
          resolve(compressedImage as File);
        },
        error(error) {
          reject(error);
        },
      });
    });
  };

  return (
    <div style={{}}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          textAlignLast: 'center',
          width: '-webkit-fill-available',
        }}
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default ImageCompressAndUpload;
