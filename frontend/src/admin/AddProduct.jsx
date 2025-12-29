import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function AddProduct() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateSlug = (value) => {
    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
    );
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const res = await axios.post(
        `${API}/api/admin/upload-images`,
         formData,
        {
         headers: {
         Authorization: `Bearer ${token}`,
        },
      }
    );

      if (res.data.urls && res.data.urls.length > 0) { 
        setImages(res.data.urls);
        setPreview(res.data.urls);
      } else {
        alert("Image upload failed");
      }
    } catch {
      alert("Image upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !slug || !category || !description) {
      alert("Please fill all fields!");
      return;
    }

    const token = localStorage.getItem("adminToken");

    await axios.post(
     `${API}/api/admin/products`,
      { name, slug, category, description, images },
      { headers: { Authorization: `Bearer ${token}` } }
     );


    alert("Product created successfully!");

    setName("");
    setSlug("");
    setCategory("");
    setDescription("");
    setImages([]);
    setPreview([]);
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1 style={{ color: "var(--green)", marginBottom: "16px" }}>
        Add New Product
      </h1>

      <div
        className="card"
        style={{
          padding: "22px",
          maxWidth: "700px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              generateSlug(e.target.value);
            }}
            style={inputStyle}
          />

          <label>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={inputStyle}
          />

          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />

          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <label style={{ fontWeight: 600 }}>Product Images</label>
          <input type="file" multiple onChange={handleImageUpload} />

          {loading && (
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              Uploading images...
            </p>
          )}

          {/* IMAGE GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            {preview.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="preview"
                style={{
                  width: "100%",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            style={{
              marginTop: "25px",
              background: "var(--green)",
              color: "#fff",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              width: "100%",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "8px 0 16px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};
