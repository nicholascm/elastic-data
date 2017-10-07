const fs = require('fs');
const es = require('./elastic-client');


const bulkIndex = (index, type, data) => {
    let bulkBody = data.map(item => {
        return {
            index: {
                _index: index,
                _type: type,
                _id: item.id
            }
        }
    });
    es.bulk({ body: bulkBody })
        .then(response => {
            console.log('Bulk Uploaded');
            let errors = response.items.reduce((acc, cur) => {
                if (cur.index && cur.index.error) {
                    return acc + 1;
                }
            }, 0);
            console.log(`Successfully indexed ${data.length - errors} / ${data.length}`)
        })
        .catch(console.err);
}

const test = () => {
    const articles = JSON.parse(fs.readFileSync('data.json'));
    bulkIndex('library', 'article', articles);
}

test(); 