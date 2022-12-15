const { User, joiSubscriptionSchema } = require('../../models/user');

const updateSubscriptionUser = async (req, res, next) => {
  try {
    const { error } = joiSubscriptionSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { subscription } = req.body;

    const updateSubscription = await User.findByIdAndUpdate( contactId, { subscription }, { new: true });
    
    if (!updateSubscription) {
      const error = new Error(`User with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Subscription change on '${req.body.subscription}'`,
      data: {
        result: updateSubscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscriptionUser;
