import App from '../../App'
import { render, screen } from '@testing-library/react'
import Home from '../../../pages/index'

/**
 * @jest-environment jsdom
 */

test('Renders main page correctly', async() => {
    if( typeof window === undefined ) return
    render( <Home/> )
    const input = await screen.findByRole( "textbox" ) 
    // expect(button.innerHTML).toBe( 'count is 0' );
});