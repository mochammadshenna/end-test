const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: err.errors[0].message });
      break;
    case 'Invalid':
    case 'Unauthorized':
    case 'JsonWebTokenError':
      let message = 'Not Authorized';
      if (err.name === 'Invalid') message = 'Invalid Email or Password';
      res.status(401).json({ message });
      break;
    case 'NotFound':
      res.status(404).json({ message: `${err.entityName} with id ${err.id} not found` });
      break;
    case 'Forbidden':
      res.status(403).json({ message: `Forbidden: Not Authorized` });
      break;
    case 'Exist':
      res.status(409).json({ message: `Already Exist` });
      break;
    case 'toLargeError':
      res.status(413).json({ message: 'Image size cannot bigger than 255 Kb' });
      break;
    case 'unsuportedError':
      res.status(415).json({ message: 'Only image format are supported' });
      break;
    default:
      res.status(500).json({ message: `Internal server error` });
      break;
  }
};

module.exports = errorHandler;
