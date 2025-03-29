import { getInitials } from "../../utils/helper";

const CharAvatar = ({ name, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"} ${height || "h-12"} ${
        style || ""
      } flex items-center justify-center font-medium text-content bg-neutral-200 rounded-full`}
    >
      {getInitials(name || "")}
    </div>
  );
};

export default CharAvatar;
