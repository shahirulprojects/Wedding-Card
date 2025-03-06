import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Define the storage limit in bytes (500MB)
const STORAGE_LIMIT_BYTES = 500 * 1024 * 1024;

// Function to estimate the size of a string in bytes
function getStringBytes(str: string | null | undefined): number {
  if (!str) return 0;
  // In JavaScript, strings are UTF-16 encoded, so each character can take 2 bytes
  return str.length * 2;
}

// Function to estimate the size of a base64 image in bytes
function getBase64ImageBytes(base64String: string | null | undefined): number {
  if (!base64String) return 0;

  // Remove the data URL prefix if present
  const base64Data = base64String.split(",")[1] || base64String;

  // Calculate the size: base64 encodes 3 bytes into 4 characters
  // So the decoded size is 3/4 of the base64 string length
  return Math.ceil(base64Data.length * 0.75);
}

export async function GET() {
  try {
    // Get all speeches and RSVPs
    const [speeches, rsvps] = await Promise.all([
      prisma.speech.findMany(),
      prisma.rSVP.findMany(),
    ]);

    // Calculate total storage used
    let totalStorageBytes = 0;

    // Calculate storage used by speeches
    for (const speech of speeches) {
      // Add size of text fields
      totalStorageBytes += getStringBytes(speech.name);
      totalStorageBytes += getStringBytes(speech.speech);

      // Add size of image if present
      if (speech.imageUrl) {
        totalStorageBytes += getBase64ImageBytes(speech.imageUrl);
      }
    }

    // Calculate storage used by RSVPs
    for (const rsvp of rsvps) {
      totalStorageBytes += getStringBytes(rsvp.name);
      // Add a small amount for the guest count integer
      totalStorageBytes += 4; // Assuming 4 bytes for an integer
    }

    // Add some overhead for database metadata
    const databaseOverhead = (speeches.length + rsvps.length) * 100; // Estimate 100 bytes per record for metadata
    totalStorageBytes += databaseOverhead;

    // Check if limit is reached
    const isLimitReached = totalStorageBytes >= STORAGE_LIMIT_BYTES;

    // Calculate percentage used
    const percentageUsed = (totalStorageBytes / STORAGE_LIMIT_BYTES) * 100;

    return NextResponse.json({
      totalStorageBytes,
      storageLimitBytes: STORAGE_LIMIT_BYTES,
      isLimitReached,
      percentageUsed: Math.min(percentageUsed, 100).toFixed(2),
      formattedUsage: `${(totalStorageBytes / (1024 * 1024)).toFixed(
        2
      )} MB / 500 MB`,
    });
  } catch (error) {
    console.error("[STORAGE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
