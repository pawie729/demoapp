import { Search } from "@mui/icons-material";
import Footer from "../shared/components/Footer";
import Header from "../shared/components/Header";
import NavBar from "../shared/components/NavBar";
import Admin from "./admin/Admin";
import Modules from "./admin/containers/Modules";
import Asset from "./asset/Asset";

export default function Home() {
  return (
    <div className=" h-screen ">
      {/* header */}
      <Header />

      {/* main data area */}
      <div className=" grid grid-cols-5 ">
        {/* main menu area */}
        <div className=" grid h-full bg-red-500">
          {/* searchbar */}
          <div className=" flex-1 border rounded-lg m-2 mx-3 py-2 bg-white">
            <input placeholder="search keyword..."/>
            <Search />
          </div>

          {/* scrollable menu section */}
          <div className=" overflow-hidden flex-grow">
            <NavBar />
          </div>

          {/* menu footer */}
          <div className=" flex-1">
            <Footer/>
          </div>
          
        </div>

        {/* data grid area */}
        <div className=" col-span-4 bg-gray-400 bottom-0"></div>
      </div>
    </div>
  );
}
