import axios from 'axios';
import { MusicFestival } from '../models/MusicFestival';
import { RecordDto } from '../models/dto/RecordDto';
import { toolKit } from '../util/toolKits'; 
import { API_V1_GET_FESTIVALS } from '../util/constants';

interface httpService {
  getMusicFestivals: () => Promise<RecordDto[]>;
}

export const httpService: httpService = {
  getMusicFestivals : async (): Promise<RecordDto[]> => {
    try {
      const response = await axios.get<MusicFestival[]>(API_V1_GET_FESTIVALS);
      if (Array.isArray(response.data)) {    
        const displayData = toolKit.mapMusicFestivalArrayToRecordDtoArray(response.data); 
        return displayData; // Return the mapped data
      }  
        
      return []; 
      
    } catch (error) {
      console.error('Error fetching music festivals:', error);
      throw error;
    }
  }
};