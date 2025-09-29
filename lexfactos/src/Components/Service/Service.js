import axios from "axios";

// // Before
// const API_BASE_URL = "http://127.0.0.1:8000";

// After
const API_BASE_URL = "https://lexfactos-backend.onrender.com";

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { detail: "Something went wrong. Please try again." };
    }
  }
};






export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { detail: "Something went wrong. Please try again." };
    }
  }
};




export async function loginWithGoogle(credential) {
  const response = await axios.post(`${API_BASE_URL}/auth/google`, {
    credential,
  });
  return response.data;
}


export const registerLawyer = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lawyers/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error.response?.data || { detail: "Registration failed" };
  }
};








export const createLawyerProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lawyer-profile/`, profileData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Profile creation error:", error);
    throw error.response?.data || { detail: "Profile creation failed" };
  }
};










export const submitLawyerStep3 = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lawyer-registration3/`, data, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting step 3:", error);
    throw error;
  }
};















// ✅ Step 5 endpoint (office & service info)
export const submitStep4 = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/lawyers/registration5/`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting Step 4 (registration5):", error);
    throw error;
  }
};










export const submitStep5 = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/lawyers/registration4/`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting Step 5 (registration4):", error);
    throw error;
  }
};











export const submitStep6 = async (payload) => {
  return await axios.post(`${API_BASE_URL}/lawyers/registration6/`, payload);
};






export const adminLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // { access_token, token_type }
  } catch (error) {
    throw error.response?.data || { detail: "Login failed" };
  }
};







export const fetchPendingLawyers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-all-details/lawyers/unverified`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending lawyers:", error);
    return []; 
  }
};







export const fetchApprovedLawyers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-all-details/lawyers/verified`);
    return response.data;
  } catch (error) {
    console.error("Error fetching approved lawyers:", error);
    return []; // Return an empty array on error
  }
};




export const getLawyerDetails = async (lawyerId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get-all-details/lawyers/all-details/${lawyerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lawyer details:", error);
    throw error;
  }
};









export const updateLawyerVerification = async (lawyerId, isVerified, rejectionReason = "") => {
  const response = await axios.put(
    `${API_BASE_URL}/lawyers/lawyers/${lawyerId}/verification`,
    {
      is_verified: isVerified,
      rejection_reason: rejectionReason,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};






export const getRejectedLawyers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-all-details/lawyers/rejected`);
    return response.data; // API returns an array of rejected lawyers
  } catch (error) {
    console.error("Error fetching rejected lawyers:", error);
    throw error;
  }
};



export const getLawyerById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get-all-details/lawyers/all-details/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lawyer details:", error);
    throw error;
  }
};

/**
 * Fetch lawyers by practice area and city.
 */
export const fetchLawyersByCity = async (practiceArea, city) => {
  if (!city) return [];
  const res = await axios.get(
    `${API_BASE_URL}/get-all-details/lawyers?practice_area=${encodeURIComponent(
      practiceArea
    )}&location=${encodeURIComponent(city)}`
  );
  return res.data;
};

/**
 * Fetch lawyers by practice area and state.
 */
export const fetchLawyersByState = async (practiceArea, state) => {
  if (!state) return [];
  const res = await axios.get(
    `${API_BASE_URL}/get-all-details/lawyers?practice_area=${encodeURIComponent(
      practiceArea
    )}&location=${encodeURIComponent(state)}`
  );
  return res.data;
};
