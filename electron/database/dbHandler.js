const expenseController =  require('./controllers/Expense/expenseController')

module.exports = {
    dbHandler: global.share.ipcMain.handle('database-function',async (event, params) => {
        switch(params.target)
        {
            case 'expenses':
                return expenseController.get_data(params.data)
        }
    })
}