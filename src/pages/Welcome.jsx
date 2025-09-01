import { Link } from "react-router-dom";
import WelcomeImg from '../assets/WelcomeImg.png'

const Welcome = ()=> {
  return (
    <main className="bg-white">
      <section className="relative isolate">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 sm:gap-12 px-4 py-8 sm:py-10 md:py-24 md:grid-cols-2" style={{marginTop: "-2.5rem"}}>
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-3">
              Organize ideas. Capture notes. Stay focused.
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              A minimal, secure MERN notes app with fast search, pinning, and JWT-protected access.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center rounded-md bg-black px-4 sm:px-5 py-2 sm:py-3 text-sm font-semibold text-white hover:bg-gray-700 transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center rounded-md px-4 sm:px-5 py-2 sm:py-3 text-sm font-semibold ring-1 ring-inset ring-black/15 hover:bg-slate-200 transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                Login
              </Link>
            </div>
            <p className="mt-3 text-sm sm:text-base text-slate-800">
             Start adding notes in seconds.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <img src={WelcomeImg} alt="WelcomeImg" className="w-64 sm:w-80 md:w-96 lg:w-100"/>
         </div> 

          
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t bg-slate-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 px-4 py-8 sm:py-10 sm:grid-cols-2 lg:grid-cols-3">
          <Feature title="Secure JWT Auth" text="Protected routes and token-based access." />
          <Feature title="Pin & Search" text="Keep important notes on top and find notes fast." />
          <Feature title="Clean UI" text="Fast, distraction‑free experience with toasts." />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, text }) {
  return (
    <div className="rounded-lg border bg-white p-4 sm:p-5 text-center sm:text-left">
      <h3 className="text-sm sm:text-base font-semibold">{title}</h3>
      <p className="mt-1 text-xs sm:text-sm text-slate-700">{text}</p>
    </div>
  );
}


export default Welcome;