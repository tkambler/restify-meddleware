'use strict';

const _ = require('lodash');
const prequire = require('parent-require');

module.exports = (server, meddleware) => {

    _(meddleware)
        .map((row, k) => {
            _.defaultsDeep(row, {
                'name': k,
                'enabled': true,
                'priority': 0,
                'module': {
                    'arguments': []
                }
            });
            return row;
        })
        .filter({
            'enabled': true
        })
        .orderBy(['priority', 'desc'])
        .forEach((row) => {
            let mod = prequire(row.module.name);
            server.use(mod.apply(undefined, row.module.arguments));
        });

};
