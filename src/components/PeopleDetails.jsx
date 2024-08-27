import React, { useEffect } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import HorizontalCards from "./templates/HorizontalCards";

const PeopleDetails = () => {
  document.title = "Person || details";
  const { info } = useSelector((state) => state.person);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <>
      <div className="px-[10%] w-screen h-[190vh] flex flex-col bg-[#1f1e24]">
        <nav className="w-full h-[10vh] text-zinc-200 items-center flex gap-10 text-xl py-3">
          <Link
            onClick={() => navigate(-1)}
            className="text-2xlfont-semibold cursor-pointer hover:text-[#6556cd]"
          >
            <i className=" ri-arrow-left-line text-2xl"></i>
          </Link>
        </nav>

        <div className="w-full flex ">
          <div className="w-[20%]">
            <img
              className="h-[50vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] object-cover"
              src={`https://image.tmdb.org/t/p/original/${
                info.details.profile_path || info.details.backdrop_path
              }`}
              alt=""
            />
            <hr className="mb-5 mt-10 bg-zinc-500 border-none h-[2px]" />
            <div className="text-2xl text-white flex gap-x-10">
              {info.externalid.wikidata_id > 0 ? (
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                >
                  {" "}
                  <i className="ri-earth-fill"></i>{" "}
                </a>
              ) : (
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${info.externalid.imdb_id}`}
                >
                  {" "}
                  <i className="ri-earth-fill"></i>{" "}
                </a>
              )}

              {info.externalid.facebook_id > 0 ? (
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                >
                  <i className="ri-facebook-circle-fill"></i>{" "}
                </a>
              ) : (
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                >
                  <i className="ri-instagram-fill"></i>{" "}
                </a>
              )}
              <a
                target="_blank"
                href={`https://www.twitter.com/${info.externalid.twitter_id}`}
              >
                <i className="ri-twitter-x-fill"></i>{" "}
              </a>
            </div>
          </div>

          <div className="w-[80%] ml-[5%]">
            <h1 className="text-3xl text-zinc-200 font-black my-5">
              {info.details.name}
            </h1>
            <h1 className="text-2xl text-zinc-400 font-semibold my-5">
              Personal Info
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Known for:{" "}
              <span className="ml-2 font-normal">
                {info.details.known_for_department}
              </span>
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Birthday:{" "}
              <span className="ml-2 font-normal">{info.details.birthday}</span>
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Place of birth:{" "}
              <span className="ml-2 font-normal">
                {info.details.place_of_birth}
              </span>
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Gender:{" "}
              <span className="ml-2 font-normal">
                {info.details.gender === 2 ? "Male" : "Female"}
              </span>
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Deathday:{" "}
              <span className="ml-2 font-normal">
                {info.details.deathday || "Still alive"}
              </span>
            </h1>
            <h1 className="text-lg text-zinc-400 font-semibold">
              Popularity:{" "}
              <span className="ml-2 font-normal">
                {Math.floor(info.details.popularity) + " K"}
              </span>
            </h1>
          </div>
        </div>

        <div>
          <h1 className="text-3xl text-zinc-400 font-semibold mt-7">
            Biography
          </h1>
          <p className="mt-2 text-zinc-500">
            {info.details.biography.slice(0, 600)}...
          </p>
        </div>

        <div>
          <h1 className="text-3xl text-zinc-400 font-semibold my-10 ">
            Related films & TV Shows
          </h1>

          <HorizontalCards data={info.combinedcredits.cast} />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default PeopleDetails;
