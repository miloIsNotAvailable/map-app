import { graphqlHTTP } from 'express-graphql'
import { Users } from "../db/orm/dbinterfaces";
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { schema } from '../_graphql/schema/schema';
import { root } from '../_graphql/resolvers/resolvers';

export default graphqlHTTP( async( req: any, res ) => {
  
  const refresh_token = req.cookies["refresh_token"]
  const acc_token = req.cookies["access_token"]
  console.log( "running query" )

  const refresh_token_valid: any = jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN!,
    ( err: any, token: any ) => {
      if( err ) return
      return token
    }
  );

  if ((refresh_token_valid as any)?.error) {
    // throw new Error( refresh_token_valid )
    return {
      schema,
      rootValue: root,
      graphiql: true,
      context: { req, res },
    };
  }

  try {

    const acc_token_valid = jwt.verify(acc_token, process.env.ACCESS_TOKEN!);

    return {
      schema,
      rootValue: root,
      graphiql: true,
      context: { req, res, user: acc_token_valid },
    };
  } catch (e) {
  
    if( !refresh_token_valid || !refresh_token ) return {
      schema,
      rootValue: root,
      graphiql: true,
      context: { req, res, user: undefined },
    };

    const user = {
      id: (refresh_token_valid as Users)?.id,
      email: (refresh_token_valid as Users)?.email,
      name: (refresh_token_valid as Users)?.name,
    }
    // console.log(user);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access_token", 
      jwt.sign(
        user,
        process.env.ACCESS_TOKEN!,
        { expiresIn: "2m" }
      ), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      })
    );
    return {
      schema,
      rootValue: root,
      graphiql: true,
      context: { req, res, user },
    };
  }
} )
