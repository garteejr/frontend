// app/api/auth/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST() {
  const { userId, getToken } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await getToken();

  const res = await fetch("https://autify-backend.vercel.app/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // ← kirim token
    },
    body: JSON.stringify({
      clerkId: userId,
      name: user.fullName,
      email: user.emailAddresses[0]?.emailAddress,
    }),
  });

  const text = await res.text();
  if (!text) return Response.json({ ok: true });

  const data = JSON.parse(text);
  return Response.json(data);
}