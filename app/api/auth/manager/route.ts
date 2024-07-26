import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(res: Request) {
  try {
    cookies().delete(`token-icecenter-manager`)
    return NextResponse.json({ resp: "Success" })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}