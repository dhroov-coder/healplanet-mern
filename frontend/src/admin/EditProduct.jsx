import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Auto Slug Generator
  const generateSlug = (value) => {
    const s = value
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    setSlug(s);
  };

  /** -----------------------------
   * LOAD PRODUCT DATA FOR EDIT
   ------------------------------ */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/id/${id}`)
      .then((res) => {
        const p = res.data;
        setName(p.name);
        setSlug(p.slug);
        setCategory(p.category);
        setDescription(p.description);
        setImages(p.images || []);
        setPreview(p.images || []);
        setPageLoading(false);
      })
      .catch(() => setPageLoading(false));
  }, [id]);

  /** -----------------------------
   * HANDLE IMAGE UPLOAD
   ------------------------------ */
  const handleImageUpload = async (e) => {
  const files = e.target.files;
  if (!files.length) return;

  const formData = new FormData();

  // 🔥 SAME KEY AS BACKEND
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("adminToken");

    const res = await axios.post(
      "http://localhost:5000/api/admin/upload-images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      const updated = [...images, ...res.data.urls];
      setImages(updated);
      setPreview(updated);
    } else {
      alert("Image upload failed");
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("Image upload failed");
  } finally {
    setLoading(false);
  }
};

  /** -----------------------------
   * REMOVE IMAGE
   ------------------------------ */
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    setPreview(updated);
  };

  /** -----------------------------
   * SAVE UPDATED PRODUCT
   ------------------------------ */
  const handleSave = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    await axios.put(
      `http://localhost:5000/api/admin/products/${id}`,
      {
        name,
        slug,
        category,
        description,
        images,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Product updated successfully!");
    navigate("/admin/products");
  };

  if (pageLoading) {
    return <p style={{ padding: 20 }}>Loading product...</p>;
  }

  return (
    <div className="container" style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px", color: "var(--green)" }}>Edit Product</h1>

      <div
        className="card"
        style={{
          padding: "30px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <form onSubmit={handleSave}>
          {/* NAME */}
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              generateSlug(e.target.value);
            }}
            style={inputStyle}
          />

          {/* SLUG */}
          <label>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={inputStyle}
          />

          {/* CATEGORY */}
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          />

          {/* DESCRIPTION */}
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          {/* IMAGE UPLOAD */}
          <label style={{ fontWeight: "600", marginTop: "20px" }}>Images</label>

          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              width: "100%",
            }}
          />

          {loading && <p>Uploading images...</p>}

          {/* IMAGE PREVIEW + DELETE */}
          <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
            gap: "12px",
            marginBottom: "20px",
            }}
          >

            {preview.map((img, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={img}
                  alt="preview"
                  style={{
                    width: "110px",
                    height: "110px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />

                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            style={{
              background: "var(--green)",
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "15px",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
};
