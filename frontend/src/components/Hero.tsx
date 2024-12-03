import { Link } from "react-router";
const Hero= () => {
  return (
    <div className="relative min-h-screen overflow-hidden w-full bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-0 opacity-90 w-full min-h-screen">
        <img
          src="/SPACE.png"
          className="object-cover w-full h-full"
          alt="Space background"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute -top-[700px] -left-[100px]">
        <img src="/Gradient3.svg" className="relative" alt="Gradient overlay" />
      </div>
      <div className="absolute opacity-80 md:opacity-100 -top-[700px] -right-[1000px] sm:-top-[500px] sm:-right-[800px]">
        <img src="/gradient1.svg" className="relative" alt="Gradient overlay" />
      </div>

      {/* Top Navigation */}
      <div className="flex justify-between w-full items-center relative z-10 px-2 sm:px-10 py-3">
        <div className="flex space-x-2">
          <Link to="/login"> <button>LOGIN</button></Link>
          <Link to="/register"> <button>SIGN UP</button></Link>
        </div>
        <button className="text-sm sm:text-lg px-4 sm:px-0 sm:w-[200px] h-[48px] border-white border">
          START EXPLORING
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-[80vh] flex flex-col justify-center items-center text-center">
        <h1 className="AberMono text-5xl md:text-8xl">FULLTOSS</h1>
        <div className="relative max-w-3xl my-5">
          <p className="Raleway-Medium text-2xl sm:text-[32px]">
           Gamify your Shopping and dinning expericence
          </p>
          <p className="Raleway-Regular py-5 text-2xl">
            your one stop destination for all your shopping and dinning needs while your enjoy your favorite games
          </p>
        </div>
        <button className="AberMono text-3xl bg-white text-black w-[320px] h-[60px]">
          GET STARTED
        </button>
      </div>

      {/* Bottom Gradient Overlays */}
      <div className="absolute -bottom-[800px] -left-[600px] sm:-bottom-[700px] sm:-left-[500px]">
        <img src="/gradient.svg" className="relative" alt="Bottom gradient overlay" />
      </div>
      <div className="absolute -bottom-[350px] left-[450px]">
        <img src="/Gradient2.svg" className="relative" alt="Bottom gradient overlay" />
      </div>
    </div>
  );
};

export default Hero;
