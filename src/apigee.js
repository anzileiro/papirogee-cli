'use strict'

const axios = require('axios')
    , util = require('util')
    , fs = require('fs')
    , path = require('path')
    , qs = require('qs')
    , utils = require('./utils')

let apigee = {
    formatResponse: (data) => {
        console.log(util.inspect(data, false, null))
    },
    getAllProxiesByOrg: (org) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/apis`).then(result => {
            return result.data
        }))
    },
    getOneProxyByOrgAndName: (org, name) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/apis/${name}`).then(result => {
            return result.data
        }))
    },
    getAllApisProductsByOrg: (org) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/apiproducts`).then(result => {
            return result.data
        }))
    },
    getOneApiProductByOrgAndName: (org, name) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/apiproducts/${name}`).then(result => {
            return result.data
        }))
    },
    getAllAppsByOrg: (org) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/apps?expand=true&includeCred=true`).then(result => {
            return result.data
        }))
    },
    getOneAppByOrgAndId: (org, id) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/apps/${id}`).then(result => {
            return result.data
        }))
    },
    getAllUserRolesByOrg: (org) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/userroles`).then(result => {
            return result.data
        }))
    },
    getAllUsersByOrgAndRole: (org, role) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/userroles/${role}/users`).then(result => {
            return result.data
        }))
    },
    generateNewToken: (org, options) => {

        let data = qs.stringify({
            'client_id': options.key,
            'client_secret': options.secret
        })

        let headers = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        return axios.post(utils.getURL(org, options.environment), data, headers).then(result => {
            return result.data
        })
    },
    showMyApps: (org, email) => {
        return utils.rest().then(r => r.get(`https://api.enterprise.apigee.com/v1/organizations/${org}/developers/${r.email}/apps?expand=true`).then(result => {
            return result.data
        }))
    },
    login: (credentials) => {
        return utils.createJsonFile(utils.PATHS.CREDENTIAL, { user: credentials }).then(result => {
            return result
        })
    }
}

module.exports = apigee
