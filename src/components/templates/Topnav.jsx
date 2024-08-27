import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/no-img.webp";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <>
      <div className="w-[100%] h-[10vh] relative flex justify-start items-center ml-[15%]">
        <i className="text-3xl text-zinc-400 ri-search-line "></i>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[50%] mx-10 p-5 text-xl outline-none bg-transparent text-white"
          placeholder="search anything..."
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="text-3xl text-zinc-400 ri-close-fill"
          ></i>
        )}

        <div className="z-[100] w-[50%] max-h-[50vh] absolute top-[100%] left-[5%] bg-zinc-200 overflow-auto rounded">
          {searches.map((s, i) => (
            <Link to={`${s.media_type}/details/${s.id}`}
              key={i}
              className="w-[100%] p-10 flex justify-start items-center border-b-2 duration-200
             border-zinc-100 text-zinc-600 font-semibold hover:text-black hover:bg-zinc-300"
            >
              <img
                className="w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg"
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.original_title || s.name || s.title || s.original_name}{" "}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Topnav;
