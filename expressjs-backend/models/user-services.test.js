const userServices = require("./user-services.js");

let userObj = {
  username: "testUsernameDontEverUseSomehow",
  password: "ThisIsAPasswordPlease",
  email: "Nope@noper.nopest"
};

let userUp = {
  username: "newName",
  password: "newPass"
};

let userNot = {
  username: "newName"
};

let list;

test("Adding new user", async () => {
  list = await userServices.getUsers();
  const data = await userServices.addUser(userObj);
  userObj._id = data._id;
  expect(data.email).toBe(userObj.email);
  expect(data.password).toBe(userObj.password);
  expect(data.username).toBe(userObj.username);
});

test("Editing and Finding new user", async () => {
  await userServices.editUser(userUp, userObj._id);
  const list2 = await userServices.getUsers(userUp.username);
  expect(userUp.username).toStrictEqual(list2[0].username);
  const list3 = await userServices.getUsers(userUp.username, userUp.password);
  expect(userUp.password).toBe(list3[0].password);
  const userFound = await userServices.findUserById(userObj._id);
  expect(userUp.username).toBe(userFound.username);
});

test("Wrong id", async () => {
  const userFound = await userServices.findUserById("");
  expect(userFound).toBe(undefined);
  await userServices.editUser(userObj, "");
  const list2 = await userServices.getUsers(userUp.username);
  expect(userUp.username).toStrictEqual(list2[0].username);
  await userServices.deleteUserById("userObj._id");
  const list3 = await userServices.getUsers();
  expect(list).not.toStrictEqual(list3);
});

test("Wrong user", async () => {
  const list3 = await userServices.getUsers("", "");
  expect(list3).toStrictEqual([]);
  const data = await userServices.addUser(userNot);
  expect(data).toBeFalsy;
});

test("Deleting new user", async () => {
  await userServices.deleteUserById(userObj._id);
  const list2 = await userServices.getUsers();
  expect(list).toStrictEqual(list2);
});
