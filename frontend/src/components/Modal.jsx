import { IoCloseCircle } from "react-icons/io5";
const Modal = ({ title, isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="p-4 md:pd-5 flex items-center justify-between">
            <h3 className="text-lg font-medium text-content">{title}</h3>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex justify-center items-center cursor-pointer"
            >
              <IoCloseCircle className="text-lg w-20 h-20 hover:text-rose-700" />
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
