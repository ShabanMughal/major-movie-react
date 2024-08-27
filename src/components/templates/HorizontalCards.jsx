import React, { useRef } from "react";
import { Link } from "react-router-dom";
import noimage from '/no-img.webp';

const HorizontalCards = ({ data }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = direction === 'left'
        ? scrollLeft - (clientWidth * 0.2)  // Scroll left by 20% of container width
        : scrollLeft + (clientWidth * 0.2); // Scroll right by 20% of container width

      // Ensure scroll amount stays within bounds
      scrollRef.current.scrollTo({
        left: Math.max(0, Math.min(scrollAmount, scrollWidth - clientWidth)),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full p-5 mb-5">
      <div
        ref={scrollRef}
        className="w-full flex overflow-x-scroll scrollbar-hide"
      >
        {data.length > 0 ? (
          data.map((d, i) => (
            <Link
              to={`/${d.media_type}/details/${d.id}`}
              key={i}
              className="min-w-[20%] h-[45vh] mr-5 mb-5 bg-zinc-900"
            >
              <img
                className="w-full h-[55%] object-cover"
                src={d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path}`
                  : noimage}
                alt=""
              />
              <div className="p-2 text-white h-[45%] overflow-y-auto">
                <h1 className="text-xl font-semibold mt-2">
                  {d.original_title || d.name || d.title || d.original_name}
                </h1>
                <p className="mb-3 text-sm">
                  {d.overview.slice(0, 50)}..
                  <Link className="text-zinc-400">See more </Link>
                </p>
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">
            Nothing to show
          </h1>
        )}
      </div>
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => scroll('left')}
          className="text-white bg-zinc-900 p-2 rounded hover:bg-[#6556cd]"
        >
          Left
        </button>
        <button
          onClick={() => scroll('right')}
          className="text-white bg-zinc-900 p-2 rounded hover:bg-[#6556cd]"
        >
          Right
        </button>
      </div>
    </div>
  );
};

export default HorizontalCards;
