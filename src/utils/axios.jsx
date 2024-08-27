import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTk4YTEzZWYxZjk0ODdkZDg5ZDE0OTY0N2I5ZWJhOSIsIm5iZiI6MTcyNDMyNDA4MS42Nzg1NjMsInN1YiI6IjY2YzcxNDU1ODUzNDU2MGVlYWQ3ZWY1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rin0tK92THKmo8Us_BEbB8K-kStXxrrvVcgpaY58xmk",
  },
});

export default instance;
