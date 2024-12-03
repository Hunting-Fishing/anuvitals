import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IntegrationCard } from './IntegrationCard';
import { Database } from 'lucide-react';

describe('IntegrationCard', () => {
  const mockProps = {
    icon: <Database data-testid="test-icon" />,
    title: "Test Integration",
    description: "Test description",
    features: ["Feature 1", "Feature 2"]
  };

  it('renders all components correctly', () => {
    render(<IntegrationCard {...mockProps} />);
    
    // Check for title
    expect(screen.getByText('Test Integration')).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText('Test description')).toBeInTheDocument();
    
    // Check for icon
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    
    // Check for features
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<IntegrationCard {...mockProps} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-labelledby', 'integration-title-test-integration');
    
    const featuresList = screen.getByRole('list');
    expect(featuresList).toHaveAttribute('aria-label', 'Test Integration features');
  });
});