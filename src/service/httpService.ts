import axios from 'axios';
import { MusicFestival } from '../models/MusicFestival';
import { RecordDto } from '../models/dto/RecordDto';
import { toolKit } from '../util/toolKits'; 
const url = '/api/codingtest/api/v1/festivals';

export const fetchMusicFestivals = async (): Promise<RecordDto[]> => {
  try {
    const response = await axios.get<MusicFestival[]>(url);
    if (Array.isArray(response.data)) {    
      const displayData = toolKit.mapMusicFestivalArrayToRecordDtoArray(response.data); 
      return displayData; // Return the mapped data
    }  
      
    return []; 
    
  } catch (error) {
    console.error('Error fetching music festivals:', error);
    throw error;
  }
};