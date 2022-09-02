import { FC } from 'react'
import { useGetHelloQuery, useLazyGetHelloQuery } from '../redux/api/fetchApi'
import Mainscreen from '../components/mainscreen'

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
        <div>
            <Mainscreen/>
        </div>
    )
}

export default Home