export default (req, res, next) => {
  let { email, password, from } = req.body;

  function validateEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.url == "/registration") {
    if (![email, password].every(Boolean)) {
      return res.status(400).json({ message: "Missing credentials" });
    } else if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
  }

  if (req.url == "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(400).json({ message: "Missing credentials" });
    } else if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
  }

  if (req.url == "/generate") {
    const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(from);
    if (![from].every(Boolean)) {
      return res.status(400).json({ message: "Missing credentials" });
    } else if (!valid) {
      return res.status(400).json({ message: "Invalid link" });
    }
  }

  return next();
};
