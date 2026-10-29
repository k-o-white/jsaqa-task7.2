describe("API tests", () => {
  let users;
  let createdUserId;

  beforeEach(() => {
    createdUserId = null;
    cy.fixture("users.json").then((data) => {
      users = data;
    });
  });

  afterEach(() => {
    if (createdUserId !== null) {
      cy.deleteUser(createdUserId).then((response) => {
        expect(response.status).to.eq(200);
      });
    }
  });

  it("Should create user", () => {
    cy.createUser(users.createUser).then((userId) => {
      createdUserId = userId;
      return cy.checkUser(userId, users.createUser);
    });
  });

  it("Should update user", () => {
    cy.createUser(users.updateUser).then((userId) => {
      createdUserId = userId;
      return cy.updateUser(userId, users.updatedUser);
    }).then((response) => {
      expect(response.status).to.eq(200);
      return cy.checkUser(createdUserId, users.updatedUser);
    });
  });

  it("Should delete user", () => {
    cy.createUser(users.deleteUser).then((userId) => {
      createdUserId = userId;
      return cy.deleteUser(userId);
    }).then((response) => {
      expect(response.status).to.eq(200);
      const userId = createdUserId;
      createdUserId = null;
      return cy.getUser(userId);
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});