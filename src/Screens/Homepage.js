import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { variables } from '../Variables';

function HomePage() {
    const [videos, setVideos] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    useEffect(() => {
        fetchVideos();
    }, []);

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

    // Function to handle slide transition
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

    // Function to handle next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % videos.length;
        handleSlide(nextIndex);
    }

    // Function to handle previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + videos.length) % videos.length;
        handleSlide(prevIndex);
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-8">
                {/* Carousel */}
                <div id="default-carousel" className="relative w-full" data-carousel="slide" ref={carouselRef}>
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {/* Carousel items */}
                        {videos.slice(0, 5).map((video, index) => (
                            <Link key={video.id} to={`/video/${video.id}`}>
                                <div className={`duration-700 ease-in-out ${index === 0 ? 'block' : 'hidden'}`} data-carousel-item>
                                    <img src={video.imageUrl} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* Slider indicators */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                        {videos.slice(0, 5).map((_, index) => (
                            <button key={index} type="button" className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-300'}`} aria-current={index === currentSlide} aria-label={`Slide ${index + 1}`} data-carousel-slide-to={index} onClick={() => handleSlide(index)}></button>
                        ))}
                    </div>
                    {/* Slider controls */}
                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev onClick={prevSlide}>
                        {/* Previous button icon */}
                    </button>
                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={nextSlide}>
                        {/* Next button icon */}
                    </button>
                </div>

                {/* Trending Videos */}
                <h3 className="text-2xl font-semibold mb-4 mt-8 tracking-wide">Trending Videos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-7">
                    {videos.slice(0, 6).map(video => (
                        <Link key={video.id} to={`/video/${video.id}`}>
                            <div className="rounded-lg overflow-hidden h-full"> {/* Added 'h-full' class */}
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
}

export default HomePage;

