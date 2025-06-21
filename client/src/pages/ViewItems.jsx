import React, { useState } from 'react';
import { useItems } from '../context/ItemContext';
import ItemModal from '../components/ItemModal';

const IMAGE_BASE_URL = 'http://localhost:5001/uploads/';

const ViewItems = () => {
    const { items, loading } = useItems();
    const [selectedItem, setSelectedItem] = useState(null);

    if (loading) {
        return <div className="text-center p-10 text-xl font-semibold text-indigo-500 animate-pulse">Loading items...</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Discover Our Collection
            </h2>

            {items.length === 0 ? (
                <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-12 rounded-3xl shadow-xl text-center text-gray-600">
                    <h3 className="text-2xl font-bold mb-2">No Items Found</h3>
                    <p className="text-sm">Go to the "Add Item" page to add something to the collection!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {items.map(item => (
                        <div
                            key={item._id}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer group transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="w-full h-64 overflow-hidden">
                                <img
                                    src={`${IMAGE_BASE_URL}${item.coverImage}`}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-5 text-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
                                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedItem && (
                <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
};

export default ViewItems;
