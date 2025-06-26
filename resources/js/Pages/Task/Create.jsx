import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { use } from "react";

export default function Create({ auth, projects, users }) {
   const { data, setData, post, errors, reset } = useForm({
      image: "",
      name: "",
      description: "",
      due_date: "",
   });
   console.table(projects.data);
   console.table(users.data);

   const onSubmit = (e) => {
      e.preventDefault();

      post(route("task.store"));
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         header={
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  Tasks
               </h2>
            </div>
         }
      >
         <Head title="Tasks" />

         <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <form
                     action=""
                     onSubmit={onSubmit}
                     className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                  >
                     <div>
                        <InputLabel
                           htmlFor="task_project"
                           value="Assigned User"
                        />
                        <SelectInput
                           id="task_project"
                           name="project"
                           value={data.project}
                           onChange={(e) =>
                              setData("project_id", e.target.value)
                           }
                           className="mt-1 block w-full"
                        >
                           <option value="">Select Project</option>
                           {projects.data.map((project) => (
                              <option value={project.id} key={project.id}>
                                 {project.name}
                              </option>
                           ))}
                        </SelectInput>
                        <InputError message={errors.project} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="task_image_path"
                           value="Task Image"
                        />
                        <TextInput
                           id="task_image_path"
                           type="file"
                           name="image"
                           onChange={(e) => setData("image", e.target.files[0])}
                           className="mt-1 block w-full"
                        />
                        <InputError message={errors.image} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel htmlFor="task_name" value="Task Name" />
                        <TextInput
                           id="task_name"
                           type="text"
                           name="name"
                           value={data.name}
                           placeholder="Enter task name"
                           isFocused={true}
                           onChange={(e) => setData("name", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError message={errors.name} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="task_description"
                           value="Task Description"
                        />
                        <TextAreaInput
                           id="task_description"
                           type="text"
                           name="description"
                           value={data.description}
                           placeholder="Task description..."
                           onChange={(e) =>
                              setData("description", e.target.value)
                           }
                           className="mt-1 block w-full"
                        />
                        <InputError
                           message={errors.description}
                           className="mt-2"
                        />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="task_due_date"
                           value="Task Deadline"
                        />
                        <TextInput
                           id="task_due_date"
                           type="date"
                           name="due_date"
                           value={data.due_date}
                           onChange={(e) => setData("due_date", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError
                           message={errors.due_date}
                           className="mt-2"
                        />
                     </div>
                     <div className="mt-4">
                        <InputLabel htmlFor="task_status" value="Task Status" />
                        <SelectInput
                           id="task_status"
                           name="status"
                           value={data.status}
                           onChange={(e) => setData("status", e.target.value)}
                           className="mt-1 block w-full"
                        >
                           <option value="">Select status</option>
                           <option value="pending">Pending</option>
                           <option value="in_progress">In Progress</option>
                           <option value="completed">Completed</option>
                        </SelectInput>
                        <InputError message={errors.status} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel htmlFor="task_priority" value="Priority" />
                        <SelectInput
                           id="task_priority"
                           name="priority"
                           value={data.priority}
                           onChange={(e) => setData("priority", e.target.value)}
                           className="mt-1 block w-full"
                        >
                           <option value="">Select priority</option>
                           <option value="low">Low</option>
                           <option value="medium">Medium</option>
                           <option value="high">High</option>
                        </SelectInput>
                        <InputError
                           message={errors.priority}
                           className="mt-2"
                        />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="task_assigned_user"
                           value="Assigned User"
                        />
                        <SelectInput
                           id="task_assigned_user"
                           name="assigned_user"
                           value={data.assigned_user}
                           onChange={(e) =>
                              setData("assigned_user_id", e.target.value)
                           }
                           className="mt-1 block w-full"
                        >
                           <option value="">Select User</option>
                           {users.data.map((user) => (
                              <option value={user.id} key={user.id}>
                                 {user.name}
                              </option>
                           ))}
                        </SelectInput>
                        <InputError
                           message={errors.assigned_user}
                           className="mt-2"
                        />
                     </div>
                     <div className="mt-4 text-right">
                        <Link href={route("task.index")}>
                           <button
                              type="button"
                              className="bg-gray-100 py-1 px-3 text-gray-800 rounded-md shadow transition-all hover:gray-200 mr-2"
                           >
                              Cancel
                           </button>
                        </Link>
                        <button
                           type="submit"
                           className="bg-emerald-500 py-1 px-3 text-white rounded-md shadow transition-all hover:bg-emerald-600"
                        >
                           Submit
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </AuthenticatedLayout>
   );
}
