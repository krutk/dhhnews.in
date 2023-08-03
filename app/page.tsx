import Image from "next/image";
import Navbar from "../components/navbar";
import Trending from "../components/trending";
import News from "../components/news";
import Poster from "../components/poster";
import Welcome from "../components/welcome";
import CallToAction from "../components/callToAction";
export default function Home() {
  return (
    // <div className='bg-white'>
    <div>
      {/* <Navbar /> */}

      <Trending />
      <News />
    </div>
    // {/* <Poster/>
    // <Welcome/>
    // <CallToAction/> */}
    // </div>
  );
}
