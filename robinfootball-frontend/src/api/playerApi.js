// src/api/playerApi.js
import axiosClient from './axiosClient';

export const getPlayers = () => axiosClient.get('/api/Players');

export const getPlayerById = (id) => axiosClient.get(`/api/Players/${id}`);

export const createPlayer = (playerData) => axiosClient.post('/api/Players', playerData);

export const updatePlayer = (id, playerData) => axiosClient.put(`/api/Players/${id}`, playerData);

export const deletePlayer = (id) => axiosClient.delete(`/api/Players/${id}`);
