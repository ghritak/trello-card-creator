import fetch from 'node-fetch';
import qs from 'querystring';

const createCard = async (req, res) => {
  try {
    const { name, desc, due, start } = req.body;

    if (name && desc && due && start) {
      const body = qs.stringify({
        name,
        desc,
        due,
        start,
        idList: process.env.LIST_ID,
        key: process.env.API_KEY,
        token: process.env.TRELLO_TOKEN,
      });

      fetch(`${process.env.TRELLO_URL}/1/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            return res
              .status(200)
              .json({ message: 'Added card successfully.', data });
          } else {
            console.error('Failed to create card:', data);
            return res
              .status(400)
              .json({ error: "Couldn't create card.", details: data });
          }
        })
        .catch((err) => {
          console.error(err);
          return res.status(400).json({ error: "Could't create card." });
        });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default createCard;
