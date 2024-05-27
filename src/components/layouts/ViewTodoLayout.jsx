import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ViewTodoLayout({ todo }) {
  // TODO : GET DATA
  const { data } = todo;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>View Todo</CardTitle>
        </CardHeader>

        <CardContent>
          <h4 className="text-xl">Your Todo: </h4>
          <p className="text-sm">{data.todo}</p>
        </CardContent>

        <CardFooter>
          <Button type="button">
            <Link href="/">Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
