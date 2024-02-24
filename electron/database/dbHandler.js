const expenseController =  require('./controllers/Expense/expenseController')
const authController = require('./controllers/Auth/authController')

module.exports = {
    dbHandler: global.share.ipcMain.handle('database-function',async (event, params) => {
        switch(params.target)
        {
            case 'expenses':
                return expenseController.get_data(params.data)
            case 'auth':
                 return authController.get_data(params.data)
        }
    })
}