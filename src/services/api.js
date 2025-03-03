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

	getBooks: async () => {
		const response = await fetch(`${API_URL}/books`)
		return response.json()
	},
}