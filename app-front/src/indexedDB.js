/**
 * Control para utilizar IndexedDB en los navegadores
 * Monten el paquete: npm i --save idb
 */

import { openDB, deleteDB } from 'idb';

const dbName = 'datos'
const storeName = 'arbol'
const version = 1 //Version del Database, la libreria admite control de versiones
let haveDB = false;

export const createDB = async () => { //Crea una base de datos 
    if (!('indexedDB' in window)) { //Verificar si existe IndexedDB
        console.warn('IndexedDB not supported')
        return
    }
    await openDB(dbName, version, { //Abrir la base de datos
    upgrade(db, oldVersion, newVersion, transaction) {
      db.createObjectStore(storeName); //Crear el documento.
    }            
  });
    haveDB = true;
}; 

export const addValue = async (key, value) => {
    if (!haveDB) createDB();   
    const db = await openDB(dbName, version); //Abrir la DB
    const tx = db.transaction(storeName, 'readwrite'); //Crear una transacción sobre la DB
    const store = tx.objectStore(storeName); //Traer el documento
    store.put(value, key);
    await tx.done //Terminar transacción.
};

export const getValue = async (key) => {
    if (!haveDB) createDB();
    const db = await openDB(dbName, version); //Abrir la DB
    const tx = db.transaction(storeName, 'readwrite');
    const os = tx.objectStore(storeName)
    const value = await os.get(key); 
    await tx.done;   
    return value;
};

export const deleteDatabase = async () => {
    await deleteDB(dbName);
};