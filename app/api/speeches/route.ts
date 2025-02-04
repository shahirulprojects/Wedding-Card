import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, speech, imageUrl } = body;

    if (!name || !speech) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const newSpeech = await prisma.speech.create({
      data: {
        name,
        speech,
        imageUrl,
      },
    });

    return NextResponse.json(newSpeech);
  } catch (error) {
    console.error("[SPEECH_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const speeches = await prisma.speech.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(speeches);
  } catch (error) {
    console.error("[SPEECH_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
