const API_URL = "http://localhost:3001/api/v1";

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
	}

}