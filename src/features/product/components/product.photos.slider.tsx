/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';

interface Photo {
    link: string;
    title: string;
    is_main: boolean;
}

interface ProductPhotosSliderProps {
    images: Photo[];
}

export const ProductPhotosSlider = ({ images }: ProductPhotosSliderProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    const nextSlide = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isAutoPlaying) {
            intervalId = setInterval(() => {
                nextSlide();
            }, 3000); // Change slide every 3 seconds
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isAutoPlaying, images.length]);

    return (
        <div className="flex flex-col gap-4 relative">
            {/* Preview Images */}
            <div className="flex flex-col gap-2 absolute top-1 left-1 z-10">
                {images.map((image: Photo, index: number) => (
                    <div
                        key={index}
                        className={`cursor-pointer transition-all duration-300 ${
                            index === currentImageIndex
                                ? 'ring-2 ring-blue-500'
                                : 'opacity-70 hover:opacity-100'
                        }`}
                        onClick={() => handleImageClick(index)}
                    >
                        <img
                            src={image.link}
                            alt={image.title}
                            className="w-24 h-24 object-cover rounded-lg border border-[#F0F0F0]"
                            loading='lazy'
                        />
                    </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="relative w-full aspect-square">
                <img
                    src={images[currentImageIndex]?.link}
                    alt={images[currentImageIndex]?.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading='lazy'
                />
                
                {/* Auto-play control */}
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                    aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                >
                    {isAutoPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};