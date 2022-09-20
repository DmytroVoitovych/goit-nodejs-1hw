const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf8',).then(r=>console.table(JSON.parse(r))).catch(err=>console.log(err));
}

function getContactById(contactId) {
 fs.readFile(contactsPath, 'utf8',).then(r => console.table([...JSON.parse(r).filter(e => +e.id === contactId)]))
    .catch(err=>console.log(err));
};

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8',).then(r => {
         console.table([...JSON.parse(r).filter(e => +e.id === contactId)]);
        
        fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(r).filter(e => +e.id !== contactId)]))})
        .then(() => console.log('В таблице удаленный контакт')).catch(err=>console.log(err));
    
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf8',).then(r => {
        fs.writeFile(contactsPath, JSON.stringify(JSON.parse(r).concat({ id: String(+JSON.parse(r).length + 1), name, email, phone })),)
     getContactById(+JSON.parse(r).length + 1);
    }).then(()=> console.log('В таблице добавленный контакт')).catch(err=>console.log(err));         
    }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};