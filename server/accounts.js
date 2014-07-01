// Prevent non-authorized users from creating new users
// Accounts.validateNewUser(function(user) {
//     if (Roles.userIsInRole(this.userId, ['admin'])) {
//         return true;
//     }

//     throw new Meteor.Error(403, "Not authorized to create new users");
// });