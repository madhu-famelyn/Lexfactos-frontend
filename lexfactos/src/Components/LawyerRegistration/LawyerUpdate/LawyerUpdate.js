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
    reg2: {
      bio: "",
      years_of_experience: "",
      bar_details: [
        {
          country: "",
          state: "",
          city: "",
          bar_license_number: "",
          bar_association_name: ""
        }
      ],
      languages_spoken: "",
      education: [
        {
          degree: "",
          college_name: "",
          graduation_year: ""
        }
      ]
    },
    reg3: {
      practice_area: "",
      court_admitted_to: "",
      active_since: "",
      work_experience: [
        {
          company_name: "",
          role: "",
          duration: "",
          description: ""
        }
      ]
    },
    reg4: {
      case_results: [
        {
          title: "",
          outcome: "",
          summary: "",
          court: "",
          year: ""
        }
      ]
    },
    reg5: {
      address: [
        {
          country: "",
          state: "",
          city: "",
          street_address: "",
          zip_code: ""
        }
      ],
      working_hours: ""
    },
    reg6: {
      professional_associations: "",
      certifications: [
        { title: "", issuer: "", year: "" }
      ],
      awards: [
        { name: "", organization: "", year: "" }
      ],
      publications: [
        { title: "", year: "", link: "", description: "" }
      ]
    }
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
        const res = await axios.get(
          `https://api.lexfactos.com/get-all-details/lawyers/all-details/${lawyerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const d = res.data;

        setFormData({
          full_name: d.full_name || "",
          unique_id: d.unique_id || "",
          gender: d.gender || "",
          dob: d.dob || "",
          email: d.email || "",
          phone_number: d.phone_number || "",
          linkedin_url: d.linkedin_url || "",
          website_url: d.website_url || "",
          photo: d.photo || "",

          reg2: {
            bio: d.profile?.bio || "",
            years_of_experience: d.profile?.years_of_experience || "",
            languages_spoken: d.profile?.languages_spoken || "",
            bar_details: d.profile?.bar_details?.length
              ? d.profile.bar_details
              : [
                  {
                    country: "",
                    state: "",
                    city: "",
                    bar_license_number: "",
                    bar_association_name: "",
                  }
                ],
            education: d.profile?.education?.length
              ? d.profile.education
              : [
                  {
                    degree: "",
                    college_name: "",
                    graduation_year: "",
                  }
                ]
          },

          reg3: {
            practice_area: d.registration3?.practice_area || "",
            court_admitted_to: d.registration3?.court_admitted_to || "",
            active_since: d.registration3?.active_since || "",
            work_experience: d.registration3?.work_experience?.length
              ? d.registration3.work_experience
              : [
                  {
                    company_name: "",
                    role: "",
                    duration: "",
                    description: "",
                  }
                ]
          },

          reg4: {
            case_results: d.registration4?.case_results?.length
              ? d.registration4.case_results
              : [
                  {
                    title: "",
                    outcome: "",
                    summary: "",
                    court: "",
                    year: ""
                  }
                ],
          },

          reg5: {
            address: d.registration5?.[0]?.address?.length
              ? d.registration5[0].address
              : [
                  {
                    country: "",
                    state: "",
                    city: "",
                    street_address: "",
                    zip_code: "",
                  }
                ],
            working_hours: d.registration5?.[0]?.working_hours || "",
          },

          reg6: {
            professional_associations:
              d.registration6?.professional_associations || "",
            certifications: d.registration6?.certifications?.length
              ? d.registration6.certifications
              : [{ title: "", issuer: "", year: "" }],
            awards: d.registration6?.awards?.length
              ? d.registration6.awards
              : [{ name: "", organization: "", year: "" }],
            publications: d.registration6?.publications?.length
              ? d.registration6.publications
              : [
                  {
                    title: "",
                    year: "",
                    link: "",
                    description: "",
                  }
                ],
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
      await axios.put(
        `https://api.lexfactos.com/lawyers/update-full/${lawyerId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.log(err);
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
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.put(
        `https://api.lexfactos.com/lawyer/change-password/${lawyerId}`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Password updated!");
      setShowPasswordModal(false);
      setPasswordData({ current_password: "", new_password: "", confirm_password: "" });
    } catch {
      alert("❌ Failed to update password");
    }
  };

  if (!isAuthenticated)
    return <p className="lu-error">Please log in.</p>;

  const nestedChange = (section, field, value) =>
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));

  const listChange = (s, l, i, k, v) =>
    setFormData((prev) => {
      const arr = [...prev[s][l]];
      arr[i][k] = v;
      return { ...prev, [s]: { ...prev[s], [l]: arr } };
    });

  const addList = (s, l, item) =>
    setFormData((prev) => ({
      ...prev,
      [s]: { ...prev[s], [l]: [...prev[s][l], item] },
    }));

  const removeList = (s, l, i) =>
    setFormData((prev) => ({
      ...prev,
      [s]: { ...prev[s], [l]: prev[s][l].filter((_, idx) => idx !== i) },
    }));

  return (
    <div className="lu-container">
      <LawyerPannel />

      <div className="lu-card">
        <form className="lu-form" onSubmit={handleSubmit}>

          <SectionPersonal formData={formData} setFormData={setFormData} />

          <SectionReg2 
            formData={formData}
            handleNestedChange={nestedChange}
            handleListChange={listChange}
            addListItem={addList}
            removeListItem={removeList}
          />

          <SectionReg3 
            formData={formData}
            handleNestedChange={nestedChange}
            handleListChange={listChange}
            addListItem={addList}
            removeListItem={removeList}
          />

          <SectionReg4 
            formData={formData}
            handleListChange={listChange}
            addListItem={addList}
            removeListItem={removeList}
          />

          <SectionReg5 
            formData={formData}
            handleNestedChange={nestedChange}
            handleListChange={listChange}
            addListItem={addList}
            removeListItem={removeList}
          />

          <SectionReg6 
            formData={formData}
            handleNestedChange={nestedChange}
            handleListChange={listChange}
            addListItem={addList}
            removeListItem={removeList}
          />

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
