const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const ollContacts = await contacts.listContacts();
      return console.table(ollContacts);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.table(newContact);

    case "remove":
      const removeContacts = await contacts.removeContact(id);
      return console.table(removeContacts);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
