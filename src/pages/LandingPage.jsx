import React, { useState, useRef, useEffect } from 'react';
import "./LandingPage.css"; 

function LandingPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    note: '',
    imageFile: null 
  });


  const [imagePreview, setImagePreview] = useState(null);


  const fileInputRef = useRef(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleRun = () => {
    console.log("Data yang berhasil ditangkap:", formData);
    alert(`Nama Pasien: ${formData.patientName}\nTanggal: ${formData.date}\nFile Gambar: ${formData.imageFile ? formData.imageFile.name : 'Tidak ada'}`);
  };

const handleCancel = () => {
    setImagePreview(null);
    

    setFormData(prevData => ({
      ...prevData,
      imageFile: null
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  




  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prevData => ({
        ...prevData,
        imageFile: file
      }));

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

    } else {
      alert("Harap pilih file gambar.");
    }
  };


  const handleImageClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };


  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);




  return ( 
<div className="main-page">
      <div className="patient-input">
        <h1>SELAMAT DATANG</h1>
        <div>
          <p>Patient Name</p>
          <input 
            className="input" 
            placeholder="Insert Name"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Date</p>
          <input 
            className="input" 
            placeholder="Insert Date" 
            name="date"
            type="date" 
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Note</p>
          <input 
            className="input" 
            placeholder="Insert Note" 
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="action-section">
        
        <div 
          className="image-uploader"
          onClick={handleImageClick} 
          onDragOver={handleDragOver}
          onDrop={handleDrop}         
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*" 
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          ) : (
            <span>INPUT GAMBAR</span>
          )}

        </div>
        
        <div className="button-container">
          <button className="btn btn-cancel" onClick={handleCancel}>CANCEL</button>
          <button className="btn btn-run" onClick={handleRun}>RUN</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;