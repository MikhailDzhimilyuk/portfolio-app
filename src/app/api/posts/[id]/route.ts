import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export const GET = async(request: Request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || '';
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id)
      },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });

  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
}

export const DELETE = async(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    await prisma.post.delete({
      where: {
        id: Number(id)
      },
    });

    return new NextResponse("Post has been deleted", { status: 200 });

  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
}