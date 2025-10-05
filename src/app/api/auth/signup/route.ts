import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const { firebaseUid, email, name, surname } = await req.json();

    // Check if user already exists
    const userDoc = await getDoc(doc(db, "users", firebaseUid));

    if (userDoc.exists()) {
      return NextResponse.json({ success: true, user: userDoc.data() });
    }

    // Create user document in Firestore
    const userData = {
      email,
      name: `${name} ${surname}`,
      firebaseUid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", firebaseUid), userData);

    return NextResponse.json({ success: true, user: userData });
  } catch (error: unknown) {
    console.error("Signup error:", error);
    const errorMessage = error instanceof Error ? error.message : "Signup failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}