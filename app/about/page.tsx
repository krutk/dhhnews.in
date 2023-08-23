import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-4xl lg:text-6xl font-unbounded font-bold my-6 text-gray-900">
        ABOUT
      </h1>
      <p className="w-full text-justify sm:w-2/3 text-xl  text-gray-700 mb-12">
        Welcome to the ultimate Desi Hip Hop News Website! Dive into the
        freshest news around the Desi Hip Hop scene without any sign-up or login
        hassles.
      </p>
      <p className="w-full text-justify sm:w-2/3 text-xl  text-gray-700 mb-12">
        Want to share your hip hop news? Just sign up, log in, and submit!
      </p>
      <div className="flex flex-col gap-5 justify-center mt-8 font-unbounded">
        <Link
          href="/register"
          className="w-full font-medium md:w-1/2 lg:w-1/3 border-4 border-gray-600 bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-full text-lg flex items-center justify-between space-x-2"
        >
          <span>Sign Up</span>{" "}
          <span>
            <ChevronRightIcon
              className="mx-auto h-8 w-8 text-gray-300"
              aria-hidden="true"
            />
          </span>
        </Link>
        <Link
          href="/login"
          className=" font-medium w-full md:w-1/2 lg:w-1/3 border-4 border-gray-600 bg-gray-100 hover:bg-gray-300 text-gray-600 py-2 px-6 rounded-full text-lg flex items-center justify-between space-x-2"
        >
          <span>Log In</span>{" "}
          <span>
            <ChevronRightIcon
              className="mx-auto h-8 w-8  text-gray-600"
              aria-hidden="true"
            />
          </span>
        </Link>
        <p className="w-full font-unbounded text-justify sm:w-2/3 text-xl text-gray-700 my-8">
          Unlock the power of Desi hip-hop culture. Join us today!
        </p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-4 bg-gradient-to-r from-purple-300 to-blue-300 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Explore News Without Signing Up
          </h2>
          <p className="text-gray-700">
            Dive into the latest happenings in the Desi hip-hop world without
            the hassle of signing up or logging in. Stay informed with ease.
          </p>
        </div>
        <div className="p-4 bg-gradient-to-r from-purple-300 to-blue-300 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Submit Your Own News
          </h2>
          <p className="text-gray-700">
            Join the community by submitting your own Desi hip-hop news. Sign
            up, log in, and start sharing your stories and updates.
          </p>
        </div>
      </div> */}
      <div className="py-4 ">
        <h2 className="text-xl font-unbounded mb-4 text-gray-700">
          Approval Process
        </h2>
        <p className="text-gray-700 text-xl mb-8">
          After you submit your juicy news, our groovy admins will review it.
          Once approved, it will be on display for the whole world to see!
        </p>
      </div>
      {/* <div
        className="relative contrast-50 rounded-lg bg-cover bg-center h-96"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558258021-971dd2148be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-4 text-center">
            Unlock the power of Desi hip-hop culture.
          </h1>
          <p className="text-xl sm:text-2xl text-center">
            Join us today and stay connected with the freshest news in the
            scene!
          </p>
        </div>
      </div> */}
      <div
        className="relative rounded-lg bg-cover bg-center h-96 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558258021-971dd2148be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
        }}
      >
        <div className="absolute inset-0 contrast-50 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-4 text-center font-unbounded">
            Unlock the power of Desi hip-hop culture.
          </h1>
          <p className="text-lg sm:text-xl text-center">
            Join us today and stay connected with the freshest news in the
            scene!
          </p>
        </div>
      </div>
      <footer className="flex items-center justify-center space-x-4 py-8">
        <a
          href="https://www.instagram.com/dhhnews.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <FaInstagram className="text-2xl" />
        </a>
        <a
          href="https://twitter.com/Dhhnewsin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <FaTwitter className="text-2xl" />
        </a>
        <a
          href="mailto:dhhnews.in@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <FaEnvelope className="text-2xl" />
        </a>
      </footer>
    </div>
  );
};

export default AboutPage;
