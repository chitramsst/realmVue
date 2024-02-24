export default {
    install: (app, options) => {
       // inject a globally available $translate() method
        app.config.globalProperties.$electron = (target,data) => {
            return new Promise((resolve,reject) => {
                let time = new Date();

                window.ipcRenderer.invoke('database-function',{
                    target : target,
                    data : data
                }).then((response) => {
                    let endTime = new Date();
                    console.log(`Electron Running Command :%c "${target}" | %c Elapsed Time : ${Math.abs(time- endTime) / 1000}`, 'background: #222; color: #03a5fc;', 'background: #222; color: #7ffc03',response)
                    console.table(data)
                    resolve(response)
                }).catch((e) => {
                    reject(e)
                })
            })
        },
        app.config.globalProperties.$dialog = ({title = '',message = '',buttons = [],type = 'message' as 'message' | 'error'}) => {
            return new Promise((resolve,reject) => {
                window.ipcRenderer.invoke('show-dialog',{title,message,buttons}).then((response) => {
                    resolve(response)
                })
            })
        }
    }
}