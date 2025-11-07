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

export default function LawyerUpdateProfile() {
  const { lawyerId, token, isAuthenticated } = useLawyerAuth();

  const [formData, setFormData] = useState({
    full_name: "",
    unique_id: "",
    gender: "",
    dob: "",
    email: "",
    phone_number: "",
    linkedin_url: "",
    website_url: "",
    photo: "",
    reg2: { bio: "", years_of_experience: "", bar_details: [{}], languages_spoken: "", education: [{}] },
    reg3: { practice_area: "", court_admitted_to: "", active_since: "", work_experience: [{}] },
    reg4: { case_results: [{}] },
    reg5: { address: [{}], working_hours: "" },
    reg6: { professional_associations: "", certifications: [{}], awards: [{}], publications: [{}] },
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (!lawyerId) return;

    const fetchLawyer = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8000/lawyers/${lawyerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;

        setFormData({
          full_name: data.full_name || "",
          unique_id: data.unique_id || "",
          gender: data.gender || "",
          dob: data.dob || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          linkedin_url: data.linkedin_url || "",
          website_url: data.website_url || "",
          photo: data.photo || "",

          reg2: {
            bio: data.reg2?.bio || "",
            years_of_experience: data.reg2?.years_of_experience || "",
            languages_spoken: data.reg2?.languages_spoken || "",
            bar_details: data.reg2?.bar_details?.length ? data.reg2.bar_details : [{}],
            education: data.reg2?.education?.length ? data.reg2.education : [{}],
          },

          reg3: {
            practice_area: data.reg3?.practice_area || "",
            court_admitted_to: data.reg3?.court_admitted_to || "",
            active_since: data.reg3?.active_since || "",
            work_experience: data.reg3?.work_experience?.length ? data.reg3.work_experience : [{}],
          },

          reg4: {
            case_results: data.reg4?.case_results?.length ? data.reg4.case_results : [{}],
          },

          reg5: {
            address: data.reg5?.address?.length ? data.reg5.address : [{}],
            working_hours: data.reg5?.working_hours || "",
          },

          reg6: {
            professional_associations: data.reg6?.professional_associations || "",
            certifications: data.reg6?.certifications?.length ? data.reg6.certifications : [{}],
            awards: data.reg6?.awards?.length ? data.reg6.awards : [{}],
            publications: data.reg6?.publications?.length ? data.reg6.publications : [{}],
          },
        });

      } catch (err) {
        setMessage("❌ Failed to load lawyer data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [lawyerId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:8000/lawyers/update-full/${lawyerId}`, formData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profile updated successfully!");
    } catch {
      setMessage("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const submitPasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/lawyers/change-password/${lawyerId}`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch {
      alert("❌ Failed to update password");
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
            formData={formData}
            handleNestedChange={(section, field, value) =>
              setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
              }))
            }
            handleListChange={(section, list, i, key, value) =>
              setFormData((prev) => {
                const arr = [...prev[section][list]];
                arr[i][key] = value;
                return { ...prev, [section]: { ...prev[section], [list]: arr } };
              })
            }
            addListItem={(section, list, item) =>
              setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [list]: [...prev[section][list], item] }
              }))
            }
            removeListItem={(section, list, i) =>
              setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [list]: prev[section][list].filter((_, idx) => idx !== i) }
              }))
            }
          />

          <SectionReg3 formData={formData} setFormData={setFormData} />
          <SectionReg4 formData={formData} setFormData={setFormData} />
          <SectionReg5 formData={formData} setFormData={setFormData} />
          <SectionReg6 formData={formData} setFormData={setFormData} />

          <div className="password-btn-container">
            <button type="button" className="change-password-btn" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </button>
          </div>

          <button type="submit" className="lu-submit-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {message && <p className="lu-message">{message}</p>}
      </div>

      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Change Password</h3>
            <input type="password" placeholder="Current Password" name="current_password" onChange={handlePasswordChange} />
            <input type="password" placeholder="New Password" name="new_password" onChange={handlePasswordChange} />
            <input type="password" placeholder="Confirm New Password" name="confirm_password" onChange={handlePasswordChange} />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowPasswordModal(false)}>Cancel</button>
              <button className="submit-btn" onClick={submitPasswordChange}>Update Password</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
