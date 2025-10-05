import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get("firebaseUid");

    if (!firebaseUid) {
      return NextResponse.json({ error: "Firebase UID required" }, { status: 400 });
    }

    // Get user document
    const userDoc = await getDoc(doc(db, "users", firebaseUid));
    
    if (!userDoc.exists()) {
      return NextResponse.json({ user: null });
    }

    const userData = userDoc.data();

    // Get user's transcripts
    const transcriptsQuery = query(
      collection(db, "transcripts"),
      where("userId", "==", firebaseUid)
    );
    const transcriptsSnapshot = await getDocs(transcriptsQuery);
    const transcripts = transcriptsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Get user's courses
    const userCoursesQuery = query(
      collection(db, "userCourses"),
      where("userId", "==", firebaseUid)
    );
    const userCoursesSnapshot = await getDocs(userCoursesQuery);
    const userCourses = userCoursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      user: {
        ...userData,
        transcripts,
        userCourses
      }
    });
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user";
    return NextResponse.json(
      { error: errorMessage },
      { status: 400 }
    );
  }
}