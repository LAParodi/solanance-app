import { useRef, useState } from "react";
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputFileRef = useRef(null);

  const [previewImageURL, setPreviewImageURL] = useState(null);

  //----- Manejador de vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewImageURL(preview);
    }
  };

  //----- Manejador para borrar vista previa
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewImageURL(null);
    inputFileRef.current.value = "";
  };

  //----- Función de acción del componente referido
  const onChooseFile = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="profileImg-container">
      <input
        type={"file"}
        accept="image/*"
        ref={inputFileRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="image-container">
          <LuUser className="text-4xl text-secondary" />
          <button type="button" onClick={onChooseFile} className="uploadBtn">
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewImageURL}
            alt={"avatar escogido"}
            className="imgToUpload"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="removeBtn"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
