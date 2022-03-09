import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphQlSchema as rootSchema } from './schema/index';
import { graphQlResolvers as rootResolver } from './resolvers/index';

const route: Router = Router();

export default (app: Router) => {
	app.use('/graphql', route);
	route.use(
		'/',
		graphqlHTTP({
			schema: rootSchema,
			rootValue: rootResolver,
			graphiql: true
		}),
	);

	
};

