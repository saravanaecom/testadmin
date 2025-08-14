import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
    it('renders the product name', () => {
        render(<ProductCard name="Test Product" />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    it('renders the product price', () => {
        render(<ProductCard price="$10" />);
        expect(screen.getByText('$10')).toBeInTheDocument();
    });
});