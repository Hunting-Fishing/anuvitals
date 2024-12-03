import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeaturesTab } from './FeaturesTab';

describe('FeaturesTab', () => {
  it('renders all features', () => {
    render(<FeaturesTab />);
    
    // Check for main heading
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    
    // Check for all feature cards
    expect(screen.getByText('Product Scanning')).toBeInTheDocument();
    expect(screen.getByText('Blood Work Analysis')).toBeInTheDocument();
    expect(screen.getByText('Diet Guides')).toBeInTheDocument();
    expect(screen.getByText('Health Tracking')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<FeaturesTab />);
    
    expect(screen.getByText(/Scan food products to get detailed nutritional information/)).toBeInTheDocument();
    expect(screen.getByText(/Upload and track your blood work results/)).toBeInTheDocument();
    expect(screen.getByText(/Access comprehensive diet guides/)).toBeInTheDocument();
    expect(screen.getByText(/Monitor your nutritional progress/)).toBeInTheDocument();
  });
});