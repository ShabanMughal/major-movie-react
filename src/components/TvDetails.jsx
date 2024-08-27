import React, { useEffect } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import HorizontalCards from "./templates/HorizontalCards";
import noimg from '/no-img.webp'

const TvDetails = () => {
  document.title = "TV || details" 
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.7), rgba(0,0,0,.9)),
   url(https://image.tmdb.org/t/p/original/${info.details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative w-screen h-[220vh] px-[10%]"
    >
      <nav className="w-full text-zinc-200 h-[10vh] items-center flex gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="text-2xlfont-semibold cursor-pointer"
        >
          <i className=" ri-arrow-left-line"></i>
          TVShows
        </Link>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          {" "}
          <i className="ri-earth-fill"></i>{" "}
        </a>
        <a target="_blank" href={info.details.homepage}>
          {" "}
          <i className="ri-external-link-fill"></i>{" "}
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          {" "}
          imdb
        </a>
      </nav>

      {/*  */}
      <div className="w-full flex">
        <img
          className="h-[50vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.details.poster_path || info.details.backdrop_path
          }`}
          alt=""
        />
        <div className="ml-[5%] text-white">
          <h1 className="text-5xl font-black text-white ">
            {" "}
            {info.details.original_title ||
              info.details.name ||
              info.details.title ||
              info.details.original_name}
            <small className="text-xl font-bold text-zinc-300">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex text-zinc-200 items-center gap-x-5 mb-5">
            <span className=" text-white w-[5vh] h-[5vh] rounded-full flex justify-center items-center bg-yellow-600 ">
              {(info.details.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1>User Score</h1>
            <h1>{info.details.first_air_date.split("-")[0]}</h1>
            <h1>{info.details.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.details.runtime} min</h1>
          </div>

          <h1 className="text-2xl font-semibold italic text-white">
            {info.details.tagline}
          </h1>
          <h1 className="text-2xl mt-5 text-white">Overview</h1>
          <p className="mb-10">{info.details.overview}</p>

          <Link
            to={`${pathname}/trailer`}
            className="px-5 py-3 bg-[#6556cd] rounded-lg"
          >
            Play Trailer <i className="ri-play-fill text-xl"></i>
          </Link>
        </div>
      </div>

      {/*  */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex items-center text-white gap-x-10">
            <h1>Available on Platform </h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md z-10"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex items-center text-white gap-x-10">
            <h1>Available on Rent </h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md z-10"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex items-center text-white gap-x-10">
            <h1>Available to Buy </h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md z-10"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/*  */}

      <h1 className="text-2xl font-semibold text-white">Seasons </h1>
      <div className="w-full flex overflow-y-hidden mb-5 p-5 ">
        {info.details.seasons.length > 0 ? info.details.seasons.map((s, i) => (
          <div className="w-[15vh] mr-[10%]" key={i}>
        
            <img
              className="h-[40vh] min-w-[14vw] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover"
              src={s.poster_path ? `https://image.tmdb.org/t/p/original/${s.poster_path}` : noimg}
              alt="no image"
              />

            <h1 className="text-xl font-semibold mt-2 text-zinc-300">
              {s.name}
            </h1>
        
            
          </div>
        )): <h1 className="text-3xl mt-5 text-white font-black text-center">
        Nothing to show
      </h1>}
      </div>

      {/*  */}
      <hr className="mb-5 mt-10 bg-zinc-500 border-none h-[2px]" />

      <h1 className="text-2xl font-semibold text-white">
        Recommendations & Simillar{" "}
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default TvDetails;
