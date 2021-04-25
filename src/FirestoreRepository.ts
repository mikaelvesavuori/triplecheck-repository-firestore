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
   * @description Get data for the provided key.
   */
  async getData(key: string): Promise<any> {
    const doc = await this.collection.doc(key).get();

    if (!doc.exists) {
      return;
    } else {
      return doc.data();
    }
  }

  /**
   * @description Put data at the provided key.
   */
  async updateData(key: string, data: any): Promise<void> {
    await this.collection
      .doc(key)
      .set(data)
      .catch(() => {
        console.warn('Error updating!');
      });
  }

  /**
   * @description Delete data for type and service.
   */
  async deleteData(key: string): Promise<void> {
    await this.collection
      .doc(key)
      .delete()
      .catch(() => {
        console.warn('Error deleting!');
      });
  }
}
