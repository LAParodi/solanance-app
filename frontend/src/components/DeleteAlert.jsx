const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div className="flex flex-col">
      <p className="text-md text-center">{content}</p>

      <div className="flex justify-end mt-6">
        <button type="button" className="delete-btn" onClick={onDelete}>
          Borrar
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
