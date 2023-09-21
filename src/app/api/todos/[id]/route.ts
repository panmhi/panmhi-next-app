import { NextRequest, NextResponse } from 'next/server';
import { todos } from '../route';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const todo = todos.find((todo) => {
    return todo.id === params.id;
  });
  return NextResponse.json({ todo });
}
