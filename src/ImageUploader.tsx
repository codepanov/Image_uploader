import { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_FILE_SIZE_BYTES = 1048576; // 1MB

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!file) {
      return; // No file selected
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(
        'File size exceeds the maximum limit (1MB). Please choose a smaller file.'
      );
    } else if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Only JPG, PNG, and GIF files are allowed.');
    } else {
      setSelectedImage(file);
      setErrorMessage('');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {selectedImage && (
        <div>
          <h2>Preview:</h2>
          <img
            style={{ width: '100%' }}
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
