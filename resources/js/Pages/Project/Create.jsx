import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth }) {
   const { data, setData, post, errors, reset } = useForm({
      image: "",
      name: "",
      description: "",
      due_date: "",
   });

   const onSubmit = (e) => {
      e.preventDefault();

      post(route("project.store"));
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         header={
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  Projects
               </h2>
            </div>
         }
      >
         <Head title="Projects" />

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
                           htmlFor="project_image_path"
                           value="Project Image"
                        />
                        <TextInput
                           id="project_image_path"
                           type="file"
                           name="image"
                           onChange={(e) => setData("image", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError message={errors.image} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="project_name"
                           value="Project Name"
                        />
                        <TextInput
                           id="project_name"
                           type="text"
                           name="name"
                           value={data.name}
                           placeholder="Enter project name"
                           isFocused={true}
                           onChange={(e) => setData("name", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError message={errors.name} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="project_description"
                           value="Project Description"
                        />
                        <TextAreaInput
                           id="project_description"
                           type="text"
                           name="description"
                           value={data.description}
                           placeholder="Project description..."
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
                           htmlFor="project_due_date"
                           value="Project Deadline"
                        />
                        <TextInput
                           id="project_due_date"
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
                        <InputLabel
                           htmlFor="project_status"
                           value="Project Status"
                        />
                        <SelectInput
                           id="project_status"
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
                     <div className="mt-4 text-right">
                        <Link href={route("project.index")}>
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
