import { FC } from 'react'
import { useGetHelloQuery, useLazyGetHelloQuery } from '../redux/api/fetchApi'
import Mainscreen from '../components/mainscreen'

const Main: FC = () => {

    return (
        <Mainscreen/>
    )
}

export default Main