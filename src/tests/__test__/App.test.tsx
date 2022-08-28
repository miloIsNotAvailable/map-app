import App from '../../App'
import { render, screen } from '@testing-library/react'
import Home from '../../../pages/index'
import { BrowserRouter } from 'react-router-dom';

/**
 * @jest-environment jsdom
 */

test('Renders main page correctly', async() => {
    if( typeof window === undefined ) return
    render( 
    <BrowserRouter>
        <Home/>
    </BrowserRouter> 
    )
    const input = await screen.findByRole( "textbox" ) 
    // expect(button.innerHTML).toBe( 'count is 0' );
});