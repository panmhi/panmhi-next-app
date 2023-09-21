import { v4 as uuidv4 } from 'uuid';
import { NextResponse, NextRequest } from 'next/server';

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

export let todos = [
  {
    id: uuidv4(),
    title: 'Learn Next.js',
    isDone: false
  },
  {
    id: uuidv4(),
    title: 'Learn HTML',
    isDone: false
  },
  {
    id: uuidv4(),
    title: 'Start new sideproject',
    isDone: false
  }
];

const addTodo = (title: string) => {
  let newTodo = {
    id: uuidv4(),
    title,
    isDone: false
  };
  todos.push(newTodo);
};

const deleteTodo = (id: string) => {
  todos = todos.filter((obj) => {
    return obj.id !== id;
  });
};

const updateTodo = ({ id, isDone }: { id: string; isDone: boolean }) => {
  // only isDone can be updated atm
  let newTodos = [] as Todo[];
  todos.map((obj) => {
    let newTodo = { ...obj };
    if (obj.id == id) {
      newTodo = {
        id,
        title: obj.title,
        isDone
      };
    }
    newTodos.push(newTodo);
  });
  todos = newTodos;
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  if (searchParams.get('page') === 'undefined' || searchParams.get('page') === null) {
    return NextResponse.json({ todos }, { status: 200 });
  }

  const page = Number(searchParams.get('page'));
  const limit = searchParams.get('limit') === 'undefined' ? 2 : Number(searchParams.get('limit'));

  const start = (page - 1) * limit;
  const end = start + limit > todos.length ? todos.length : start + limit;
  const hasNext = page * limit < todos.length;
  const nextPage = hasNext ? page + 1 : undefined;
  const previousPage = page > 1 ? page - 1 : undefined;
  const paginatedTodos = todos.slice(start, end);
  return NextResponse.json(
    { todos: paginatedTodos, page, nextPage, previousPage, total: todos.length },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { title } = await request.json();
  addTodo(title);
  return NextResponse.json({ msg: 'todo added' }, { status: 200 });
}
