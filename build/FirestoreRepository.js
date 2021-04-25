"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewFirestoreRepository = void 0;
const tslib_1 = require("tslib");
const firestore_1 = require("@google-cloud/firestore");
function createNewFirestoreRepository(config, collectionName) {
    const firestore = new firestore_1.Firestore(config);
    const collection = firestore.collection(collectionName);
    const firestoreRepository = new FirestoreRepository(collection);
    return firestoreRepository;
}
exports.createNewFirestoreRepository = createNewFirestoreRepository;
class FirestoreRepository {
    constructor(collection) {
        this.collection = collection;
    }
    getData(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const doc = yield this.collection.doc(key).get();
            if (!doc.exists) {
                return;
            }
            else {
                return doc.data();
            }
        });
    }
    updateData(key, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.collection
                .doc(key)
                .set(data)
                .catch(() => {
                console.warn('Error updating!');
            });
        });
    }
    deleteData(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.collection
                .doc(key)
                .delete()
                .catch(() => {
                console.warn('Error deleting!');
            });
        });
    }
}
//# sourceMappingURL=FirestoreRepository.js.map