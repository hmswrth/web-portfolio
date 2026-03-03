import "./BlurButton.css";

const BlurButton = ({ children, onClick }) => {
  return (
    <button className="blur-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default BlurButton;
