const fetch = require('cross-fetch');
const fs = require('fs');

const GRAPHQL_URI="http://localhost:4000"

fetch(`${GRAPHQL_URI}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
}).then(result => result.json())
  .then(result => {
    const possibleTypes = {};
    

    result.data.__schema.types.forEach(supertype => {
      console.log(`${supertype.name}, ${supertype.possibleTypes}`);
        if (supertype.possibleTypes) {
        possibleTypes[supertype.name] =
          supertype.possibleTypes.map(subtype => subtype.name);
      }
    });

    console.log('possibleTypes => ', possibleTypes)
    fs.writeFile('./possibleTypes.json', JSON.stringify(possibleTypes), err => {
      if (err) {
        console.error('Error writing possibleTypes.json', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
