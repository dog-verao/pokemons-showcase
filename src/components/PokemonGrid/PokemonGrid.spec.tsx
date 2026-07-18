import { render, screen } from "@testing-library/react";
import { PokemonGrid } from ".";

const HEADLINE = "This is a Title";

describe('PokemonGrid', () => {
    it('Should show headline when title exists', () => {
        render(<PokemonGrid headline={HEADLINE}/>);
        
            expect(screen.getByText(HEADLINE)).toBeInTheDocument();
    });
})