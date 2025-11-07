export default function SectionPersonal({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="lu-section" autoComplete="off">
      <h3 className="lu-section-title">Personal Information</h3>

      <div className="lu-grid">
        <div className="lu-field">
          <label>Full Name *</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name || ""}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="off"
          />
        </div>

        <div className="lu-field">
          <label>Unique ID *</label>
          <input
            type="text"
            name="unique_id"
            value={formData.unique_id || ""}
            onChange={handleChange}
            placeholder="Enter unique ID (Ex: LAW-2025-0001)"
            autoComplete="off"
          />
        </div>

        <div className="lu-field">
          <label>Gender *</label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            autoComplete="off"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="lu-field">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="lu-field">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="example@mail.com"
            autoComplete="off"
          />
        </div>

        <div className="lu-field">
          <label>Phone Number *</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number || ""}
            onChange={handleChange}
            placeholder="Enter contact number"
            autoComplete="off"
          />
        </div>

        <div className="lu-field">
          <label>LinkedIn Profile</label>
          <input
            type="text"
            name="linkedin_url"
            value={formData.linkedin_url || ""}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            autoComplete="off"
          />
        </div>

        <div className="lu-field">
          <label>Website</label>
          <input
            type="text"
            name="website_url"
            value={formData.website_url || ""}
            onChange={handleChange}
            placeholder="https://your-website.com"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
