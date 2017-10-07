const es = require('./elastic-client');

const indices = () => {
    return es.cat.indices({ v: true })
        .then(console.log)
        .catch(console.err);
}

indices(); 