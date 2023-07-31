const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  const data = await read();
  return data;
}

async function getContactById(contactId) {
  const data = await read();
  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  return data.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const data = await read();
  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];

  await write(newContacts);
  return data[index];
}

async function addContact(name, email, phone) {
  const data = await read();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  data.push(newContact);
  await write(data);
  return newContact;
}

module.exports = { listContacts, getContactById, addContact, removeContact };
