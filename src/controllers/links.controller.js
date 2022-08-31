import Link from "../models/Link.js";
import shortid from "shortid";

class LinkController {
  async GET(req, res) {
    try {
      let { id } = req.params;

      if (id) {
        const link = await Link.findById(id);
        return res.status(200).json(link);
      }

      const links = await Link.find({ owner: req.userId });

      return res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }

  async GENERATE(req, res) {
    try {
      const { from } = req.body;

      const code = shortid.generate();

      const existing = await Link.findOne({ from });

      if (existing) {
        return res.json({ link: existing });
      }

      const to = process.env.BASE_URL + "/t/" + code;

      const link = new Link({
        code,
        to,
        from,
        owner: req.userId,
      });
      await link.save();
    } catch (error) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
}

export default new LinkController();
