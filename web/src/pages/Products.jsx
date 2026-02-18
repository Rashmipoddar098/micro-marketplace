import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getProducts({ page, limit: 8, q: debouncedSearch });
            setProducts(res.data.data);
            setPagination(res.data.pagination);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [page, debouncedSearch]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">🛍️ Marketplace</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {pagination.total ? `${pagination.total} products available` : 'Discover amazing products'}
                </p>
            </div>

            <div className="search-bar">
                <div className="search-input-wrap">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {!user && (
                    <button className="btn btn-primary" onClick={() => navigate('/login')}>
                        Sign in to favorite
                    </button>
                )}
            </div>

            {loading ? (
                <div className="loading-wrap"><div className="spinner" /></div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try a different search term</p>
                </div>
            ) : (
                <>
                    <div className="products-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <Pagination pagination={pagination} page={page} setPage={setPage} />
                </>
            )}
        </div>
    );
};

export default Products;
