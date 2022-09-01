import { FC } from 'react'
import { useGetHelloQuery, useLazyGetHelloQuery } from '../redux/api/fetchApi'

const Home: FC = () => {

    const [getApi, { data, isLoading }] = useLazyGetHelloQuery()
    const { data: newD, isLoading: fetching } = useGetHelloQuery(
        {
            body: '{ hello }',
            variables: {}
        } 
    )

    console.log( newD )

    return (
        <div onClick={ () => {
            getApi( {
                body: '{ hello }',
                variables: {}
            } )
            console.log( data )
        } }>
            hello
        </div>
    )
}

export default Home