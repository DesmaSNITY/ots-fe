

const API_BASE_URL = `${import.meta.env.VITE_ENDPOINT}/api`;

async function request(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      ...(options.headers || {})
    }
  };

  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    let msg = "Unknown error";
    const contentType = res.headers.get("content-type");
      
    if (contentType && contentType.includes("application/json")) {
      const json = await res.json();
      msg = json.message || JSON.stringify(json);
    }

    throw new Error(`API Error: ${msg}`);
  }

  return res.json();
}

// Helper to build form data
function toFormData(obj) {
  const fd = new FormData();
  for (let key in obj) {
    fd.append(key, obj[key]);
  }
  return fd;
}

export const api = {


  // POST /login (form-data)
  postLogin(data) {
    return request("/login", {
      method: "POST",
      body: toFormData(data)
      // No JSON header here
    });
  },

  // POST /register (form-data)
  postRegister(data) {
    return request("/register", {
      method: "POST",
      body: toFormData(data)
    });
  },

  // GET /user (requires Bearer token)
//   getUser(token) {
//     return request("/user", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   },

  
  postCreateQuestion(data) {
    return request("/question", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  getQuestionById(id) {
    return request(`/question/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }        
    });
  },

  getQuestionList() {
    return request(`/list-assignments`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  },
};
