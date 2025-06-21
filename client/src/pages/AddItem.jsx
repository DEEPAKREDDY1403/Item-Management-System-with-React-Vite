import React, { useState } from 'react';
import { useItems } from '../context/ItemContext';

const AddItem = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Shirt');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addItem } = useItems();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!name || !description || !coverImage) {
            setErrorMessage('Please fill in all required fields and add a cover image.');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('coverImage', coverImage);
        additionalImages.forEach(image => {
            formData.append('additionalImages', image);
        });

        try {
            await addItem(formData);
            setSuccessMessage('Item successfully added!');
            setName('');
            setType('Shirt');
            setDescription('');
            setCoverImage(null);
            setAdditionalImages([]);
            e.target.reset();
        } catch (error) {
            setErrorMessage('Failed to add item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl p-4 sm:p-8">
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Add a New Item
                </h2>

                {successMessage && (
                    <div className="flex items-center gap-3 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm shadow">
                        ✅ {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="flex items-center gap-3 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm shadow">
                        ❌ {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Item Type</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                        >
                            <option>Shirt</option>
                            <option>Pant</option>
                            <option>Shoes</option>
                            <option>Sports Gear</option>
                            <option>Accessory</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Item Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                        <input
                            type="file"
                            id="coverImage"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-700 mb-1">Additional Images</label>
                        <input
                            type="file"
                            id="additionalImages"
                            multiple
                            onChange={(e) => setAdditionalImages(Array.from(e.target.files))}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-60"
                    >
                        {isSubmitting ? 'Adding Item...' : 'Add Item'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;


