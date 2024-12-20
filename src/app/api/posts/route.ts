import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export const GET = async(request: Request) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") || '';
  try {
    const posts = await prisma.post.findMany({
      where: {
        user: {
          email: email
        }
      },
    });

    return new NextResponse(JSON.stringify(posts), { status: 200 });

  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
  
}

export const POST = async(request: Request) => {
  const {email, title, desc, content, img} = await request.json();
  try {
    const userId = (await prisma.user.findFirst({
      where: {
        email: email
      },
      select: {
        id: true
      },
    }))?.id;
    
    if (userId) {
      await prisma.post.create({
        data: {
          title: title,
          desc: desc,
          content: content,
          img: img,
          userId: userId,
        },
      })
    }
    return new NextResponse("Post has been created", { status: 201 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
  
}