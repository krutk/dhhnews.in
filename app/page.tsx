import Image from "next/image";
import Navbar from "../components/navbar";
import Trending from "../components/trending";
import News from "../components/news";
import Poster from "../components/poster";
import Welcome from "../components/welcome";
import CallToAction from "../components/callToAction";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
export default function Home() {
  return (
    // <div className='bg-white'>
    <div>
      {/* <Navbar /> */}
      <div
        className="mt-8 relative rounded-lg bg-cover bg-center h-48 sm:h-96 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1508973379184-7517410fb0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="absolute inset-0 contrast-50 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-lg sm:text-xl lg:text-4xl font-bold mb-4 text-center font-unbounded">
            A Collaborative Desi Hip Hop News Website.
          </h1>
          <p className="text-md sm:text-xl text-center">
            <Link href="/about" className="underline">
              Know how it works!
              <ChevronRightIcon className="h-5 w-5 inline" />
            </Link>
          </p>
        </div>
      </div>
      {/* <div className="bg-blue-500 py-4 text-center text-white">
        <p className="text-xl">
          Welcome to our website!{" "}
          <Link href="/about" className="underline">
            Learn more about us <ChevronRightIcon className="h-5 w-5 inline" />
          </Link>
        </p>
      </div> */}

      <Trending />
      <News />
    </div>
    // {/* <Poster/>
    // <Welcome/>
    // <CallToAction/> */}
    // </div>
  );
}
