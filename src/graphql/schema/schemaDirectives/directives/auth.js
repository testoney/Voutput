const { SchemaDirectiveVisitor, UserInputError } = require('apollo-server-express')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    if (this.args.requires === 'LOGIN') {
      const { resolve } = field
      field.resolve = async (...args) => {
        const [obj, _, ctx] = args
        const uid = await ctx.currentUser.id()
        if (!uid) throw new UserInputError('No login user')
        ctx.currentUserId = uid
        return resolve ? resolve.apply(this, args) : obj[this.visitedType.name]
      }
    } else if (this.args.requires === 'ADMIN') {
      const { resolve } = field
      field.resolve = async (...args) => {
        const [obj, _, ctx] = args
        const currentUser = await ctx.currentUser.value()
        if (currentUser && (currentUser.role.raw === User.Role.Manager.raw || currentUser.role.raw === User.Role.Admin.raw)) throw new UserInputError('Need admin') 
        return resolve ? resolve.apply(this, args) : obj[this.visitedType.name]
      }
    } else if (this.args.requires === 'OWNER') {
      const { ownerKey } = this.args
      const { resolve } = field
      field.resolve = async (...args) => {
        const [obj, _, ctx] = args
        const uid = await ctx.currentUser.id()
        if (!uid) throw new UserInputError('No login user')
        ctx.currentUserId = uid
        if (uid != obj[ownerKey]) throw new UserInputError('You are not owner')
        return resolve ? resolve.apply(this, args) : obj[this.visitedType.name]
      }
    }
  }
}

module.exports = AuthDirective