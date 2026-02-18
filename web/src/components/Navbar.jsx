import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-brand">🛍️ MicroMarket</NavLink>
            <div className="navbar-links">
                {user ? (
                    <>
                        <NavLink to="/products" className="nav-link">Products</NavLink>
                        <NavLink to="/favorites" className="nav-link">❤️ Favorites</NavLink>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '0 0.5rem' }}>
                            Hi, {user.name.split(' ')[0]}
                        </span>
                        <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                        <NavLink to="/register" className="btn btn-primary btn-sm">Register</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
