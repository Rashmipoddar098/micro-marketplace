const Pagination = ({ pagination, page, setPage }) => {
    if (!pagination.totalPages || pagination.totalPages <= 1) return null;

    const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={() => setPage(page - 1)}
                disabled={!pagination.hasPrev}
            >
                ←
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    className={`page-btn ${p === page ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                >
                    {p}
                </button>
            ))}

            <button
                className="page-btn"
                onClick={() => setPage(page + 1)}
                disabled={!pagination.hasNext}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
