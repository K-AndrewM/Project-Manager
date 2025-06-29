<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Resources\TaskResource;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $query = Task::query();

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: ['sort_field' => 'created_at', 'sort_direction' => 'desc'],
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(){
        $projects = Project::all();
        $users = User::all();
        
        return inertia("Task/Create", [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request){
        $data = $request->validated();
        $userId = Auth::user()->id;

        /** @var \Illuminate\Http\UploadedFile $image */
        $image = $data['image'];

        $data['created_by'] = $userId;
        $data['updated_by'] = $userId;

        if($image) {
            $data['image_path'] = $image->store('tasks/'. Str::random(10), 'public');
        }
        Task::create($data);

        return to_route('task.index')->with('success', 'Task was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task){

        return inertia('Task/Show',[
            'task' => new TaskResource($task),
            'queryParams' => request()->query() ?: ['sort_field' => 'created_at', 'sort_direction' => 'desc'],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task){
        $users = User::all();
        $projects = Project::all();
        
        return inertia('Task/Edit', [
            'task' => new TaskResource($task),
            'users' => UserResource::collection($users),
            'projects' => ProjectResource::collection($projects),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task){
        $data = $request->validated();

        /** @var \Illuminate\Http\UploadedFile $image */
        $image = $data['image'];

        $data['updated_by'] = Auth::user()->id;

        if($image) {
            if($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] = $image->store('tasks/'. Str::random(10), 'public');
        }
        $task->update($data);

        return to_route('task.index')->with('success', "Task {$task->name} was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task){
        $taskName = $task->name;
        $task->delete();
        if($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }

        return to_route('task.index')->with('success', "Task {$taskName} was deleted");
    }

    /**
     * Show all tasks of a user
     */
    public function myTasks(User $user) {
        $query = Task::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');
        $tasks = $query->where('assigned_user_id', Auth::user()->id)->orderBy($sortField,$sortDirection)->paginate(10);
        // dd(TaskResource::collection($tasks));
        return inertia('Task/MyTasks', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: ['sort_field' => 'created_at', 'sort_direction' => 'desc'],
        ]);
    }
}
