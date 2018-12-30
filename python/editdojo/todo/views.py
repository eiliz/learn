from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import TodoItem

def todos(request):
    todos = TodoItem.objects.all()

    return render(request, 'todo.html', {
        'todos': todos
    })

def addTodo(request):
    todo = TodoItem(content = request.POST['content'])
    todo.save()
    return HttpResponseRedirect('/todos/')

def deleteTodo(request, todo_id):
    TodoItem.objects.get(id=todo_id).delete()
    return HttpResponseRedirect('/todos/')
