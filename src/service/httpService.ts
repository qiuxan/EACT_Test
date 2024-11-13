import axios from 'axios';
import { MusicFestival } from '../models/MusicFestival';
import { API_V1_GET_FESTIVALS } from '../util/constants';

interface httpService {
  getMusicFestivals: () => Promise<MusicFestival[]>;
}

export const httpService: httpService = {
  getMusicFestivals : async (): Promise<MusicFestival[]> => {
    try {
      const response = await axios.get<MusicFestival[]>(API_V1_GET_FESTIVALS);
      if (Array.isArray(response.data)) {    
        return response.data;
      }  
        
      return []; 
      
    } catch (error) {
      console.error('Error fetching music festivals:', error);
      throw error;
    }
  }
};