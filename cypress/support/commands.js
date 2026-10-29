// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("createUser", (user) => {
  return cy.request({
    method: "POST",
    url: "/users",
    body: user,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("id");
    const userId = Number(response.body.id);
    expect(Number.isInteger(userId)).to.eq(true);
    return userId;
  });
});

Cypress.Commands.add("getUser", (id) => {
  return cy.request({
    method: "GET",
    url: `/users/${id}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("checkUser", (id, user) => {
  return cy.getUser(id).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.include({
      id: id,
      firstName: user.firstName,
      surName: user.surName,
    });
  });
});

Cypress.Commands.add("updateUser", (id, user) => {
  return cy.request({
    method: "PUT",
    url: `/users/${id}`,
    qs: {
      firstName: user.firstName,
      surName: user.surName,
    },
  });
});

Cypress.Commands.add("deleteUser", (id) => {
  return cy.request({
    method: "DELETE",
    url: `/users/${id}`,
  });
});