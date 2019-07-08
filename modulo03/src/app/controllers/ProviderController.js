import User from '../models/User';
import File from '../models/File';

class ProvicerController {
  async index(req, res) {
    const providers = User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email'],
      includes: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });

    res.json(providers);
  }
}

export default new ProvicerController();
