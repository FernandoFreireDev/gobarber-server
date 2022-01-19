import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateAvatarUserService from '../services/UpdateUserAvatarService';

interface UserResponse {
  name: string;
  email: string;
  password?: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user: UserResponse = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const user_id = request.user.id;
    const avatarFilename = request.file?.filename;

    if (!avatarFilename) {
      return response.status(400).json({ error: 'Error rescuing filename' });
    }

    const updateUserAvatar = new UpdateAvatarUserService();

    const user: UserResponse = await updateUserAvatar.execute({
      user_id,
      avatarFilename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
