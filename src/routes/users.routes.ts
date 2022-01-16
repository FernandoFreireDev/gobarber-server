import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

interface UserResponse {
  name: string;
  email: string;
  password?: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user: UserResponse = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
