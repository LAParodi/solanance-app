const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="infoCard__details">
      <div className={`details-icon ${color}`}>{icon}</div>

      <div className="flex flex-col justify-center">
        <h6 className="details-label">{label}</h6>
        <span className="details-value">S/{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
