
import { toolKit } from './toolKits';
import { ASC, DESC } from './constants';
import { MusicFestival } from '../models/MusicFestival';
import { RecordDto } from '../models/dto/RecordDto';
import { describe, it, expect } from 'vitest';

describe('toolKit', () => {
    describe('sortStringArray', () => {
        it('Given a string array, when sorted in ascending order, then it should return the array sorted alphabetically', () => {
            const array = ['banana', 'apple', 'cherry'];
            const sortedArray = toolKit.sortStringArray(array, ASC);
            expect(sortedArray).toEqual(['apple', 'banana', 'cherry']);
        });

        it('Given a string array, when sorted in descending order, then it should return the array sorted in reverse alphabetical order', () => {
            const array = ['banana', 'apple', 'cherry'];
            const sortedArray = toolKit.sortStringArray(array, DESC);
            expect(sortedArray).toEqual(['cherry', 'banana', 'apple']);
        });
    });

    describe('sortAnObjectArrayByPropertyName', () => {
        it('Given an object array, when sorted by a property name in ascending order, then it should return the array sorted by that property in ascending order', () => {
            const array = [{ name: 'banana' }, { name: 'apple' }, { name: 'cherry' }];
            const sortedArray = toolKit.sortAnObjectArrayByPropertyName(array, 'name', ASC);
            expect(sortedArray).toEqual([{ name: 'apple' }, { name: 'banana' }, { name: 'cherry' }]);
        });

        it('Given an object array, when sorted by a property name in descending order, then it should return the array sorted by that property in descending order', () => {
            const array = [{ name: 'banana' }, { name: 'apple' }, { name: 'cherry' }];
            const sortedArray = toolKit.sortAnObjectArrayByPropertyName(array, 'name', DESC);
            expect(sortedArray).toEqual([{ name: 'cherry' }, { name: 'banana' }, { name: 'apple' }]);
        });
    });

    describe('mapMusicFestivalArrayToRecordDtoArray', () => {
        it('Given a music festival array, when mapped to record DTO array, then it should return the corresponding record DTO array', () => {
            const musicFestivals: MusicFestival[] = [
                {
                    name: 'Festival1',
                    bands: [
                        { name: 'Band1', recordLabel: 'Label1' },
                        { name: 'Band2', recordLabel: 'Label2' }
                    ]
                },
                {
                    name: 'Festival2',
                    bands: [
                        { name: 'Band1', recordLabel: 'Label1' },
                        { name: 'Band3', recordLabel: 'Label3' }
                    ]
                }
            ];

            const expectedRecordDtos: RecordDto[] = [
                {
                    recordLabel: 'Label1',
                    bandDtoGroup: [
                        { bandName: 'Band1', festivalNameGroup: ['Festival1', 'Festival2'] }
                    ]
                },
                {
                    recordLabel: 'Label2',
                    bandDtoGroup: [
                        { bandName: 'Band2', festivalNameGroup: ['Festival1'] }
                    ]
                },
                {
                    recordLabel: 'Label3',
                    bandDtoGroup: [
                        { bandName: 'Band3', festivalNameGroup: ['Festival2'] }
                    ]
                }
            ];

            const recordDtos = toolKit.mapMusicFestivalArrayToRecordDtoArray(musicFestivals);

            expect(recordDtos).toEqual(expectedRecordDtos);
        });
    });
});