import { ORM } from './orm/Orm'

const generate = () => {
    const orm = new ORM()
    orm.generate()
}

generate()