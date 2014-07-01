Cookbooks = new Meteor.Collection('cookbooks');
Cookbooks.attachSchema(Schema.Cookbook);

CookbookComponents = new Meteor.Collection('cookbookComponents');
CookbookComponents.attachSchema(Schema.CookbookComponent);