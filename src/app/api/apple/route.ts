import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Fetch all apples from the database
    const apples = await prisma.apple.findMany();

    return new Response(JSON.stringify(apples), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch apples' }), {
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
    const newApple = await prisma.apple.create({
      data: appleData,
    });

    return new Response(JSON.stringify(newApple), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create apple' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
