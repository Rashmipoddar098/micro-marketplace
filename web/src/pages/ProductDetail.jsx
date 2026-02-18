import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct } from '../api';
import { addFavorite, removeFavorite } from '../api';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, favorites, updateFavorites } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [favLoading, setFavLoading] = useState(false);
    const [animating, setAnimating] = useState(false);

    const isFav = favorites.includes(id);

    useEffect(() => {
        getProduct(id)
            .then((res) => setProduct(res.data.data))
            .catch(() => setError('Product not found'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleFav = async () => {
        if (!user) return navigate('/login');
        setFavLoading(true);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);
        try {
            if (isFav) {
                const res = await removeFavorite(id);
                updateFavorites(res.data.favorites);
            } else {
                const res = await addFavorite(id);
                updateFavorites(res.data.favorites);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setFavLoading(false);
        }
    };

    if (loading) return <div className="loading-wrap"><div className="spinner" /></div>;
    if (error) return (
        <div className="page-container">
            <div className="empty-state">
                <div className="empty-state-icon">😕</div>
                <h3>{error}</h3>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Products</Link>
            </div>
        </div>
    );

    return (
        <div className="product-detail">
            <Link to="/products" className="back-link">← Back to Products</Link>
            <div className="product-detail-card">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-detail-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/500x400?text=No+Image'; }}
                />
                <div className="product-detail-body">
                    <div className="product-detail-title">{product.title}</div>
                    <div className="product-detail-price">${product.price.toFixed(2)}</div>
                    <p className="product-detail-desc">{product.description}</p>
                    {product.createdBy && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                            Listed by <span className="badge">{product.createdBy.name}</span>
                        </p>
                    )}
                    <div className="product-detail-actions">
                        <button
                            className={`btn ${isFav ? 'btn-danger' : 'btn-primary'} ${animating ? 'active' : ''}`}
                            onClick={handleFav}
                            disabled={favLoading}
                            style={{ minWidth: '160px' }}
                        >
                            {isFav ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
