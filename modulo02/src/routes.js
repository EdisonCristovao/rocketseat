import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({msg: 'tudo ok'})
})

export default routes;