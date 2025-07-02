import { Outlet } from "react-router";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import { useEffect, useRef } from "react";
import { animate, inView } from "motion";

function App() {

  const footRef = useRef();
  useEffect(() => {

    inView(footRef.current, () => {
      animate(
        footRef.current,
        { y: [400, 0], opacity: [0, 1] },
        { duration: 1, easing: "ease-out" }
      );
    });
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
        <ToastContainer></ToastContainer>
      </div>
      <div>
        <footer ref={footRef}>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

export default App;
