const { SchemaDirectiveVisitor } = require('apollo-server-express');
const _ = require('lodash');

class FindDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async (parent, args, ctx) => {
      const modelName = _.upperFirst(this.visitedType.name);
      const keys = this.args.by || ['id'];
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const one = await ctx.loaders[modelName].load(args[key]);
        if (one) return one;
      }
      return null;
    };
  }
}

module.exports = FindDirective;
