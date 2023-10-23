import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageGallery.css'
import ImageModal from './ImageModal';

function ImageGallery({ searchResults}) {

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/photos', {
                headers: {
                    Authorization: 'Client-ID FTVu26AFORzu4x3JELvwnWLlod6l_h5AY39QZYIUr-0'
                },
            });
            setImages(response.data);

        } catch (error) {
            console.error("Error fetching images: ", error);
        }
    };

    // If there are no search results, fetch and display default images
    if(searchResults.length === 0) {
        fetchImages();
    }
  }, [searchResults]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="image-container">
        {searchResults.length > 0
          ? searchResults.map((image) => (
              <div key={image.id} className="thumbnail" onClick={() => openImageModal(image)}>
                <img src={image.urls.small} alt={image.alt_description} />
                <div className="thumbnail-info">
                  <span className="user-name">{image.user.username}</span>
                  <span className="likes">{image.likes} Likes</span>
                </div>
              </div>
            ))
          : images.length > 0 &&
            images.map((image) => (
              <div key={image.id} className="thumbnail" onClick={() => openImageModal(image)}>
                <img src={image.urls.small} alt={image.alt_description} />
                <div className="thumbnail-info">
                  <span className="user-name">{image.user.username}</span>
                  <span className="likes">{image.likes} Likes</span>
                </div>
              </div>
            ))}
      </div>

      {/* Render the ImageModal component */}
      <ImageModal selectedImage={selectedImage} onClose={closeImageModal} />
    </div>
  );
}

export default ImageGallery;
