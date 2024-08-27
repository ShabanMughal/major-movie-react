import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './Loading';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import VerticleCards from './templates/VerticleCards';
import InfiniteScroll from 'react-infinite-scroll-component';


const Movie = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true)
  document.title = 'Movie || ' + category;
  
    
  const refreshHandler = ()=>{
    if(movie.length === 0){
      GetMovie()
    }else{
      setPage(1)
      setMovie([])
      GetMovie()

    }
  }

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`movie/${category}?page=${page}`);
      if(data.results.length > 0){

        setMovie((prevstate) => [...prevstate, ...data.results]);
        setPage(page + 1);
      }else{
        setMore(false)
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };


  useEffect(() => {
    GetMovie();
  }, [category]);

  useEffect(() => {
    refreshHandler();
  }, [category]);


  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center px-5">
        <h1
          onClick={() => navigate(-1)}
          className="text-2xl text-zinc-400 font-semibold cursor-pointer duration-150 hover:text-[#6556cd]"
        >
          <i className=" ri-arrow-left-line"></i>
          Movie<small className='text-sm text-zinc-600 ml-3'>({category})</small>
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          option={["popular", "top_rated", 'upcoming','now_playing']}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie()}
        hasMore={more}
        loader={<h1> loading...</h1>}
      >
        <VerticleCards data={movie} title='movie' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default Movie;