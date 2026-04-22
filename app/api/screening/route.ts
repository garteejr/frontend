import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    console.log("📤 BODY DARI FRONTEND:", body);

    const res = await fetch("https://autify-backend.vercel.app/api/screening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,            // 🔥 INI YANG PENTING
        profile: body.profile,
        answers: body.answers,
      }),
    });

    console.log("📡 STATUS BACKEND:", res.status);

    const data = await res.json();

    console.log("📥 HASIL BACKEND:", data);

    return Response.json(data);

  } catch (error) {
    console.log("🔥 ERROR:", error);

    return Response.json(
      { error: "Gagal fetch ke backend" },
      { status: 500 }
    );
  }
}