import './App.css';
import { useState } from 'react';
// import ImageUploader from './ImageUploader';
// import ImageUploaderCompressor from './ImageUploaderCompressor';
import ImageCompressAndUpload from './ImageCompressAndUpload';
import ImagePreview from './ImagePreview';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (image: File) => {
    setSelectedImage(image);
  };

  const handleUpdatedFile = (updatedFile: File) => {
    // Handle the updated file received from the ImagePreview component
    console.log('Updated file:', updatedFile);
    // You can perform further actions here, such as sending the updated file to the API
  };

  return (
    <>
      {/* <ImageUploader /> */}
      {/* <ImageUploaderCompressor /> */}
      <ImageCompressAndUpload onImageSelect={handleImageSelect} />
      <ImagePreview selectedImage={selectedImage} onSave={handleUpdatedFile} />
    </>
  );
}

export default App;
