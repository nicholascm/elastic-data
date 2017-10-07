const es = require('./elastic-client');

const search = (index, body) => {
    return es.search({
        index, body
    });
}

const ALL = {
    match_all: {}
}

const SEARCH_TERM = {
    match: {
        title: {
            query: 'Consectetur',
            minimum_should_match: 1,
            fuzziness: 2
        }
    }
}

const test = () => {
    let body = {
        size: 20,
        from: 0,
        query: SEARCH_TERM
    }
    search('library', body)
        .then(results => {
            console.log(`Found ${results.hits.total} items in ${results.took}ms`);
            console.log(`returned article titles:`);
            results.hits.hits.forEach((hit, index) => {
                console.log(`\t${body.from + ++index} - ${hit._source.title}`)
            })
        })
        .catch(console.err)
}

test(); 
