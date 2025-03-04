import { useState, useEffect } from "react";

const Profile = () => {
	const [userData, setUserData] = useState({
		phoneNumber: "",
		dateOfBirth: "",
		address: "",
		country: "",
		postalCode: "",
		city: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch("http://localhost:3001/api/v1/profile", {
					method: "GET",
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				});
				const data = await response.json();
				setUserData({
					phoneNumber: data.phoneNumber || "",
					dateOfBirth: data.dateOfBirth || "",
					address: data.address || "",
					country: data.country || "",
					postalCode: data.postalCode || "",
					city: data.city || "",
				});
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);

	const handleChange = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:3001/api/v1/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${localStorage.getItem("token")}`,
				},
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				setIsEditing(false);
			} else {
				console.error("Error updating profile.");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	return (
		<div>
			<h2>Mi Perfil</h2>

			<form onSubmit={handleSubmit}>
				<label>
					Teléfono:
					<input
						type="text"
						name="phoneNumber"
						value={userData.phoneNumber}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					Fecha de Nacimiento:
					<input
						type="date"
						name="dateOfBirth"
						value={userData.dateOfBirth}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					Dirección:
					<input
						type="text"
						name="address"
						value={userData.address}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					País:
					<input
						type="text"
						name="country"
						value={userData.country}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					Código Postal:
					<input
						type="text"
						name="postalCode"
						value={userData.postalCode}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<label>
					Ciudad:
					<input
						type="text"
						name="city"
						value={userData.city}
						onChange={handleChange}
						disabled={!isEditing}
					/>
				</label>
				<div>
					{isEditing ? (
						<button type="submit">Guardar Cambios</button>
					) : (
						<button type="button" onClick={(e) => {
							e.preventDefault()
							setIsEditing(true)
						}}>
							Editar Perfil
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

export default Profile;
