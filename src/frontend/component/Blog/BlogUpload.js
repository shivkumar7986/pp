

// import React, { useState, useEffect } from "react";
// import { Button } from "@chakra-ui/react";
// import axios from "axios";
// import { mongopath } from "../Mongopath/Mongopath";
// import { imgUrl } from "../Mongopath/Mongopath";
// const BlogUploadimg = (props) => {
//   // console.log(props.setFile())
//   const [file, setFile] = useState(null);
//   const [images, setImages] = useState([]);
//   const [imgArr, ssetImgArr] = useState([]);
//   const [images2, setImages2] = useState([]);
//   const [selectedImages, setSelectedImages] = useState([]);

//   const [activeImage, setActiveImage] = useState([]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
    
//     // props.setUploadFile(e.target.files[0]);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       const response = axios.post(`${mongopath}upload/blog/img`, formData).then((response) => {
//           if (response) {
//             console.log("File uploaded successfully!");
//             // Fetch the updated list of images after successful upload
//             fetchImages();
//           } else {
//             console.error("File upload failed.");
//           }
//         });
//       // console.log(response);
//     } catch (error) {
//       // console.error("Error during file upload:", error);
//     }
//   };

//   const fetchImages = async () => {
//     try {
//       const response = await fetch(`${mongopath}get/blog/upload/img`);
//       if (response.ok) {
//         const imageData = await response.json();
//         setImages(imageData);
//         console.log(imageData)
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

//   //  for selecting image
//   const handleImageSelect = (image) => {
//     setActiveImage(image._id);

//     // Just add the image to the selectedImages array, no automatic update
//     setSelectedImages([...selectedImages, image]);
//   };

//   //for  adding image  that is uploaded in table
//   const handleAddImages = async (e) => {
//     // console.log(e);
//     ssetImgArr();

//     try {
//       const response = await axios.get(
//         `${mongopath}add/images/` + activeImage,
//         images2
//       );
//       props.setFile((current) => [...current, response.data]);
//     } catch (error) {
//       console.error("Error during image adding:", error);
//     }
//   };
  

//   const fetchImages2 = async () => {
//     try {
//       const response = await fetch(`${mongopath}get/selected/images`);
//       if (response.ok) {
//         const imageData = await response.json();
//         setImages2(imageData);
//       } else {  
//         console.error("Failed to fetch images.");
//       }
//     } catch (error) {
//       console.error("Error during image fetch:", error);
//     }
//   };
//   useEffect(() => {
//     // Fetch images when the component mounts
//     fetchImages2();
//   }, []);

//   return (
//     <div className="modal fade" id="blodmodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//     <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h1 class="modal-title" id="staticBackdropLabel">
//               Upload img
//             </h1>
//             <button
//               type="button"
//               class="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div class="modal-body">
//             <div className="container">
//               <form   onSubmit={handleUpload} enctype="multipart/form-data">
//                 <label>
//                   Choose a file:
//                   <input
//                     type="file"
//                     name="file"
//                     // accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </label>
//                 <br />
//                 <Button type="submit">Upload</Button>
//               </form>
//               <div>
//                 <h2>Images</h2>
//                 <div className=" row  ">
//                   {images.map((image) => (
//                     <div
//                       key={image._id}
//                       className={`col-md-3 p-1 ${
//                         activeImage === image._id ? "active" : ""
//                       }`}
//                       onClick={() => handleImageSelect(image)}
//                     >
//                       <img
//                         src={`${imgUrl}${image.filename}`}
//                         alt={image.filename}
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
//                   {" "}
//                   <button onClick={handleAddImages} type="submit">
//                     Add
//                   </button>
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
import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { mongopath } from "../Mongopath/Mongopath";
import { imgUrl } from "../Mongopath/Mongopath";
const BlogUploadimg = (props) => {
  // console.log(props.setFile())
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [imgArr, ssetImgArr] = useState([]);
  const [images2, setImages2] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [activeImage, setActiveImage] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    
    // props.setUploadFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = axios.post(`${mongopath}upload/blog/img`, formData).then((response) => {
          if (response) {
            console.log("File uploaded successfully!");
            // Fetch the updated list of images after successful upload
            fetchImages();
          } else {
            console.error("File upload failed.");
          }
        });
      // console.log(response);
    } catch (error) {
      // console.error("Error during file upload:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch(`${mongopath}get/blog/upload/img`);
      if (response.ok) {
        const imageData = await response.json();
        setImages(imageData);
        console.log(imageData)
      } else {
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, []);

  //  for selecting image
  const handleImageSelect = (image) => {
    setActiveImage(image._id);

    // Just add the image to the selectedImages array, no automatic update
    setSelectedImages([...selectedImages, image]);
  };

  //for  adding image  that is uploaded in table
  const handleAddImages = async (e) => {
    // console.log(e);
    ssetImgArr();

    try {
      const response = await axios.get(
        `${mongopath}upload/home/slider/img/` + activeImage,
        images2
      );
      props.setFile((current) => [...current, response.data]);
    } catch (error) {
      console.error("Error during image adding:", error);
    }
  };
  

  const fetchImages2 = async () => {
    try {
      const response = await fetch(`${mongopath}get-add-home-slider-img`);
      if (response.ok) {
        const imageData = await response.json();
        setImages2(imageData);
      } else {  
        console.error("Failed to fetch images.");
      }
    } catch (error) {
      console.error("Error during image fetch:", error);
    }
  };
  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages2();
  }, []);

  return (
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="staticBackdropLabel">
              Upload img
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="container">
              <form   onSubmit={handleUpload} enctype="multipart/form-data">
                <label>
                  Choose a file:
                  <input
                    type="file"
                    name="file"
                    // accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <br />
                <Button type="submit">Upload</Button>
              </form>
              <div>
                <h2>Images</h2>
                <div className=" row  ">
                  {images.map((image) => (
                    <div
                      key={image._id}
                      className={`col-md-3 p-1 ${
                        activeImage === image._id ? "active" : ""
                      }`}
                      onClick={() => handleImageSelect(image)}
                    >
                      <img
                        src={`${imgUrl}${image.filename}`}
                        alt={image.filename}
                        style={{
                          maxWidth: "90px",
                          maxHeight: "90px",
                          margin: "10px",
                          border:
                            activeImage === image._id
                              ? "2px solid red"
                              : "none",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  {" "}
                  <button onClick={handleAddImages} type="submit">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogUploadimg;

