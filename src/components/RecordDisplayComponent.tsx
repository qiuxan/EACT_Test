import React, { useEffect, useState } from 'react';
import { RecordDto } from '../models/dto/RecordDto';
import { httpService } from '../service/httpService';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';

const RecordDisplayComponent: React.FC = () => {
  const { getMusicFestivals } = httpService;
  const [recordDtoGroup, setRecordDtoGroup] = useState<RecordDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMusicFestivals();
        setRecordDtoGroup(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <Typography variant="body1" sx={{ color: 'text.primary' }}>Loading...</Typography>
      ) : recordDtoGroup.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {recordDtoGroup.map((record) => (
            <Card key={record.recordLabel} variant="outlined" sx={{ flex: '1 1 calc(50% - 16px)', marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {record.recordLabel}
                </Typography>
                {record.bandDtoGroup.map((band) => (
                  <Box key={band.bandName} sx={{ marginTop: 2, pl: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {band.bandName}
                    </Typography>
                    {band.festivalNameGroup && band.festivalNameGroup.map((festival) => (
                      <Typography key={festival} variant="body2" sx={{ pl: 4, color: 'text.secondary' }}>
                        {festival}
                      </Typography>
                    ))}
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: 'text.primary' }}>No records available</Typography>
      )}
    </Container>
  );
};

export default RecordDisplayComponent;