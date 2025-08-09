export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span>
        {page} de {totalPages}
      </span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
        Próximo
      </button>
    </div>
  );
}
