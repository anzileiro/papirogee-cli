#!/usr/bin/env node

const commander = require('commander')
    , util = require('util')
    , prompt = require('inquirer')
    , apigee = require('./apigee')
    , questions = require('./questions')

commander
    .version('0.0.1')
    .description('papirogee-cli')

commander
    .command('getAllProxiesByOrg <org>')
    .description('list all proxies by org')
    .action((org, options) => {
        apigee
            .getAllProxiesByOrg(org)
            .then(result => console.log(util.inspect(result, false, null)))
    })

commander
    .command('getOneProxyByOrgAndName <org> <name>')
    .description('get one proxy by org and name')
    .action((org, name) => apigee.getOneProxyByOrgAndName(org, name).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('getAllApisProductsByOrg <org>')
    .description('list all api products by org')
    .action((org) => apigee.getAllApisProductsByOrg(org).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('getOneApiProductByOrgAndName <org> <name>')
    .description('get one api product by org and name')
    .action((org, name) => apigee.getOneApiProductByOrgAndName(org, name).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('getAllAppsByOrg <org>')
    .description('list all apps by org')
    .action((org) => apigee.getAllAppsByOrg(org).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('getOneAppByOrgAndId <org> <id>')
    .description('get one app by org and id')
    .action((org, id) => apigee.getOneAppByOrgAndId(org, id).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('getAllUserRolesByOrg <org>')
    .description('get all usersroles by org')
    .action((org) => apigee.getAllUserRolesByOrg(org).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('getAllUsersByOrgAndRole <org> <role>')
    .description('get all users by org and role')
    .action((org, role) => apigee.getAllUsersByOrgAndRole(org, role).then(result => console.log(util.inspect(result, false, null))))

commander
    .command('generateNewToken <org>')
    .description('generate a new token')
    .option('-K, --key <key>', 'type your consumer key')
    .option('-S, --secret <secret>', 'type your consumer secrect')
    .option('-E, --environment <environment>', 'type your environment')
    .action((org, options) => {
            apigee
            .generateNewToken(org, options)
            .then(result => apigee.formatResponse(result))
            .catch(({ message }) => apigee.formatResponse(message))
    })

commander
    .command('showMyApps <org>')
    .description('show my appas')
    .action((org) => {
            apigee
            .showMyApps(org)
            .then(result => apigee.formatResponse(result))
            .catch(({ message }) => apigee.formatResponse(message))
    })

commander
    .command('login')
    .description('save your apigee credentials [email and password]')
    .action(() => {
        prompt.prompt(questions.login).then(answers => {
            apigee
                .login(answers)
                .then(result => apigee.formatResponse(`successfully logged`))
                .catch(({ message }) => apigee.formatResponse(message))
        })
    })

commander
    .parse(process.argv)
