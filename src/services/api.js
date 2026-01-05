const API_BASE_URL = `${import.meta.env.VITE_ENDPOINT}/api`;

async function request(endpoint, options = {}) {
  const config = {
    ...options,
    headers: {
      'Accept': 'application/json',
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
    if (obj[key] !== null && obj[key] !== undefined) {
      fd.append(key, obj[key]);
    }
  }
  return fd;
}

export const api = {
  // ==================== AUTH ====================
  
  // POST /login (form-data)
  postLogin(data) {
    return request("/login", {
      method: "POST",
      body: toFormData(data)
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
  getUser(token) {
    return request("/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },


  // POST /logout
  postLogout(token) {
    return request("/logout", {
      method: "POST",
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // ==================== QUESTIONS ====================
  
  // GET /list-assignments - Get all questions (requires auth)
  getQuestionList(token) {
    return request("/question", {
      method: "GET",
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // GET /question/:id - Get question by ID (requires auth)
  getQuestionById(id, token) {
    return request(`/question/${id}`, {
      method: "GET",
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // POST /question - Create new question (form-data, requires auth)
  postCreateQuestion(data, token) {
    return request("/question", {
      method: "POST",
      body: toFormData(data),
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // PUT /question/:id - Update question (form-data with _METHOD, requires auth)
  putUpdateQuestion(id, data, token) {
    const formData = toFormData(data);
    formData.append('_method', 'PUT');
    
    return request(`/question/${id}`, {
      method: "POST",
      body: formData,
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // DELETE /question/:id - Soft delete question (form-data with _METHOD, requires auth)
  deleteQuestion(id, token) {
    const formData = new FormData();
    formData.append('_method', 'DELETE');
    
    return request(`/question/${id}`, {
      method: "POST",
      body: formData,
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // ==================== SUBMISSIONS ====================
  
  // GET /submiting - Get all user submissions (requires auth)
  getSubmissions(token) {
    return request("/submiting", {
      method: "GET",
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },

  deleteSubmission(id, token) {
    const formData = new FormData();
    // formData.append('_method', 'DELETE');
    
    return request(`/submiting/${id}`, {
      method: "POST",
      body: formData,
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {}
    });
  },
  
  // ==================== RULES ====================
  
  // GET /rules - Get rules/SOP
  getRules(token) {
    return request("/rules", {
      method: "GET",
      headers: token ? {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      } : {
        'Accept': 'application/json'
      }
    });
  },
  
  // PUT /rules - Update rules/SOP (form-data with _METHOD)
  putUpdateRules(data, token) {
    const formData = new FormData();
    formData.append('data', data);
    formData.append('_method', 'PUT');
    
    console.log('API putUpdateRules called with:', { data, token });
    
    return request("/rules", {
      method: "POST",
      body: formData,
      headers: token ? {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
      } : {
        'Accept': 'application/json'
      }
    });
  }
};