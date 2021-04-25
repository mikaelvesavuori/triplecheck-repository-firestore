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
            if (!doc.exists)
                return;
            const docData = doc.data();
            const data = (() => {
                try {
                    const _data = JSON.parse(docData.value);
                    return _data;
                }
                catch (error) {
                    return docData;
                }
            })();
            return data;
        });
    }
    updateData(key, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const _data = typeof data === 'string' ? data : JSON.stringify(data);
            yield this.collection
                .doc(key)
                .update({ value: _data })
                .catch((error) => {
                console.error('Error updating!', error.message);
            });
        });
    }
    deleteData(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.collection
                .doc(key)
                .delete()
                .catch((error) => {
                console.error('Error deleting!', error.message);
            });
        });
    }
}
//# sourceMappingURL=FirestoreRepository.js.map