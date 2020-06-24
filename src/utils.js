'use strict'

const fs = require(`fs`)
    , axios = require(`axios`)
    , path = require(`path`)

const PATHS = {
    CREDENTIAL: path.join(__dirname, `./credentials.json`)
}

const createJsonFile = (dir, payload) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(dir, JSON.stringify(payload), (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(payload)
                }
            })
        } catch (exception) {
            reject(exception)
        }
    })
}

const readJsonFile = (dir) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(dir, 'UTF8', (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
        } catch (exception) {
            reject(exception)
        }
    })
}

const rest = () => {

    return readJsonFile(PATHS.CREDENTIAL).then(result => {

        result = JSON.parse(result)

        let api = axios.create({
            auth: {
                username: result.user.email,
                password: result.user.password
            }
        })

        api.email = result.user.email

        return api
    })
}


const getURL = (org, env) => {
    try {
        switch (org) {

            case 'host_1':
                return `https://host_1-${env}.apigee.net/oauth/client_credential/accesstoken?grant_type=client_credentials`

            case 'host_2':
                return `https://${(env == `prod` ? env = `api` : env = env)}.apigee.com.br/oauth/client_credential/accesstoken?grant_type=client_credentials`

            default:
                return ``
        }
    } catch (exception) {
        throw new Error(exception.message)
    }
}

module.exports = {
    getURL,
    rest,
    readJsonFile,
    createJsonFile,
    PATHS
}
