import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './Loading';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import VerticleCards from './templates/VerticleCards';
import InfiniteScroll from 'react-infinite-scroll-component';


const Popular = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true)
  document.title = 'Popular || ' + category;
  
    
  const refreshHandler = ()=>{
    if(popular.length === 0){
      GetPopular()
    }else{
      setPage(1)
      setPopular([])
      GetPopular()

    }
  }

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);
      if(data.results.length > 0){

        setPopular((prevstate) => [...prevstate, ...data.results]);
        setPage(page + 1);
      }else{
        setMore(false)
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };


  useEffect(() => {
    GetPopular();
  }, [category]);

  useEffect(() => {
    refreshHandler();
  }, [category]);


  return popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center px-5">
        <h1
          onClick={() => navigate(-1)}
          className="text-2xl text-zinc-400 font-semibold cursor-pointer duration-150 hover:text-[#6556cd]"
        >
          <i className=" ri-arrow-left-line"></i>
          Popular<small className='text-sm text-zinc-600 ml-3'>({category})</small>
        </h1>

        <Topnav />

        <Dropdown
          title="Category"
          option={["movie", "tv"]}
          func={(e) => setCategory(e.target.value)}
        />
        <div className="w-[2%]"></div>
        
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular()}
        hasMore={more}
        loader={<h1> loading...</h1>}
      >
        <VerticleCards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default Popular