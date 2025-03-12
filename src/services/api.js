const API_URL = "http://localhost:3001/api/v2";

export default {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json()
  },

  login: async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json()
  },

  getProfile: async (token) => {
    console.log(token)
    const response = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `${token}`
      },
    });
    return response
  },

  putProfile: async (token, userData) => {
    const response = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify(userData),
    });
    return response.json()
  },

  getBooks: async () => {
    const response = await fetch(`${API_URL}/books`)
    return response.json()
  },

  getBookById: async (id) => {
    const response = await fetch(`${API_URL}/book/${id}`);
    return response
  },

  getReviewsBooks: async (id) => {
    const response = await fetch(`${API_URL}/book/${id}/reviews`);
    return response
  },

  postReviews: async (id, rating, comment, token) => {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify({
        bookId: id,
        rating,
        comment
      }),
    });

    return response
  },

  getCartItems: async (token) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: "GET",
      headers: {
        Authorization: `${token}`
      }
    })

    return response.json()
  },

  postCartItem: async (bookId, token) => {
    const response = await fetch(`${API_URL}/add-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`
      },
      body: JSON.stringify({ bookId }),
    });

    return response.json()
  },

  decrementCartItem: async (bookId, token) => {
    const response = await fetch(`${API_URL}/decrement-cart/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: `${token}`
      }
    });

    return response.json();
  },

  deleteCartItem: async (bookId, token) => {
      const response = await fetch(`${API_URL}/cart/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`
        }
      });

      return response.json();
  }

}