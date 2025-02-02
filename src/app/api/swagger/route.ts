export async function GET(request: Request) {
  return new Response('Hello Its working', {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}