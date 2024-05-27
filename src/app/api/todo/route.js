import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL TODO
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return NextResponse.json({ status: 200, message: "Success", data: todos });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// POST TODO
export async function POST(request, response) {
  const body = await request.json();

  try {
    const newTodo = await prisma.todo.create({
      data: {
        todo: body.todo,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Created successfully",
      data: newTodo,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// DELETE TODO WITH QUERY PARAM
export async function DELETE(request, context) {
  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));

  try {
    const deleteTodo = await prisma.todo.delete({
      where: { id: id },
    });

    if (!deleteTodo) {
      return (
        NextResponse,
        json({
          status: 404,
          message: "Todo not found",
        })
      );
    }

    return NextResponse.json({
      status: 200,
      message: "Success deleted todo",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// PUT TODO WITH QUERY PARAM
// export async function PUT(request, context) {
//   const body = await request.json();
//   const id = Number(context.params.id);
//   // const url = new URL(request.url);
//   // const id = Number(url.searchParams.get("id"));

//   try {
//     const updateTodo = await prisma.todo.update({
//       where: {
//         id: id,
//       },
//       data: {
//         todo: body.todo,
//       },
//     });

//     if (!updateTodo) {
//       return NextResponse.json({
//         status: 404,
//         message: "Todo not found",
//       });
//     }

//     return NextResponse.json({
//       status: 200,
//       message: "Success updated todo",
//       data: updateTodo,
//     });
//   } catch (error) {
//     return NextResponse.json({ status: 500, message: error.message });
//   }
// }
