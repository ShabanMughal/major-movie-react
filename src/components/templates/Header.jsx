import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[60vh] flex flex-col justify-end items-start p-[4%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.7)),
     url(https://image.tmdb.org/t/p/original/${
       data.backdrop_path || data.profile_path
     })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="w-[70&] text-4xl font-black text-white">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      <p className="w-[70%] text-white mt-3">
        {data.overview.slice(0, 200)}..
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">See more</Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Available"}
        <i className="ml-4 text-yellow-500 ri-album-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="bg-[#6556cd] rounded p-2 text-white mt-5">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
