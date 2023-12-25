import ReactDOM from "react-dom"

const SharePortal = ({ children }) => {
  const portalRoot = document.getElementById("card-root")
  return ReactDOM.createPortal(children, portalRoot)
}

export default SharePortal
