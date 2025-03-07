/* https://cult-of-the-reader.onrender.com/api/v2 */
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

	getProfile: async () => {
		const response = await fetch(`${API_URL}/profile`, {
			method: "GET",
			headers: {
				Authorization: `${localStorage.getItem("token")}`,
			},
		});
		return response
	},

	putProfile: async (userData) => {
		const response = await fetch(`${API_URL}/profile`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("token")}`,
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

	postReviews: async (id, rating, comment) => {
		const response = await fetch(`${API_URL}/reviews`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				bookId: id,
				rating,
				comment,
			}),
		});

		return response
	},

	getCartItems: async () => {
		const response = await fetch(`${API_URL}/cart`, {
			method: "GET",
			headers: {
				Authorization: `${localStorage.getItem("token")}`
			}
		})

		return response.json()
	},

	postCartItem: async (bookId) => {
		const response = await fetch(`${API_URL}/add-cart`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${localStorage.getItem("token")}`,
			},
			body: JSON.stringify({ bookId }),
		});

		return response.json()
	},

	decrementCartItem: async (bookId) => {
		try {
			const response = await fetch(`${API_URL}/decrement-cart/${bookId}`, {
				method: "PUT",
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
			
			if (!response) {
				throw new Error("Failed to decrement item");
			}
			
			return response.json();
		} catch (error) {
			console.error("Error in decrementCartItem:", error);
			throw error;
		}
	},
	
	deleteCartItem: async (bookId) => {
		try {
			const response = await fetch(`${API_URL}/cart/${bookId}`, {
				method: "DELETE", 
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
			console.log(response)
			
			if (!response.ok) {
				throw new Error("Failed to remove item from cart");
			}
			
			return response.json();
		} catch (error) {
			console.error("Error in deleteCartItem:", error);
			throw error;
		}
	}

}