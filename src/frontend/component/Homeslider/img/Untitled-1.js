// import React, { useState, useEffect } from "react";
// import { Button } from "@chakra-ui/react";
// import axios from "axios";
// import { mongopath } from "../Mongopath/Mongopath";
// import { imgUrl } from "../Mongopath/Mongopath";

// const BlogUploadimg = () => {
//   const [file, setFile] = useState(null);
//   const [images, setImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [activeImage, setActiveImage] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = await axios.post(`${mongopath}upload/blog/img`, formData);
//       if (response.data) {
//         console.log("File uploaded successfully!");
//         // Fetch the updated list of images after successful upload
//         fetchImages();
//       } else {
//         console.error("File upload failed.");
//       }
//     } catch (error) {
//       console.error("Error during file upload:", error);
//     }
//   };

//   const fetchImages = async () => {
//     try {
//       const response = await fetch(`${mongopath}get/blog/upload/img`);
//       if (response.ok) {
//         const imageData = await response.json();
//         setImages(imageData);
//       } else {
//         console.error("Failed to fetch images.");
//       }
//     } catch (error) {
//       console.error("Error during image fetch:", error);
//     }
//   };

//   useEffect(() => {
//     // Fetch images when the component mounts
//     fetchImages();
//   }, []);

  // const handleImageSelect = (image) => {
  //   setActiveImage(image._id);
  //   setSelectedImage(image);
//   };

//   const handleAddImages = async () => {
//     if (!selectedImage) {
//       alert("Please select an image.");
//       return;
//     }
//     try {
//       // Perform the necessary action for adding the selected image
//       console.log("Selected Image:", selectedImage);
//     } catch (error) {
//       console.error("Error during image adding:", error);
//     }
//   }

//   return (
//     <div
//       className="modal fade"
//       id="staticBackdrop"
//       data-bs-backdrop="static"
//       data-bs-keyboard="false"
//       tabIndex="-1"
//       aria-labelledby="staticBackdropLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h1 className="modal-title" id="staticBackdropLabel">
//               Upload img
//             </h1>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <div className="container">
//               <form onSubmit={handleUpload} enctype="multipart/form-data">
//                 <label>
//                   Choose a file:
//                   <input
//                     type="file"
//                     name="file"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//                 <br />
//                 <Button type="submit">Upload</Button>
//               </form>
//               <div>
//                 <h2>Images</h2>
//                 <div className="row">
//                   {images.map((image) => (
//                     <div
//                       key={image._id}
//                       className={`col-md-3 p-1 ${
//                         activeImage === image._id ? "active" : ""
//                       }`}
//                       onClick={() => handleImageSelect(image)}
//                     >
//                       <img
//                         src={`${imgUrl}${image.file}`}
//                         alt={image.file}
//                         style={{
//                           maxWidth: "90px",
//                           maxHeight: "90px",
//                           margin: "10px",
//                           border:
//                             activeImage === image._id
//                               ? "2px solid red"
//                               : "none",
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4">
//                   <button onClick={handleAddImages}>Add</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogUploadimg;