import { NextResponse } from "next/server";
import Image from "@/models/Image";
import connect from "@/utils/db";

export const GET = async (request) => {
  const url = new URL(request.url);

  const useremail = url.searchParams.get("useremail");

  //fetch
  try {
    await connect();

    const images = (await Image.find(useremail && { useremail })).reverse();

    return new NextResponse(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newImage = new Image(body);

  //fetch
  try {
    await connect();

    await newImage.save();

    return new NextResponse("Image has been created", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
