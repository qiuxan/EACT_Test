import { BandDto } from '../models/dto/BandDto';
import { RecordDto } from '../models/dto/RecordDto';
import { MusicFestival } from '../models/MusicFestival';
import { ASC, DESC,BAND_NAME,RECORD_LABEL } from './constants';

interface ToolKit{
    sortAnObjectArrayByPropertyName<T>(array: T[], property: keyof T, order: typeof ASC | typeof DESC): T[];
    mapMusicFestivalArrayToRecordDtoArray(musicFestivalGroup: MusicFestival[]): RecordDto[];
    sortStringArray(array: string[], order: typeof ASC | typeof DESC): string[];
}

export const toolKit: ToolKit = {
    sortStringArray(array: string[], order: typeof ASC | typeof DESC = ASC): string[] {
        if (array.length === 0) {
            return array;
        }
        return array.sort((a, b) => {
            if (a > b) {
                return order === ASC ? 1 : -1;
            }
            if (a < b) {
                return order === ASC ? -1 : 1;
            }
            return 0;
        });
    },
    sortAnObjectArrayByPropertyName<T>(array: T[], property: keyof T, order: typeof ASC | typeof DESC = ASC): T[] {
        if (array.length === 0) {
            return array;
        }
        return array.sort((a, b) => {
            const aValue = a[property] === null || a[property] === undefined ? "" : a[property];
            const bValue = b[property] === null || b[property] === undefined ? "" : b[property];
            if (aValue > bValue) {
                return order === ASC ? 1 : -1;
            }
            if (aValue < bValue) {
                return order === ASC ? -1 : 1;
            }
            return 0;
        });
    },
    mapMusicFestivalArrayToRecordDtoArray(musicFestivalGroup: MusicFestival[]): RecordDto[] {
        const recordBandGroupKeyValueMap = new Map<string, string[]>();
        const bandFestivalGroupLabellMap = new Map<string, string[]>();

        let recordDtoGroup: RecordDto[] = [];
        
        musicFestivalGroup.forEach((musicFestival) => {
            musicFestival.bands.forEach((band) => {
                if (!band.recordLabel) return;
                const existingBandNames = recordBandGroupKeyValueMap.get(band.recordLabel) || [];
                if (!existingBandNames.includes(band.name)) {
                    recordBandGroupKeyValueMap.set(band.recordLabel, [...existingBandNames, band.name]);
                }
                if( !musicFestival.name )return;
                bandFestivalGroupLabellMap.set(band.name, [...(bandFestivalGroupLabellMap.get(band.name) || []), musicFestival.name]);                
            });
        });
        recordBandGroupKeyValueMap.forEach((bandNameGroup, recordLabel) => {

            let bandDtoGroupToStore:BandDto[] =[];
            let recordDtoToStore: RecordDto = { recordLabel: '', bandDtoGroup: [] };
            
            bandNameGroup.forEach((bandName) => {
                const sortedFestivalNameGroup = this.sortStringArray(bandFestivalGroupLabellMap.get(bandName) || [], ASC);
                bandDtoGroupToStore.push({bandName, festivalNameGroup: sortedFestivalNameGroup || []});
            }); 
            
            bandDtoGroupToStore = this.sortAnObjectArrayByPropertyName(bandDtoGroupToStore, BAND_NAME, ASC);

            recordDtoToStore = {recordLabel, bandDtoGroup: bandDtoGroupToStore};
            recordDtoGroup.push(recordDtoToStore);
            
        });

        recordDtoGroup = this.sortAnObjectArrayByPropertyName(recordDtoGroup, RECORD_LABEL, ASC);

        return recordDtoGroup;
    }


};