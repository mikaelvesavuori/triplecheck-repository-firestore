import { Repository } from 'triplecheck-core';
export declare function createNewFirestoreRepository(config: any, collectionName: string): FirestoreRepository;
declare class FirestoreRepository implements Repository {
    collection: any;
    constructor(collection: any);
    getData(key: string): Promise<any>;
    updateData(key: string, data: any): Promise<void>;
    deleteData(key: string): Promise<void>;
}
export {};
