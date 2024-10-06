const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const users = prisma.user.findMany({});
console.log(users)
module.exports = users