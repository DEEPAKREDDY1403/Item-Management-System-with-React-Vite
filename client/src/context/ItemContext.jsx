// client/src/context/ItemContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const ItemContext = createContext();

export const useItems = () => {
    return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/items`);
            setItems(response.data);
        } catch (error) {
            console.error('Failed to fetch items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const addItem = async (formData) => {
        try {
            await axios.post(`${API_URL}/items`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Refetch items to update the list after adding a new one
            fetchItems(); 
        } catch (error) {
            console.error('Failed to add item:', error);
            throw error;
        }
    };

    const value = {
        items,
        loading,
        addItem,
        fetchItems,
    };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
};