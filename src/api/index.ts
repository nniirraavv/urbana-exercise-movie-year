import { Router, Request, Response } from 'express';
import graphQL from './graphql';


export default () => {
	const app = Router();
	graphQL(app);

	
	app.get('/ping', (_req: Request, _res: Response) => {
		_res.status(200).json({
			status: 200,
			message: 'Server Connected',
		});
	});

	app.get('/', function(req,res){
		res.sendFile('loaders/index.html',{ root: 'src' });
	 });

	 app.get('/userdetails', function(req,res){
		res.sendFile('loaders/userDetails.html',{ root: 'src' });
	 });

	 app.post('/addPlayer', function(req, res){
		console.log(req.body);
		res.send("recieved your request!");
	 });

	return app;
};
