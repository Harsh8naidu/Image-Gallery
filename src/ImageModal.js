import React, {useState, useEffect} from 'react';
import './ImageModal.css';
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';

function ImageModal({ selectedImage, onClose }) {

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        if (selectedImage && selectedImage.user && selectedImage.user.username) {
          fetchUserDetails(selectedImage.user.username)
            .then((userData) => {
              setUserDetails(userData);
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
            });
        }
      }, [selectedImage]);
      
    const fetchUserDetails = async (username) => {
        try {
          const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=FTVu26AFORzu4x3JELvwnWLlod6l_h5AY39QZYIUr-0`);
          const userData = await response.json();
          return userData;
        } catch (error) {
          console.error("Error fetching user details:", error);
          return null;
        }
      };
      

  if (!selectedImage) {
    return null; // If selectedImage is null, do not render the modal
  }

  return (
    <div className="modal-container">
        <div className='modal-background'>
        <CloseIcon
            className="close-icon"
            onClick={onClose}
            style={{ position: "absolute", top: "100px", right: "480px", cursor: "pointer" }}
         />
      <div className="modal-image">
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description}
          style={{ maxWidth: '50%', maxHeight: '80vh', objectFit: 'contain' }}
        />
      </div>
      <div className="modal-details">
        <p className="user-name">{selectedImage.user.username}</p>
        <p className="likes">{selectedImage.likes} Likes</p>
        
        {userDetails?.links && (
            <div className="social-links">
                <a href={userDetails.links.html} target="_blank" rel="noopener noreferrer">
                <LinkIcon />
                </a>
                {userDetails.instagram_username && (
                <a href={`https://www.instagram.com/${userDetails.instagram_username}`} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                </a>
                )}
                {userDetails.twitter_username && (
                <a href={`https://twitter.com/${userDetails.twitter_username}`} target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </a>
                )}
                {/* Add more social links as needed */}
            </div>
        )}
      </div>
        </div>
    </div>
  );
  
}

export default ImageModal;
