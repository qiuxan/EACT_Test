import { describe, expect, it } from 'vitest';
import App from './App';

import { render, screen } from '@testing-library/react';

describe('App Component Test', () => {
  it('Given a user visit the App component, When App component Finish rendering , text "Loading..." will show up', () => {
    render(<App />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
})