import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'
import Loading from './Loading';
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import VerticleCards from './templates/VerticleCards';
import InfiniteScroll from 'react-infinite-scroll-component';


const People = () => {
    document.title = 'People'
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true)
  
    
  const refreshHandler = ()=>{
    if(people.length === 0){
      GetPeople()
    }else{
      setPage(1)
      setPeople([])
      GetPeople()

    }
  }

  const GetPeople = async () => {
    try {
      const { data } = await axios.get(`person/${category}?page=${page}`);
      if(data.results.length > 0){

        setPeople((prevstate) => [...prevstate, ...data.results]);
        setPage(page + 1);
      }else{
        setMore(false)
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };


  useEffect(() => {
    GetPeople();
  }, [category]);

  useEffect(() => {
    refreshHandler();
  }, [category]);


  return people.length > 0 ? (
    <div className="w-screen h-screen">
      <div className="w-full flex items-center px-5">
        <h1
          onClick={() => navigate(-1)}
          className="text-2xl text-zinc-400 font-semibold cursor-pointer duration-150 hover:text-[#6556cd]"
        >
          <i className=" ri-arrow-left-line"></i>
          Person
        </h1>

        <Topnav />

        
        <div className="w-[2%]"></div>
        
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={GetPeople()}
        hasMore={more}
        loader={<h1> loading...</h1>}
      >
        <VerticleCards data={people} title='person' />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};


export default People;