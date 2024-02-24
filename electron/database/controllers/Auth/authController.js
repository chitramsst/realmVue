

const Realm = require('realm');
//const { getDB } = require('../../db.js')
const { getDB } = require('../../db.js')
exports.get_data = async (data) => {
    switch (data.section) {
        case 'check-login':
            return await checkLogin(data)
        case 'logout':
            return await logout(data)
        case 'register':
            return await registerUser(data)
        case 'login':
            return await loginUser(data)

    }
    return 'LOST'
}

async function checkLogin(data) {
    const user = global.mongoApp.currentUser;
    if (user) {
        getDB()
        return {
            user: JSON.parse(JSON.stringify(user))
        }
    }
    return {
        success: false
    }
}

async function registerUser(data) {
    const userData = {
        email: data.email,
        password: data.password,
    }
    try {
        const user = await global.mongoApp.emailPasswordAuth.registerUser(userData);
        const credentials = Realm.Credentials.emailPassword(
            data.email,
            data.password
        );
        const userLog = await global.mongoApp.logIn(credentials);
        const db2 = await getDB();
        return {
            success: true,
            user : JSON.parse(JSON.stringify(userLog))
        }
    }
    catch (e) {
        return {
            error: e.message,
            success: false
        }
    }
}

async function loginUser(data) {
    const credentials = Realm.Credentials.emailPassword(
        data.email,
        data.password
    );
    try {
        const db2 = await getDB();
        const user = await global.mongoApp.logIn(credentials);
       
        return {
            success: true,
            user: JSON.parse(JSON.stringify(user))
        }
    }
    catch (e) {
        return {
            error: e.message,
            success: false
        }
    }
}


async function logout(data) {
    try {
        await global.mongoApp.currentUser.logOut()
        const db = await getDB();
        db.close()
        console.log('closing realm')
        return {
            success: true,
        }
    }
    catch (e) {
        return {
            error: e.message,
            success: false
        }
    }
}