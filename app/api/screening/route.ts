import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    // 🔍 DEBUG INPUT
    console.log("📤 BODY FRONTEND:", body);
    console.log("👤 USER:", userId || "GUEST");

    const payload = {
      userId: userId || null,

      // 🔥 FORMAT LAMA (kalau backend pakai profile)
      profile: body.profile,

      // 🔥 FORMAT BARU (kalau backend pakai field langsung)
      name: body.profile?.name || "",
      age: body.profile?.age || 0,
      gender:
        body.profile?.gender === "L"
          ? "laki-laki"
          : body.profile?.gender === "P"
          ? "perempuan"
          : "",

      // 🔥 WAJIB
      answers: body.answers || [],
    };

    console.log("📦 PAYLOAD KE BACKEND:", payload);

    const res = await fetch("https://autify-backend.vercel.app/api/screening", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 🔥 HANDLE ERROR BACKEND
    if (!res.ok) {
      const text = await res.text();
      console.log("❌ BACKEND ERROR:", res.status, text);

      return Response.json(
        {
          error: "Backend error",
          detail: text, // 🔥 biar kelihatan kenapa 400
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    console.log("📥 HASIL BACKEND:", data);

    // 🔥 OVERRIDE guest (biar konsisten)
    return Response.json({
      ...data,
      guest: !userId,
    });

  } catch (error: any) {
    console.log("🔥 ERROR:", error);

    return Response.json(
      {
        error: "Gagal fetch ke backend",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
