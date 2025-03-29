import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerckerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 flex flex-col items-start gap-5">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-neutral-200 text-primary rounded-full">
          {icon ? (
            <img src={icon} alt={"icon"} className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>

        <p className="text-md">{icon ? "Cambiar ícono" : "Escoger ícono"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 absolute -top-2 -right-2 flex items-center justify-center border-2 border-neutral-600 hover:bg-rose-500 hover:text-white hover:border-none rounded-full z-10 cursor-pointer"
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerckerPopup;
