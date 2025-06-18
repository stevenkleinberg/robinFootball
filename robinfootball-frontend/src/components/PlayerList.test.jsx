// src/components/PlayerList.test.jsx
import { render, screen, fireEvent, within } from '@testing-library/react';
import PlayerList from './PlayerList';
import React from 'react';

beforeEach(() => {
  window.alert = vi.fn(); // mock alert
});

const mockPlayers = [
  {
    id: 1,
    name: 'Patrick Mahomes',
    team: 'KC',
    currentValue: 600,
    initialValue: 500,
    position: 'QB',
  }
];

test('adds player to portfolio when "Buy" is clicked', () => {
  render(<PlayerList initialPlayers={mockPlayers} />);
  fireEvent.click(screen.getByText('Buy'));
  expect(screen.getAllByText(/Patrick Mahomes/)).toHaveLength(2); // Available & Portfolio
});


test('adjusts player value up and down', () => {
  render(<PlayerList initialPlayers={mockPlayers}/>);
  fireEvent.click(screen.getByText('Buy'));

  expect(screen.getByText('Total Value: $600')).toBeInTheDocument();

  fireEvent.click(screen.getByText('📈 +10'));
  expect(screen.getByText('Total Value: $610')).toBeInTheDocument();

  fireEvent.click(screen.getByText('📉 -10'));
  expect(screen.getByText('Total Value: $600')).toBeInTheDocument();
});

test('removes player from portfolio when "Sell" is clicked', () => {
  render(<PlayerList initialPlayers={mockPlayers} />);
  fireEvent.click(screen.getByText('Buy'));

  const portfolioSection = screen.getByText('Your Portfolio').parentElement;

  // Assert it's there in portfolio
  expect(within(portfolioSection).getByText('Patrick Mahomes')).toBeInTheDocument();

  // Click Sell
  fireEvent.click(screen.getByText('🗑️ Sell'));

  // Assert it's removed from portfolio section
  expect(within(portfolioSection).queryByText('Patrick Mahomes')).not.toBeInTheDocument();
  expect(within(portfolioSection).getByText('No players owned.')).toBeInTheDocument();
});

test('prevents buying the same player twice', () => {
  render(<PlayerList initialPlayers={mockPlayers} />);
  
  const buyButton = screen.getByText('Buy');
  fireEvent.click(buyButton);

  // After adding once, button should now be disabled
  expect(buyButton).toBeDisabled();

  // Still only one instance in portfolio
  expect(screen.getAllByText(/Patrick Mahomes/)).toHaveLength(2); // Available & Portfolio
});

