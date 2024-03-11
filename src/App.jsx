import { useEffect, useState } from "react";
import VideoComp from "./components/VideoComp/VideoComp";
import Videos from "./constants/videos";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const goToNextVideo = () => {
    if (currentVideoIndex < Videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
    if (currentVideoIndex === Videos.length - 1) {
      setCurrentVideoIndex(0);
    }
    setIsPlaying(true);
  };

  const goToPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
    if (currentVideoIndex === 0) {
      setCurrentVideoIndex(Videos.length - 1);
    }
    setIsPlaying(true);
  };

  return (
    <div className="app">
      {!isMobile ? (
        <div className="app__videos">
          <div className="desktop-navigation">
            <button className="nav-btn" onClick={goToPreviousVideo}>
              <BiChevronLeft size={80} />
            </button>
            <VideoComp
              {...Videos[currentVideoIndex]}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              videos={Videos}
            />
            <button className="nav-btn" onClick={goToNextVideo}>
              <BiChevronRight size={80} />
            </button>
          </div>
        </div>
      ) : (
        <div className="app__videos">
          {Videos.map((vid, i) => {
            return (
              <VideoComp
                key={i}
                {...vid}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isMobile={isMobile}
                videos={Videos}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
