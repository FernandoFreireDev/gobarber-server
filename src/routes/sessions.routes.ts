import { Router } from 'express';

import CreateSessionSerivce from '../services/CreateSessionService';

interface UserResponse {
  name: string;
  email: string;
  password?: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSession = new CreateSessionSerivce();

    const { user } = await createSession.execute({ email, password });

    const userSerialized: UserResponse = user;
    delete userSerialized.password;

    return response.json({ userSerialized });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
