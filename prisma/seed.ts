import { PrismaClient } from '@prisma/client';
import { seedAppleVarieties } from './seeders/appleVariety';
import { seedAppleVarietiesNutrition } from './seeders/appleVarietyNutrition';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Database Seeding...');

  // await seedAppleVarieties();
  // await seedAppleVarietiesNutrition()

  console.log('✅ Seeding Complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
