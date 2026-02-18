import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addFavorite, removeFavorite } from '../api';
import { useState } from 'react';

const ProductCard = ({ product }) => {
    const { user, favorites, updateFavorites } = useAuth();
    const navigate = useNavigate();
    const isFav = favorites.includes(product._id);
    const [animating, setAnimating] = useState(false);

    const handleFav = async (e) => {
        e.stopPropagation();
        if (!user) return navigate('/login');
        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);
        try {
            if (isFav) {
                const res = await removeFavorite(product._id);
                updateFavorites(res.data.favorites);
            } else {
                const res = await addFavorite(product._id);
                updateFavorites(res.data.favorites);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="product-card" onClick={() => navigate(`/products/${product._id}`)}>
            <div className="product-image-wrap">
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
                />
            </div>
            <div className="product-body">
                <div className="product-title">{product.title}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <div className="product-desc">{product.description}</div>
                <div className="product-actions">
                    <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }}>
                        View Details
                    </button>
                    <button
                        className={`fav-btn ${isFav ? 'active' : ''} ${animating ? 'active' : ''}`}
                        onClick={handleFav}
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFav ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
