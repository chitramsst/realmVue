const { getDB } = require("../../db");

const Realm = require("realm");

let subscriptionExpenseCategory = null;
let subscriptionExpenses = null;

exports.get_data = async (data) => {
  switch (data.section) {
    case "create-expense-category":
      return await createExpenseCategory(data);
    case "get-expense-category":
      return await getExpenseCategories(data);
    case "create-expense":
      return await createExpense(data);
    case "get-expenses":
      return await getExpenses(data);
    case "delete-expense":
      return await destroyExpense(data);
    case "delete-expense-category":
      return await destroyExpenseCategory(data);
    case "update-expense-category":
        return await updateExpenseCategory(data);
    case "destroy-expense-listener":
      return await destroyExpenseListeners(data);
  }
  return "LOST";
};

async function createExpenseCategory(data) {
  let category;
  const db = await getDB();

  try {
    db.write(() => {
      category = db.create("ExpenseCategory", {
        name: data.name,
        owner_id: global.mongoApp?.currentUser?.id,
      });
    });
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    item: JSON.parse(JSON.stringify(category)),
    success: true,
  };
}

async function getExpenseCategories(data) {
  let categories;
  destroyExpenseListeners();
  const db = await getDB();
  try {
    // Open a transaction.

  //  const categories = await db.objects('ExpenseCategory').filtered('owner_id == $0', global.mongoApp?.currentUser?.id);

// Convert the Realm Results to a regular array for easier manipulation
//const categoriesArray = Array.from(categories);

    categories = await db.objects("ExpenseCategory").filtered('owner_id == $0', global.mongoApp?.currentUser?.id);
    categories.addListener(onExpenseCategoryChange);
    subscriptionExpenseCategory = categories;
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    items: JSON.parse(JSON.stringify(categories)),
    success: true,
  };
}

async function destroyExpense(data) {
  let expense;
  const db = await getDB();
  try {
    let expense = await db
      .objects("Expense")
      .filtered("_id = $0", Realm.BSON.ObjectId(data.id))[0];

    db.write(() => {
      db.delete(expense);
    });
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    // item : JSON.parse(JSON.stringify(expense)),
    success: true,
  };
}

async function destroyExpenseCategory(data) {
  const db = await getDB();
  try {
    
    let category = await db
      .objects("ExpenseCategory")
      .filtered("_id = $0", Realm.BSON.ObjectId(data.id))[0];
   
    if (category) {
      let expense = await db
        .objects("Expense")
        .filtered("category._id = $0", Realm.BSON.ObjectId(data.id));
      if (expense) {
        db.write(() => {
          db.delete(expense);
        });
      }
      db.write(() => {
        db.delete(category);
      });
    }
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    // item : JSON.parse(JSON.stringify(expense)),
    success: true,
  };
}

async function createExpense(data) {
  let expense;
  const db = await getDB();
  try {
    let category = await db
      .objects("ExpenseCategory")
      .filtered("_id = $0", Realm.BSON.ObjectId(data.category_id))[0];
    console.log(category);
    db.write(() => {
      expense = db.create("Expense", {
        name: data.name,
        owner_id: global.mongoApp?.currentUser?.id,
        price: data.price,
        category: category,
      });
    });
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    item: JSON.parse(JSON.stringify(expense)),
    success: true,
  };
}

async function getExpenses(data) {
  let expenses;
  destroyExpenseListeners();
  const db = await getDB();
  try {
    expenses = await db.objects("Expense");
    expenses.addListener(onExpenseChange);
    subscriptionExpenses = expenses;
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    items: JSON.parse(JSON.stringify(expenses)),
    success: true,
  };
}

async function destroyExpenseListeners(data) {
  try {
    // Open a transaction.
    subscriptionExpenses.removeAllListeners();
  } catch (e) {}

  try {
    // Open a transaction.
    subscriptionExpenseCategory.removeAllListeners();
  } catch (e) {}

  return {
    success: true,
  };
}

function onExpenseChange(expenses, changes) {
  changes.deletions.forEach((index) => {
    global.sendSubscriptionMessage({
      identifier: "Expense",
      type: "Delete",
      data: index,
    });
  });

  changes.insertions.forEach((index) => {
    const insertedExpense = expenses[index];
    global.sendSubscriptionMessage({
      identifier: "Expense",
      type: "Create",
      data: JSON.parse(JSON.stringify(insertedExpense)),
    });
  });
}


function onExpenseCategoryChange(expenseCategories, changes) {
 
  changes.deletions.forEach((index) => {
    global.sendSubscriptionMessage({
      identifier: "ExpenseCategory",
      type: "Delete",
      data: index,
    });
  });
  
  changes.insertions.forEach((index) => {
    const insertedExpenseCategory = expenseCategories[index];
    global.sendSubscriptionMessage({
      identifier: "ExpenseCategory",
      type: "Create",
      data: JSON.parse(JSON.stringify(insertedExpenseCategory)),
    });
  });

  changes.newModifications.forEach((index) => {
    const modifiedExpenseCategory =  expenseCategories[index];
    global.sendSubscriptionMessage({
      identifier: "ExpenseCategory",
      type: "Update",
      data: JSON.parse(JSON.stringify(modifiedExpenseCategory)),
    });
  });

}


async function updateExpenseCategory(data) {
    let category;
  const db = await getDB();

  try {
    category = await db
    .objects("ExpenseCategory")
    .filtered("_id = $0", Realm.BSON.ObjectId(data.id))[0];
    // Open a transaction.
    db.write(() => {
      // Assign a newly-created instance to the variable.
       category.name = data.name
    });
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
  return {
    item: JSON.parse(JSON.stringify(category)),
    success: true,
  };


  }