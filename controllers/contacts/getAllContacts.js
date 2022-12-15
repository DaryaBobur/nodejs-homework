const { Contact } = require('../../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const {page = 1, limit = 20, favorite} = req.query;
    const skip = (page - 1) * limit; 

    const contacts = await Contact.find({owner: _id},  "", {skip, limit: Number(limit)}).populate("owner", "_id email subscription");
    
    if(req.query.favorite) {
      const favoriteContacts = await Contact.find({owner: _id, favorite},  "", {skip, limit: Number(limit)})
      .populate("owner", "_id email subscription");

      return res.json({
        status: 'success',
        code: 200,
        data: {
          result: favoriteContacts,
        },
      });
    };
    
    res.json({
      status: 'success',
      code: 200,
      message: 'All contacts',
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;