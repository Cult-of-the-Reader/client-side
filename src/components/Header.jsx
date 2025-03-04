import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Header = () => {
	const [showAuth, setShowAuth] = useState(false);
	const { user } = useAuth();
	const { logout: authLogout } = useAuth();
	const logged = !!localStorage.getItem("token")

	const toggleMenu = () => {
    setShowAuth(!showAuth);
  };

  const closeMenu = () => {
    setShowAuth(false);
  };

	return (
		<header >
			<h1><Link to="/">
				Cult Of The Reader
			</Link></h1>
			<nav>
				<div >
					<button
						onClick={toggleMenu}
					>
						{logged ? ("My account"
) : ("Auth") }
					</button>
					{showAuth && (
						<div >
							{!user ? (
								<>
								<div></div>
									<Link to="/login"  onClick={closeMenu}>Login</Link>
									<Link to="/register" onClick={closeMenu}>Register</Link>
								</>
							) : (
								<>
									<Link to="/profile" onClick={closeMenu}>Profile</Link>
									<Link to="/" onClick={() => { authLogout(); closeMenu(); }}>Logout</Link>
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