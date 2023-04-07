const DetailModalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 9999,
  },
  content: {
    backgroundColor: "white",
    overflow: "hidden",
    width: "728px",
    height: "360px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    zIndex: 10,
  },
};

export default DetailModalStyle;
