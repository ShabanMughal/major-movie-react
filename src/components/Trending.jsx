import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../utils/axios";
import VerticleCards from "./templates/VerticleCards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true)
  document.title = 'Trending || ' + category;


  const refreshHandler = ()=>{
    if(trending.length === 0){
      GetTrend()
    }else{
      setPage(1)
      setTrending([])
      GetTrend()

    }
  }

  const GetTrend = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}?page=${page}`);
      if(data.results.length > 0){

        setTrending((prevstate) => [...prevstate, ...data.results]);
        setPage(page + 1);
      }else{
        setMore(false)
      }



      // setTrending(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };
 

  useEffect(() => {
    GetTrend();
  }, [category, duration]);

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);



  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center px-5">
        <h1
          onClick={() => navigate(-1)}
          className="text-2xl text-zinc-400 font-semibold cursor-pointer duration-150 hover:text-[#6556cd]"
        >
          <i className=" ri-arrow-left-line"></i>
          Trending<small className='text-sm text-zinc-600 ml-3'>({category})</small>
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          option={["movie", "tv", "all"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        <Dropdown
          title="Duration"
          option={["week", "day"]}
          func={(e) => setDuration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrend()}
        hasMore={more}
        loader={<h1> loading...</h1>}
      >
        <VerticleCards data={trending} title='all' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
