import React, { useEffect, useState } from 'react';
import { RecordDto } from '../models/dto/RecordDto';
import { fetchMusicFestivals } from '../service/httpService';

const RecordDisplayComponent: React.FC = () => {
  const [recordDto, setRecordDto] = useState<RecordDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMusicFestivals();
        setRecordDto(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div >
      {recordDto.length > 0 ? (
        recordDto.map((record) => (
          <div key={record.recordLabel}>
            {/* Render record details */}
            <h3>{record.recordLabel}</h3>
            <ul>
              {record.bandDtoGroup.map((band) => (
                <li key={band.bandName}>
                  <h4>{band.bandName}</h4>
                    <ul>
                        {band.festivalNameGroup&&band.festivalNameGroup.map((festival) => (
                        <li key={festival}>{festival}</li>
                        ))}
                    </ul>
                    
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No records available</p>
      )}
    </div>
  );
};

export default RecordDisplayComponent;