import React from "react";

export default function SectionReg5({
  formData,
  handleNestedChange,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  const reg5 = formData.reg5;

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">Office Locations & Working Hours</h3>

      {/* ============ ADDRESS LIST ============ */}
      {reg5.address.map((addr, index) => (
        <div key={index} className="lu-repeat-block">

          <div className="lu-grid">
            <div className="lu-field">
              <label>Country *</label>
              <input
                type="text"
                placeholder="Country"
                value={addr.country}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "country", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>State *</label>
              <input
                type="text"
                placeholder="State"
                value={addr.state}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "state", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>City *</label>
              <input
                type="text"
                placeholder="City"
                value={addr.city}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "city", e.target.value)
                }
              />
            </div>
          </div>

          <div className="lu-grid">
            <div className="lu-field">
              <label>Street Address *</label>
              <input
                type="text"
                placeholder="Street / Building Name"
                value={addr.street_address}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "street_address", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Zip / Pin Code *</label>
              <input
                type="text"
                placeholder="Zip Code"
                value={addr.zip_code}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "zip_code", e.target.value)
                }
              />
            </div>
          </div>

          <div className="lu-grid">
            <div className="lu-field">
              <label>Latitude</label>
              <input
                type="text"
                placeholder="Latitude"
                value={addr.latitude}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "latitude", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Longitude</label>
              <input
                type="text"
                placeholder="Longitude"
                value={addr.longitude}
                onChange={(e) =>
                  handleListChange("reg5", "address", index, "longitude", e.target.value)
                }
              />
            </div>
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg5", "address", index)}
          >
            Remove Address
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg5", "address", {
            country: "",
            state: "",
            city: "",
            street_address: "",
            zip_code: "",
            latitude: "",
            longitude: "",
          })
        }
      >
        + Add Another Office Address
      </button>

      {/* WORKING HOURS */}
      <div className="lu-field" style={{ marginTop: "1rem" }}>
        <label>Working Hours *</label>
        <input
          type="text"
          placeholder="e.g., Mon-Fri: 9AM - 6PM"
          value={reg5.working_hours || ""}
          onChange={(e) =>
            handleNestedChange("reg5", "working_hours", e.target.value)
          }
        />
      </div>
    </div>
  );
}
