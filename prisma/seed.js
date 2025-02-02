// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create seed data for the Apple model
  const apple1 = await prisma.apple.create({
    data: {
      name: 'Granny Smith',
      variety: 'Crisp',
      color: 'Green',
    },
  });

  const apple2 = await prisma.apple.create({
    data: {
      name: 'Fuji',
      variety: 'Sweet',
      color: 'Red',
    },
  });

  const apple3 = await prisma.apple.create({
    data: {
      name: 'Golden Delicious',
      variety: 'Sweet and tart',
      color: 'Yellow',
    },
  });

  console.log('Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
