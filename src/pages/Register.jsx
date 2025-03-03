import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const response = await api.register({ username, email, pwd });
			console.log(response)
			if (response.ok) {
				navigate('/login')
			} else {
				setError(response.error)
			}
		} catch (err) {
			setError(err || "Error");
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<input
					type="password"
					value={pwd}
					onChange={(e) => setPwd(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit">Register</button>
			</form>
			{error && <p className="error">{error}</p>}
			</>
	);
};

export default Register;