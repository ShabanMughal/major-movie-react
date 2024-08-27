import React from "react";
import { Link } from "react-router-dom";
import noimage from '/no-img.webp'

const VerticleCards = ({ data, title }) => {

    
  return (
    <div className=" flex flex-wrap w-full justify-center mt-10 bg-[#1f1e24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type||title}/details/${c.id}`} key={i} className="relative mr-[5%] w-[25vh] mb-[5%]">
          <img
            className="h-[40vh] w-auto shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover"
            src={c.backdrop_path || c.poster_path || c.profile_path ?`https://image.tmdb.org/t/p/original/${
              c.backdrop_path || c.poster_path || c.profile_path
            }` : noimage }
            alt=""
          />
          <h1 className="text-2xl text-zinc-300 mt-3 font-semibold ">
          {c.original_title || c.name || c.title || c.original_name}
          </h1>

          {c.vote_average && (
          <div className="absolute top-2 right-2 text-white w-[5vh] h-[5vh] rounded-full flex justify-center items-center bg-yellow-600 ">
            {(c.vote_average * 10).toFixed()} <sup>%</sup>
          </div>
          )}

        </Link>
      ))}
    </div>
  );
};

export default VerticleCards;
