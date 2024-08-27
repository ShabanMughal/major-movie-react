import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return (
    <div className="bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute top-[5%] right-[5%] text-4xl text-white ri-close-fill hover:text-[#6556cd]"
      ></Link>


     {ytvideo ?( <ReactPlayer
     controls
        height={550}
        width={1000}
        url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
      />) : (<NotFound />) }

      
    </div>
  ) 
};

export default Trailer;
