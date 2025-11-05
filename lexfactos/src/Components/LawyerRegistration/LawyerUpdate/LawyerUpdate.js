import { useEffect, useState } from "react";
import axios from "axios";
import { useLawyerAuth } from "../../Context/LawyerContext";
import "./LawyerUpdate.css";
import LawyerPannel from "../../LawyerDashboard/LaywerPannel/LawyerPannel";

import SectionPersonal from "./SectionPersonal1";
import SectionReg2 from "./Section2";
import SectionReg3 from "./Section3";
import SectionReg4 from "./Section4";
import SectionReg5 from "./Section5";
import SectionReg6 from "./Section6";
import ChangePassword from "./ChangePassword";

export default function LawyerUpdateProfile() {
  const { lawyerId, token, isAuthenticated } = useLawyerAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    dob: "",
    email: "",
    phone_number: "",
    linkedin_url: "",
    website_url: "",
    photo: "",
    reg2: {
      bio: "",
      years_of_experience: "",
      bar_details: [
        {
          country: "",
          state: "",
          city: "",
          bar_license_number: "",
          bar_association_name: "",
        },
      ],
      languages_spoken: "",
      education: [{ degree: "", college_name: "", graduation_year: "" }],
    },
    reg3: {
      practice_area: "",
      court_admitted_to: "",
      active_since: "",
      work_experience: [
        { company_name: "", role: "", duration: "", description: "" },
      ],
    },
    reg4: {
      case_results: [
        { title: "", outcome: "", summary: "", court: "", year: "" },
      ],
    },
    reg5: {
      address: [
        {
          country: "",
          state: "",
          city: "",
          street_address: "",
          zip_code: "",
          latitude: "",
          longitude: "",
        },
      ],
      working_hours: "",
    },
    reg6: {
      professional_associations: "",
      certifications: [{ title: "", issuer: "", year: "" }],
      awards: [{ name: "", organization: "", year: "" }],
      publications: [{ title: "", year: "", link: "", description: "" }],
    },
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lawyerId) return;

    const fetchLawyer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/lawyers/${lawyerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setFormData((prev) => ({
          ...prev,
          ...res.data,
          reg2: { ...prev.reg2, ...(res.data.reg2 || {}) },
          reg3: { ...prev.reg3, ...(res.data.reg3 || {}) },
          reg4: { ...prev.reg4, ...(res.data.reg4 || {}) },
          reg5: { ...prev.reg5, ...(res.data.reg5 || {}) },
          reg6: { ...prev.reg6, ...(res.data.reg6 || {}) },
        }));
      } catch (err) {
        setMessage("❌ Failed to load lawyer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [lawyerId, token]);

  const handleNestedChange = (section, key, value) =>
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));

  const handleListChange = (section, listKey, index, field, value) => {
    const updated = [...formData[section][listKey]];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [listKey]: updated },
    }));
  };

  const addListItem = (section, listKey, template) =>
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: [...prev[section][listKey], template],
      },
    }));

  const removeListItem = (section, listKey, index) =>
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [listKey]: prev[section][listKey].filter((_, i) => i !== index),
      },
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:8000/lawyers/update-full/${lawyerId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <p className="lu-error">Please log in.</p>;

  return (
    <div className="lu-container">
      <LawyerPannel />

      <div className="lu-card">
        <form className="lu-form" onSubmit={handleSubmit}>
          <SectionPersonal formData={formData} setFormData={setFormData} />

          <SectionReg2
            {...{
              formData,
              handleNestedChange,
              handleListChange,
              addListItem,
              removeListItem,
            }}
          />

          <SectionReg3
            {...{
              formData,
              handleNestedChange,
              handleListChange,
              addListItem,
              removeListItem,
            }}
          />

          <SectionReg4
            {...{
              formData,
              handleListChange,
              addListItem,
              removeListItem,
            }}
          />

          <SectionReg5
            {...{
              formData,
              handleListChange,
              addListItem,
              removeListItem,
              handleNestedChange,
            }}
          />

          <SectionReg6
            {...{
              formData,
              handleNestedChange,
              handleListChange,
              addListItem,
              removeListItem,
            }}
          />

          {/* ✅ Change Password Section below Step 6 */}
          <ChangePassword />

          <button type="submit" className="lu-submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {message && <p className="lu-message">{message}</p>}
      </div>
    </div>
  );
}
