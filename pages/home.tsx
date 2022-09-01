import { FC } from 'react'
import { useGetHelloQuery } from '../redux/api/fetchApi'

const Home: FC = () => {

    const { data, isLoading } = useGetHelloQuery( {
        body: '{ hello }',
        variables: {}
    } )

    return (
        <div>
            hello
        </div>
    )
}

export default Home