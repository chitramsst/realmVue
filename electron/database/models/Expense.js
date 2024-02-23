const Realm = require('realm')
class Expense extends Realm.Object {
    static schema = {
      name: "Expense",
      properties: {
        _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
        name: "string",
        price: "string",
        createdBy: "string?",
        owner_id: "string?",
        category: "ExpenseCategory",
      },
      primaryKey: "_id",
    };
}

module.exports.Expense = Expense;