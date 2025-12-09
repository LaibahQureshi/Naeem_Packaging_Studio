const API_URL = 'http://localhost:5000/api';

// Products API
export const productAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },
  
  create: async (product) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Orders API
export const orderAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/orders`);
    return response.json();
  },
  
  create: async (order) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    return response.json();
  },
  
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};

// Messages API
export const messageAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/messages`);
    return response.json();
  },
  
  create: async (message) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    return response.json();
  }
};