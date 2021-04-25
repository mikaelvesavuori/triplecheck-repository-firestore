import { Repository } from 'triplecheck-core';
import { Firestore } from '@google-cloud/firestore';

export function createNewFirestoreRepository(config: any, collectionName: string) {
  const firestore = new Firestore(config);
  const collection = firestore.collection(collectionName);
  const firestoreRepository = new FirestoreRepository(collection);
  return firestoreRepository;
}

/**
 * @description Firestore repository for TripleCheck broker.
 * The business logic itself is encapsulated in the TripleCheck broker.
 * Takes in a Firestore collection.
 */
class FirestoreRepository implements Repository {
  collection: any;

  constructor(collection: any) {
    this.collection = collection;
  }

  /**
   * @description Get data for the provided key. If the data is a stringified object, parse it into an object first.
   */
  async getData(key: string): Promise<any> {
    const doc = await this.collection.doc(key).get();

    if (!doc.exists) return;

    const docData = doc.data();
    const data = (() => {
      try {
        const _data = JSON.parse(docData.value);
        return _data;
      } catch (error) {
        return docData;
      }
    })();

    return data;
  }

  /**
   * @description Put data at the provided document key. Stringify data and place it under a "value" key.
   */
  async updateData(key: string, data: any): Promise<void> {
    const _data = typeof data === 'string' ? data : JSON.stringify(data);

    await this.collection
      .doc(key)
      .update({ value: _data })
      .catch((error: any) => {
        console.error('Error updating!', error.message);
      });
  }

  /**
   * @description Delete data for type and service.
   */
  async deleteData(key: string): Promise<void> {
    await this.collection
      .doc(key)
      .delete()
      .catch((error: any) => {
        console.error('Error deleting!', error.message);
      });
  }
}
