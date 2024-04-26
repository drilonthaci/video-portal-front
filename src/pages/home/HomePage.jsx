import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { variables } from '../../Variables';
import Footer from '../../components/layout/footer/Footer';
import { faChevronLeft, faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import VideoList from '../../components/home/VideoList';

const HomePage = () => {
    const [videos, setVideos] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        startAutoplay();
        return stopAutoplay;
    }, [filteredVideos]);

    useEffect(() => {
        resetAutoplayInterval();
    }, [currentSlide]);

    async function fetchVideos() {
        try {
            const response = await fetch(`${variables.API_URL}/VideoPosts`);
            if (!response.ok) {
                throw new Error(`Failed to fetch videos (${response.status} ${response.statusText})`);
            }
            const videosData = await response.json();
            setVideos(videosData);
            setFilteredVideos(videosData);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }

    function handleSearch() {
        const searchData = videos.filter(video =>
            video.title.toLowerCase().includes(searchString.toLowerCase())
        );
        setFilteredVideos(searchData);
        setCurrentSlide(0);
    }

    const handleInputChange = (event) => {
        setSearchString(event.target.value);
    };

    function handleSlide(index) {
        setCurrentSlide(index);
        const carouselItems = carouselRef.current.querySelectorAll('[data-carousel-item]');
        carouselItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('block');
                item.classList.remove('hidden');
            } else {
                item.classList.remove('block');
                item.classList.add('hidden');
            }
        });
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % filteredVideos.length;
        handleSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + filteredVideos.length) % filteredVideos.length;
        handleSlide(prevIndex);
    }

    function startAutoplay() {
        if (filteredVideos.length > 0) {
            autoplayIntervalRef.current = setInterval(() => {
                if (currentSlide < 4) {
                    nextSlide();
                } else {
                    handleSlide(0);
                }
            }, 3000);
        } else {
            setTimeout(startAutoplay, 100);
        }
    }

    function resetAutoplayInterval() {
        clearInterval(autoplayIntervalRef.current);
        startAutoplay();
    }

    function stopAutoplay() {
        clearInterval(autoplayIntervalRef.current);
    }

    function handleLogoClick() {
        setSearchString('');
        setFilteredVideos(videos);
        fetchVideos();
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                <div className="mb-4">
                    <Link to="/" onClick={handleLogoClick}>
                        <FontAwesomeIcon icon={faHome} className="mr-2" />
                        Home
                    </Link>
                </div>

                <div id="default-carousel" className="relative w-full mb-4" data-carousel="slide" ref={carouselRef}>
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {filteredVideos.map((video, index) => (
                            <Link key={video.id} to={`/video/${video.id}`}>
                                <div className={`duration-700 ease-in-out ${index === 0 ? 'block' : 'hidden'}`} data-carousel-item>
                                    <img src={video.imageUrl} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {filteredVideos.slice(0, 5).map((_, index) => (
                            <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`} aria-current={index === currentSlide} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index} onClick={() => handleSlide(index)}></button>
                        ))}
                    </div>
                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={prevSlide}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={nextSlide}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                <div className="flex justify-end mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchString}
                            onChange={handleInputChange}
                            className="border rounded-l-md px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={handleSearch} className="bg-submain hover:bg-hover text-white py-2 px-4 rounded-r-md">
                            Search
                        </button>
                    </div>
                </div>

                {filteredVideos.length === 0 && (
                    <div className="text-center text-gray-500">No results found.</div>
                )}
                <VideoList videos={filteredVideos} />
            </div>
            <div className="bg-main py-10 sm:py-5">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto mt-10 grid max-w-lg grid-cols-5 sm:max-w-xl sm:grid-cols-5 sm:gap-x-6 lg:mx-0 lg:max-w-none lg:grid-cols-5 gap-x-4 gap-y-6">
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/aNet.webp" alt="aNet Image" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafa.webp" alt="/images/gjirafa.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafa50.webp" alt="/images/gjirafa50.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/gjirafapikbiz.webp" alt="/images/gjirafapikbiz.webp" className="h-5" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <img src="/images/lab.webp" alt="lab.webp" className="h-5" />
      </div>
    </div>
  </div>
</div>
            <Footer /> 
        </div>
    );
};

export default HomePage;