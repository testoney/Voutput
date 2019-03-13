const { SchemaDirectiveVisitor, UserInputError } = require('apollo-server-express');

class DataLoaderDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async (obj, args, ctx) => {
      const key = `${this.visitedType.name}_id`;
      const loader = `${this.visitedType.name}Loader`;
      return typeof obj[key] === 'number' ? ctx.loaders[loader].load(obj[key]) : null;
    };
  }
}

module.exports = DataLoaderDirective;
