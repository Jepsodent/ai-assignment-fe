import { useState } from "react";
import ResultCard from "../components/ResultCard";
import "./LandingPage.css";

function LandingPage() {
  const [form, setForm] = useState({
    name: "John Doe",
    image: null,
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", form.image);
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("height", form.height);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const resJson = await res.json();

      if (res.ok) {
        const newResult = {
          name: form.name,
          testResult: resJson.prediction || "Unknown",
          confidence: resJson.confidence || "N/A",
        };
        setResults((prev) => [...prev, newResult]);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Error uploading: ", err);
    }
  };

  return (
    <div className="patient">
      {/* FORM */}
      <div className="patient__top-container">
        <div className="patient__left-container">
          {/* NAME INPUT */}
          <div className="patient__input-container">
            <label htmlFor="name" className="patient__input-label">
              Name
            </label>
            <input
              className="patient__input-text"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          {/* IMAGE INPUT */}
          <div className="patient__input-container">
            <label htmlFor="image" className="patient__input-label">
              Upload Image
            </label>
            <input
              className="patient__input-image"
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button onClick={handleSubmit} className="patient__input-button">
            Submit
          </button>
        </div>
        <div className="patient__right-container">
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              style={{ maxHeight: "100%", borderRadius: "3%" }}
            />
          )}
        </div>
      </div>

      {/* RESULTS */}
      <div className="patient__bottom-container">
        {results.map((result, index) => (
          <ResultCard
            key={index}
            name={result.name}
            testResult={result.testResult}
            confidence={result.confidence}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
