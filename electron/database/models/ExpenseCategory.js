const Realm = require('realm')
class ExpenseCategory extends Realm.Object {
    static schema = {
      name: "ExpenseCategory",
      properties: {
        _id: { type: "objectId", default: () => new Realm.BSON.ObjectId() },
        name: "string",
        expenses : "Expense[]",
        owner_id: "string?",
      },
      primaryKey: "_id",
    };
}

module.exports.ExpenseCategory = ExpenseCategory;