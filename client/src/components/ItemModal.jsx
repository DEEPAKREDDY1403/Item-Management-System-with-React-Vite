import React, { useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const API_URL = 'http://localhost:5001/api';
const IMAGE_BASE_URL = 'http://localhost:5001/uploads/';

const ItemModal = ({ item, onClose }) => {
    const [isSending, setIsSending] = useState(false);

    if (!item) return null;

    const allImages = [item.coverImage, ...item.additionalImages].filter(Boolean);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    const handleEnquire = async () => {
        setIsSending(true);
        try {
            await axios.post(`${API_URL}/enquire`, { itemId: item._id });
            alert('Enquiry sent successfully! We will get back to you soon.');
            onClose();
        } catch (error) {
            console.error('Failed to send enquiry:', error);
            alert('Failed to send enquiry. Please try again later.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col transform scale-100 transition-transform duration-300"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center p-5 border-b border-gray-200 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-t-3xl">
                    <h3 className="text-2xl font-extrabold text-gray-800 tracking-wide">{item.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-4xl leading-none transition-colors">&times;</button>
                </header>

                <main className="p-5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Carousel */}
                    <div className="w-full">
                        <Slider {...sliderSettings}>
                            {allImages.map((image, index) => (
                                <div key={index}>
                                    <img 
                                        src={`${IMAGE_BASE_URL}${image}`} 
                                        alt={`${item.name} - view ${index + 1}`} 
                                        className="w-full h-auto object-contain max-h-[50vh] rounded-xl shadow-md" 
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex flex-col space-y-5">
                        <div>
                            <h4 className="font-semibold text-gray-600 text-xs uppercase tracking-wider mb-1">Item Type</h4>
                            <p className="text-gray-700 bg-indigo-50 px-3 py-1 rounded-full text-sm w-fit shadow-inner">{item.type}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-600 text-xs uppercase tracking-wider mb-1">Description</h4>
                            <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                </main>

                <footer className="p-5 border-t border-gray-200 flex justify-end gap-4 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-b-3xl">
                    <button 
                        onClick={onClose} 
                        className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
                    >
                        Close
                    </button>
                    <button 
                        onClick={handleEnquire} 
                        disabled={isSending} 
                        className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSending ? 'Sending...' : 'Enquire'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ItemModal;
