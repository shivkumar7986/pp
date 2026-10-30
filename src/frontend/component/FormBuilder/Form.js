import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css';
// import './all.css';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', contact: '', image: null });    const [editMode, setEditMode] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        
        if (type === 'file') {
            // If the input is a file input, update the image property
            setNewUserData((prevData) => (
                { ...prevData, [name]: e.target.files[0] }));
        } else {
            setNewUserData((prevData) => ({ ...prevData, [name]: value }));
        }
        };
    

    const handleAddUser = async () => {
        // Check if any of the fields are blank
        if (!newUserData.name || !newUserData.email || !newUserData.contact || !newUserData.image) {
            alert('Please enter values for all fields before adding a user.');
            return;
        }


        try {
            const formData = new FormData();
            formData.append('name', newUserData.name);
            formData.append('email', newUserData.email);
            formData.append('contact', newUserData.contact);
            formData.append('image', newUserData.image);

            
            const response = await axios.post('https://peaceful-yonath.66-179-255-123.plesk.page/data', formData);
            // const response = await axios.post('http://localhost:5000/api/data', formData);

            if (response.data.success) {
                fetchData();
                setNewUserData({ name: '', email: '', contact: '', image: null});
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };
    const handleEdit = (id) => {
        setEditMode(id);

        // Find the data of the selected row
        const selectedData = data.find((row) => row._id === id);

        // Set the newUserData state with the data of the selected row
        setNewUserData({
            name: selectedData.name,
            email: selectedData.email,
            contact: selectedData.contact,
            image: null, // Set to null to avoid unintentional image update during edit
        });
    };

    const handleSave = async (id) => {
        try {
            const editedDataIndex = data.findIndex((row) => row._id === id);
            const editedData = { ...data[editedDataIndex], name: newUserData.name, email: newUserData.email, contact: newUserData.contact,image: newUserData.image };

            const formData = new FormData();
        
            formData.append('name', editedData.name);
            formData.append('email', editedData.email);
            formData.append('contact', editedData.contact);
            formData.append('image', newUserData.image);
// console.log(newUserData.image)
            await axios.put(`https://peaceful-yonath.66-179-255-123.plesk.page/api/data/${id}`, editedData);
            // await axios.put(`http://localhost:5000/api/data/${id}`, editedData);
            fetchData();
            setEditMode(null);
            setNewUserData({ name: '', email: '', contact: '', image: null }); // Reset newUserData
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this data?');

    if (isConfirmed) {
      try {
        await axios.delete(`https://peaceful-yonath.66-179-255-123.plesk.page/api/data/${id}`);
        // await axios.delete(`http://localhost:5000/api/data/${id}`);
       fetchData();

      } catch (error) {
        console.error(error);
      }
    }
  };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://peaceful-yonath.66-179-255-123.plesk.page/api/data');
            // const response = await axios.get('http://localhost:5000/api/data');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {/* Form to add new user */}
            <div className='title'>
            <h2 >Add New User</h2></div>
            <form encType="multipart/form-data">

                     <div className='text'>
                <label >
                    Name:
                    <input type="text" name="name" value={newUserData.name} onChange={handleInputChange} />
                </label>
                <label >
                    Email:
                    <input type="email" name="email" value={newUserData.email} onChange={handleInputChange} />
                </label>
                <label>
                    Contact:
                    <input type="number" name="contact" value={newUserData.contact} onChange={handleInputChange} />
                </label>
                <label>
                    Image:
                    <input type="file" name="image" onChange={handleInputChange} />
                </label>
                <div className='btn'>

                <button type="button" onClick={handleAddUser}>
                    Add User
                </button>
                
                </div>
                </div>
            </form>
           <div className='title'>
            <h2>Data Table</h2>
           </div>
            <div className='data'>
            <table border="1" align="center"> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row._id}>
                            <td>
                                {editMode === row._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUserData.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    row.name
                                )}
                            </td>
                            <td>{editMode === row._id ? <input type="text" name="email" value={newUserData.email} onChange={handleInputChange} /> : row.email}</td>
                            <td>{editMode === row._id ? <input type="text" name="contact" value={newUserData.contact} onChange={handleInputChange} /> : row.contact}</td>
                            <td>
                                {editMode === row._id ? (
                                    <input type="file" name="image" onChange={handleInputChange} />
                                ) : (
                                    
                                    <>  
                                
                                {(
                                    
        <img src={`https://peaceful-yonath.66-179-255-123.plesk.page/images/${newUserData.image}`} alt="User" style={{ maxWidth: '100px', maxHeight: '100px' }} />
        // <img src={`http://localhost:5000/images/${newUserData.image}`} alt="User" style={{ maxWidth: '100px', maxHeight: '100px' }} />
    )}
                                
                                    </>                                )}
                            </td>
                            <td>
                                {editMode === row._id ? (
                                    <button onClick={() => handleSave(row._id)}>Save</button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(row._id)}>Edit</button>
                                        <button onClick={() => handleDelete(row._id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            
        </div>
    );
};

export default DataTable;
