import { prisma } from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface IUser {
  name: string,
  email: string,
  password: string
}

export const POST = async(request: Request) => {
  const { name, email, password } : IUser = await request.json();

  try {
    const userExists = !!(await prisma.user.findFirst({
      where: {
        email: email
      }
    }))
   
    if (!userExists) { 
      const hashedPassword = (password.length > 0) ? await bcrypt.hash(password, 5) : '';
      await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
          name: name,
        },
      })
      return new NextResponse("User has been created", {
        status: 201,
      });
    }
    
    return new NextResponse("User with this email is already registered", {
      status: 409,
    });
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
