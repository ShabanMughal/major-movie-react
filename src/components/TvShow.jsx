import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './Loading';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import VerticleCards from './templates/VerticleCards';
import InfiniteScroll from 'react-infinite-scroll-component';


const TvShow = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true)
    document.title = 'Tv Shows || ' + category;
  
    
  const refreshHandler = ()=>{
    if(tv.length === 0){
      GetTv()
    }else{
      setPage(1)
      setTv([])
      GetTv()

    }
  }

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`tv/${category}?page=${page}`);
      if(data.results.length > 0){

        setTv((prevstate) => [...prevstate, ...data.results]);
        setPage(page + 1);
      }else{
        setMore(false)
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };


  useEffect(() => {
    GetTv();
  }, [category]);

  useEffect(() => {
    refreshHandler();
  }, [category]);


  return tv.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center px-5">
        <h1
          onClick={() => navigate(-1)}
          className="text-2xl text-zinc-400 font-semibold cursor-pointer duration-150 hover:text-[#6556cd]"
        >
          <i className=" ri-arrow-left-line"></i>
          Tv<small className='text-sm text-zinc-600 ml-3'>({category})</small>
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          option={["popular", "top_rated", 'on_the_air','airing_today']}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv()}
        hasMore={more}
        loader={<h1> loading...</h1>}
      >
        <VerticleCards data={tv} title='tv' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default TvShow;