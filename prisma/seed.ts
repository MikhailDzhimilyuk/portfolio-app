import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      password: 'abobus534',
      name: 'Alice',
      posts: {
        create: {
          title: 'Check out Prisma with Next.js',
          desc:'desc blablabla',
          content: 'https://www.prisma.io/nextjs',
          img: 'application.jpg',
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