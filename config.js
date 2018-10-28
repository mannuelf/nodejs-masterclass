'use strict'

// export config variables
let environments = {};

// Staging
environments.staging = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'envName': 'staging'
}

// Production
environments.production = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'envName': 'production'
}

// Determine which on was passed as command-line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? 
    process.env.NODE_ENV.toLowerCase() : 
    ''

// check if env is set to one of the environments above if not default to staging
let environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? 
    environments[currentEnvironment] : 
    environments.staging

module.exports = environmentToExport