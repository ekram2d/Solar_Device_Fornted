import { Outlet } from "react-router-dom";
import Navbar from "../../pages/share/Navbar/Navbar";

// import Navbar from "../../pages/shared/navbar/Navbar";
// import Footer from "../../pages/shared/footer/Footer";

export const Main = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <Navbar />
      <Outlet></Outlet>
      {/* <Footer/> */}
    </div>
  );
};

export default Main;
