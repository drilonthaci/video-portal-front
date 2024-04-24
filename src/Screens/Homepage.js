import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { variables } from '../Variables';

const HomePage = () => {
    const [videos, setVideos] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);
    const autoplayIntervalRef = useRef(null);


    useEffect(() => {
        fetchVideos();
        startAutoplay();
        return stopAutoplay;
    }, []);

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
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }

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
        const nextIndex = (currentSlide + 1) % videos.length;
        handleSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + videos.length) % videos.length;
        handleSlide(prevIndex);
    }

    function startAutoplay() {
        autoplayIntervalRef.current = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds
    }

    function resetAutoplayInterval() {
        clearInterval(autoplayIntervalRef.current);
        startAutoplay();
    }

    function stopAutoplay() {
        clearInterval(autoplayIntervalRef.current);
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8 relative">
                {/* Carousel */}
                <div id="default-carousel" className="relative w-full" data-carousel="slide" ref={carouselRef}>
                    {/* Carousel items */}
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {videos.map((video, index) => (
                            <Link key={video.id} to={`/video/${video.id}`}>
                                <div className={`duration-700 ease-in-out ${index === currentSlide ? 'block' : 'hidden'}`} data-carousel-item>
                                    <img src={video.imageUrl} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* Slider indicators */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {videos.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`}
                                aria-current={index === currentSlide}
                                aria-label={`Slide ${index + 1}`}
                                data-carousel-slide-to={index}
                                onClick={() => handleSlide(index)}
                            ></button>
                        ))}
                    </div>
                    {/* Left arrow */}
                    <button
                        type="button"
                        className="absolute top-1/2 left-4 z-30 flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-full text-blue-500"
                        style={{ transform: 'translateY(-50%)' }}
                        onClick={prevSlide}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {/* Right arrow */}
                    <button
                        type="button"
                        className="absolute top-1/2 right-4 z-30 flex items-center justify-center w-8 h-8 bg-transparent border-none rounded-full text-blue-500"
                        style={{ transform: 'translateY(-50%)' }}
                        onClick={nextSlide}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                {/* Trending Videos */}
                <h3 className="text-2xl font-semibold mb-4 mt-8 tracking-wide">Trending Videos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-12">
                    {videos.slice(0, 6).map(video => (
                        <Link key={video.id} to={`/video/${video.id}`}>
                            <div className="rounded-lg overflow-hidden h-full">
                                <img src={video.imageUrl} alt={video.title} className="w-full h-40 object-cover" />
                                <div className="p-2">
                                    <h2 className="text-l font-semibold mb-2 text-gray-800">{video.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
