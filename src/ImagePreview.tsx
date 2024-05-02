import { useState, useEffect, ChangeEvent } from 'react';

interface ImagePreviewProps {
  selectedImage: File | null;
  onSave: (file: File) => void; // Callback function to send the updated file to the parent
}

function ImagePreview({ selectedImage, onSave }: ImagePreviewProps) {
  const [fileName, setFileName] = useState<string>(
    selectedImage ? selectedImage.name : ''
  );

  useEffect(() => {
    if (selectedImage) {
      // Extract the file name without extension
      const nameWithoutExtension = selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.');
      setFileName(nameWithoutExtension);
    }
  }, [selectedImage]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSave = () => {
    if (selectedImage) {
      // Add the original extension back to the file name
      const originalExtension = selectedImage.name.split('.').pop();
      const updatedFileName = `${fileName}.${originalExtension}`;

      // Create a new File object with the updated name
      const updatedFile = new File([selectedImage], updatedFileName);
      onSave(updatedFile); // Call the callback function to send the updated file to the parent
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {selectedImage && (
        <div style={{ maxWidth: '75%' }}>
          <h2>Preview:</h2>
          <img
            style={{ width: '100%' }}
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
          />
          <input
            type="text"
            value={fileName}
            onChange={handleNameChange}
            placeholder="Enter file name"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default ImagePreview;
