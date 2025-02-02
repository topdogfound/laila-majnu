import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Fetch all apples from the database
    const appleVarietiesNutrition = await prisma.nutrition.findMany();

    return new Response(JSON.stringify(appleVarietiesNutrition), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch apple varieties nutrition' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    // Parse the incoming request body as JSON
    const appleData = await request.json();

    // Create a new apple in the database
    const newAppleVarietyNutrition = await prisma.nutrition.create({
      data: appleData,
    });

    return new Response(JSON.stringify(newAppleVarietyNutrition), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create apple variety Nutrition' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
