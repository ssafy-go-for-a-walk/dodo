const ModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.75)",
    zIndex: 9999,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    overflow: "auto",
    width: "256px",
    height: "160px",
    top: "70px",
    left: "auto",
    right: "16px",
    bottom: "auto",
    outline: "none",
    borderRadius: "16px",
    zIndex: 9999,
    padding: "8px 16px 8px 16px",
    fontSize: "14px",
  },
};

export default ModalStyle;
