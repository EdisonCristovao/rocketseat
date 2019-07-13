export default async (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
};
