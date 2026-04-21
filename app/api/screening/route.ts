export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://autify-backend.vercel.app/api/screening-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Gagal fetch ke backend" }, { status: 500 });
  }
}