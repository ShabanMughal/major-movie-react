import React, { useEffect, useState } from 'react'
import Sidenav from './templates/Sidenav';
import Topnav from './templates/Topnav';
import axios from "../utils/axios";
import Header from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
import Dropdown from './templates/Dropdown';
import Loading from './Loading';

const Home = () => {
    document.title = 'Home';

    const [wallpaper, setWallpaper] = useState(null)
    const [trending, setTrending] = useState(null)
    const [category, setCategory] = useState('all')

    const GetWallpaper =  async () => {
        try {
          const { data } = await axios.get(`/trending/all/day`);
          let randomdata =  data.results[(Math.random() * data.results.length).toFixed()]
          setWallpaper(randomdata);
        } catch (error) {
          console.log("Error:", error);
        }
      };
      
      
      const GetTrending = async ()=>{
        try{
          const {data} = await axios.get(`/trending/${category}/day`)
          setTrending(data.results)
        }
        catch(error){
          console.log('Error:', error);
          
        }
      }
     
      
      useEffect(() => {
        GetTrending()
        !wallpaper && GetWallpaper();
      }, [category]);


  return wallpaper ? (
    <>
    <Sidenav />
    <div className='w-[80%] h-full overflow-auto'>
        <Topnav />
        <Header data={wallpaper} />

        <div className="p-5 flex justify-between">
        <h1 className="text-2xl text-zinc-400 font-semibold">Trending</h1>

       <Dropdown title='filter' option={['tv', 'movie', 'all']} func={(e)=> setCategory(e.target.value)} />


      </div>


        <HorizontalCards data={trending}  />
    </div>

    </>
  ) : 
  <Loading />
}

export default Home