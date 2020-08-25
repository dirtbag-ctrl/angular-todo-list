import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/Todo';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input() todo: Todo; // input new todos 
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); // emits todo from list 

  constructor( private todoService:TodoService) { }

  ngOnInit(): void {


  }

  // Set Dynamic Classes 
  setClasses () {
    let classes = {
      todo: true, 
      'is-complete': this.todo.completed 
    }

    return classes;
  }

  // On Toggle 
  onToggle (todo) {
    // Toggle in UI 
    todo.completed = !todo.completed;
    
    // Toggle on Server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo);
    });
  }

  // On Delete 
  onDelete (todo) {
    this.deleteTodo.emit(todo);
  }

}
