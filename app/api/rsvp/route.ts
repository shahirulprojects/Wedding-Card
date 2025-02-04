import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, guestCount } = body;

    if (!name || !guestCount) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        guestCount,
      },
    });

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error("[RSVP_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const rsvps = await prisma.rSVP.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    console.error("[RSVP_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
