import CustomModal from "../CustomModal";
import logo from "../../assets/logo.png";

export const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center flex-wrap w-[95vw]">
          <img src={logo} className="w-[auto] h-[2rem]" alt="logo" />
        <div className="self-center justify-self-center">
          <CustomModal />
        </div>
      </header>
    </>
  );
};

export default Header;
