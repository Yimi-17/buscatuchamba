import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from '../../../../libs/db'; // Asegúrate de que el path sea correcto

export async function POST(request) {
  try {
    const data = await request.json();

    // Verificar si el correo electrónico ya está registrado
    const userFoundByEmail = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFoundByEmail) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Verificar si el nombre de usuario ya está registrado
    const userFoundByUsername = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userFoundByUsername) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Verificar si el DNI ya está registrado
    const dniFound = await db.user.findUnique({
      where: {
        dni: data.dni,
      },
    });

    if (dniFound) {
      return NextResponse.json(
        {
          message: "DNI already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear un nuevo usuario en la base de datos
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        name: data.name,
        lastname: data.lastname,
        dni: data.dni,
        password: hashedPassword,
      },
    });

    // Eliminar la contraseña del objeto de usuario devuelto
    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
