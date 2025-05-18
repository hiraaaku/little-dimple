'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

interface PopSlideContextType {
    isOpen: boolean;
    content: ReactNode | null;
    openPopup: (content: ReactNode) => void;
    closePopup: () => void;
}

const PopSlideContext = createContext<PopSlideContextType | undefined>(undefined);

export const usePopSlide = () => {
    const context = useContext(PopSlideContext);
    if (!context) {
        throw new Error('usePopSlide must be used within a PopSlideProvider');
    }
    return context;
};

export const PopSlideProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openPopup = (content: ReactNode) => {
        setContent(content);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <PopSlideContext.Provider value={{ isOpen, content, openPopup, closePopup }}>
            {children}
            {isOpen && 
            <div className='fixed inset-0 bg-[#1A1A1A]/50 flex justify-end items-center z-50'>
            <div
                className={`fixed right-0 top-0 bottom-0 bg-white z-50 p-5 w-full max-w-[30vw] max-h-[100vh] overflow-y-auto`}>
                <div className='w-full flex items-center justify-between pb-8 mb-8 border-b border-[#cccccc]'>
                    <h5 className='font-(family-name:--font-dm-sans) font-bold text-lg'>Cart (2)</h5>
                    <button className='size-[34px] rounded-full bg-white flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.20)]' onClick={closePopup}>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.8 14.75L3.75 13.7L7.95 9.5L3.75 5.3L4.8 4.25L9 8.45L13.2 4.25L14.25 5.3L10.05 9.5L14.25 13.7L13.2 14.75L9 10.55L4.8 14.75Z" fill="black"/>
                        </svg>
                    </button>
                </div>
                {content}
            </div>
            </div>}
        </PopSlideContext.Provider>
    );
};