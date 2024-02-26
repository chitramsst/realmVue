let instance = null;
const Realm = require('realm');

const { Expense } = require('./models/Expense');
const { ExpenseCategory } = require('./models/ExpenseCategory');

const fs = require('fs');

const path = require('path');

const behaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately,
    timeOut: 5000,
    timeOutBehavior: Realm.OpenRealmTimeOutBehavior.OpenLocalRealm,
};

async function initializeRealm() {
    try {
        let id = global.mongoApp?.currentUser?.id ?? '';
     
        let location = path.join(global.share.app.getPath('userData'),'/realmTest/',id)
            
        try{
            if(id)
            {
                if (!fs.existsSync(location)){
                    fs.mkdirSync(location, { recursive: true });
                }
            }
        }
        catch(e) {
        }
        Realm.setLogLevel("detail");
        const realm = await Realm.open({
            schema: [ExpenseCategory, Expense],
            path : path.join(location,'database.realm'),
            ... global.mongoApp.currentUser && {
                sync: { user : global.mongoApp.currentUser, flexible: true,cancelWaitsOnNonFatalError : true,existingRealmFileBehavior : behaviorConfiguration, initialSubscriptions : {
                    update : (subs,realm) => {
                        subs.add(realm.objects(ExpenseCategory), {
                            name: "ExpenseCategory",
                        });

                        subs.add(realm.objects(Expense), {
                            name: "Expense",
                        });


                    },
                    rerunOnOpen : true
                } },
            },
        });

        // const dog = realm.write(() => {
        //     return realm.create(ExpenseCategory, {name: "Clifford"});
        //   });

        //   console.log("writeeeeee", dog)

        // realm.syncSession.addConnectionNotification((connection) => {
        //     console.log(connection)
        // })
        realm.addListener('change',(realm,e) => {
        })

        // realm.syncSession.addProgressNotification('download','reportIndefinitely',(e,a) => {
        //     global.syncMessage({transferred : e,transferrable : a,type : 'DOWNLOAD'})
        // })

        instance = realm;
        console.log("REALM INSTALL COMPLETE")
    } catch (e) {
        console.error("Error initializing Realm:", e);
       
    }
}

async function getDB() {
    if (!instance) {
        console.log('****************START**********************')
        initializeRealm();
    }
    if(instance?.isClosed)
    {
        console.log('****************RE_START**********************')
        try{
            await instance.close()
        }
        catch(e)
        {
            console.log(e)
        }
        initializeRealm();
    }
    return instance;
}

module.exports = { initializeRealm, getDB };