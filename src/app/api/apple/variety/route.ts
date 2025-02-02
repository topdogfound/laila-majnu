import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Fetch all apples from the database
    const appleVarieties = await prisma.appleVariety.findMany();

    return new Response(JSON.stringify(appleVarieties), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch apple varieties' }), {
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
    const newAppleVariety = await prisma.appleVariety.create({
      data: appleData,
    });

    return new Response(JSON.stringify(newAppleVariety), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create apple variety' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
