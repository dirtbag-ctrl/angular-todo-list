import { Component, OnInit } from '@angular/core';

import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/Todo';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  // put todos to Todo Models
  todos: Todo[];

  constructor(private todoService: TodoService) {

  }

  ngOnInit() {
    // async function to catch data
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    // removes data from list in UI
    this.todos = this.todos.filter(t => t.id !== todo.id);

    // removes data from list in Server
    this.todoService.deleteTodo(todo).subscribe();

  }

  // Add data to list 
  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }

}
