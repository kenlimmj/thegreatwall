KB = new Meteor.Collection('kb');
KB.attachSchema(Schema.KnowledgeBase);

KBCategories = new Meteor.Collection('kbCategories');
KBCategories.attachSchema(Schema.KnowledgeBaseCategory);

KBSecClass = new Meteor.Collection('kbSecClass');
KBSecClass.attachSchema(Schema.KnowledgeBaseSecClass);