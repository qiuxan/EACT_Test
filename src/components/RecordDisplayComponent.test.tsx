import { render, screen, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import RecordDisplayComponent from './RecordDisplayComponent';
import { httpService } from '../service/httpService';
import { toolKit } from '../util/toolKits';
import { MusicFestival } from '../models/MusicFestival';
import { RecordDto } from '../models/dto/RecordDto';

// Mock the httpService and toolKit
vi.mock('../service/httpService');
vi.mock('../util/toolKits');

const mockMusicFestivals: MusicFestival[] = [
  // ...mock data...
];

const mockRecordDtoGroup: RecordDto[] = [
  // ...mock data...
];

describe('RecordDisplayComponent', () => {
  beforeEach(() => {
    (httpService.getMusicFestivals as Mock).mockResolvedValue(mockMusicFestivals);
    (toolKit.mapMusicFestivalArrayToRecordDtoArray as Mock).mockReturnValue(mockRecordDtoGroup);
  });

  it('displays loading initially', () => {
    render(<RecordDisplayComponent />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays records after loading', async () => {
    render(<RecordDisplayComponent />);
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    // ...assertions for displaying records...
  });

  it('displays no records message when there are no records', async () => {
    (toolKit.mapMusicFestivalArrayToRecordDtoArray as Mock).mockReturnValue([]);
    render(<RecordDisplayComponent />);
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('No records available')).toBeInTheDocument();
  });

  it('handles errors during data fetching', async () => {
    (httpService.getMusicFestivals as Mock).mockRejectedValue(new Error());
    render(<RecordDisplayComponent />);
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('No records available')).toBeInTheDocument();
  });
});