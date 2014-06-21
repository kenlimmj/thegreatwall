KB = new Meteor.Collection('kb');
KB.attachSchema(Schemas.KnowledgeBase);

KBCategories = new Meteor.Collection('kbCategories');
KBCategories.attachSchema(Schemas.KnowledgeBaseCategory);

KBSecClass = new Meteor.Collection('kbSecClass');
KBSecClass.attachSchema(Schemas.KnowledgeBaseSecClass);