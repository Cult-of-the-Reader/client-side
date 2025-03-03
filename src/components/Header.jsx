import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Header = () => {
	const [showAuth, setShowAuth] = useState(false);
	const { user } = useAuth();
	const { logout: authLogout } = useAuth();

	return (
		<header className="header">
			<nav>
				<div className="account-menu">
					<button
						onClick={() => setShowAuth(!showAuth)}
						className="account-button"
					>
						My account
					</button>
					{showAuth && (
						<div className="auth-content">
							{!user ? (
								<>
									<Link to="/login" className="dropdown-link">Login</Link>
									<Link to="/register" className="dropdown-link">Register</Link>
								</>
							) : (
								<>
									<Link to="/profile" className="auth-content">Profile</Link>
									<Link to="/" className="logout-content" onClick={authLogout}>Logout</Link>
								</>
							)}
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Header