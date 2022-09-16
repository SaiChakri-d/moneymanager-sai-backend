const errors = (res, err, msg) => {
  const error = new Error(msg);

  return res.status(err).json({ msg: error.message });
};

export default errors;
