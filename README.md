# triplecheck-repository-firestore

## TripleCheck: Firestore database repository

Database utility for using Firestore with TripleCheck broker. It implements the repository base at [triplecheck-core](https://github.com/mikaelvesavuori/triplecheck-core).

## Instructions

**@TODO: Finish**

In your `triplecheck-broker` implementation, do a regular import for `triplecheck-repository-firestore` and pass the repository to the broker. In a local demo context, an implementation could look like:

```TypeScript
import { FirestoreRepository } from 'triplecheck-repository-firestore';
import { TripleCheckBroker } from 'triplecheck-broker';

/**
 * Implementation example
 */
async function demo() {
  // Standard setup for Firestore
  // Keyfile only really needed when running outside of GCP context
  const config = {
    projectId: 'your-project-id',
    keyFilename: 'src/keyfile.json'
  };

  // Pass the repo your Firestore configuration and the collection name
  const repository = FirestoreRepository(config, 'my-collection');

  const { responseData, status, headers } = await TripleCheckBroker(
    request,
    payload,
    repository
  );

  return {
    body: JSON.stringify(responseData),
    status,
    headers
  }
}

demo();
```
