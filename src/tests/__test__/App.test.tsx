import App from '../../App'
import { act, render, screen } from '@testing-library/react'
import Home from '../../../pages/index'
import { BrowserRouter } from 'react-router-dom';
import rp from 'request-promise'
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

/**
 * @jest-environment jsdom
 */

test('Renders main page correctly', async() => {
    if( typeof window === undefined ) return
    await act( async() => {
        render( 
            <Provider store={ store }>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter> 
            </Provider>
        )
    } )
    const test_graphql = await rp( { 
        uri: 'http://localhost:5173/api/graphql',
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { query: "{ hello }", variables: {} } )
     } )
    const input = await screen.findByRole( "textbox" ) 
    // expect(button.innerHTML).toBe( 'count is 0' );
});