import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET TODO
export async function GET(request, context) {
  const id = Number(context.params.id);

  try {
    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return NextResponse.json({
        status: 404,
        message: "Todo not found",
      });
    }
    return NextResponse.json({
      status: 200,
      message: `Success get todo by id: ${id}`,
      data: todo,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// PUT TODO
export async function PUT(request, context) {
  const body = await request.json();
  const id = Number(context.params.id);

  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        todo: body.todo,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Success updated todo",
      data: updateTodo,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

// DELETE TODO
export async function DELETE(request, context) {
  const id = Number(context.params.id);

  try {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    if (!deleteTodo) {
      return NextResponse.json({ status: 404, message: "Todo not found" });
    } else {
      return NextResponse.json({
        status: 200,
        message: "Success deleted todo",
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
