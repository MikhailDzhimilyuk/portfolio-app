import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()
async function main() {
  const hashedPassword = await bcrypt.hash("12345", 5);
  const alice = await prisma.user.upsert({
    where: { email: 'test@prisma.io' },
    update: {},
    create: {
      email: 'test@prisma.io',
      password: hashedPassword,
      name: 'TestUser',
      posts: {
      create: {
        title: 'title',
        desc:'description',
        content: 'content',
        img: '/application.jpg',
      },
      },
    },
  })
  console.log({ alice })
}
/*main()
.then(async () => {
await prisma.$disconnect()
})
.catch(async (e) => {
console.error(e)
await prisma.$disconnect()
process.exit(1)
})*/