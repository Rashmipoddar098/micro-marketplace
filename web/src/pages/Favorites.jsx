import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites } from '../api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const Favorites = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        getFavorites()
            .then((res) => setProducts(res.data.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [user, navigate]);

    if (loading) return <div className="loading-wrap"><div className="spinner" /></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">❤️ My Favorites</h1>
                <p style={{ color: 'var(--text-muted)' }}>{products.length} saved product{products.length !== 1 ? 's' : ''}</p>
            </div>

            {products.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🤍</div>
                    <h3>No favorites yet</h3>
                    <p>Browse products and tap the heart to save them here</p>
                    <button className="btn btn-primary" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/products')}>
                        Browse Products
                    </button>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
