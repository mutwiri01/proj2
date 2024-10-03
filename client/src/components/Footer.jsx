import logo from "../assets/lf.jpg";
const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div className="col-span-2 lg:col-span-2 text-center lg:text-left">
          <h1 className="text-lg font-bold">TILAS TOBIAS</h1>
          <p className="text-sm">Nairobi, Kenya</p>
          <p className="text-sm">
            <a href="tel:+254700639201" className="text-blue-500">
              0700639201
            </a>
          </p>
          <p className="text-sm">
            <a href="mailto:tilasray@gmail.com" className="text-blue-500">
              tilasray@gmail.com
            </a>
          </p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img className="hw-24 h-auto lg:w-32 mx-auto lg:mx-0" src={logo} alt="Logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
