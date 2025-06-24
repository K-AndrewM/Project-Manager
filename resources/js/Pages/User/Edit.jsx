import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, user }) {
   console.log(user);
   const { data, setData, post, errors } = useForm({
      name: user.name || "",
      email: user.email || "",
      email: user.email || "",
      _method: "PUT",
   });

   const onSubmit = (e) => {
      e.preventDefault();

      post(route("user.update", user));
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         header={
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  Edit User "{user.name}"
               </h2>
            </div>
         }
      >
         <Head title="Edit User" />

         <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <form
                     action=""
                     onSubmit={onSubmit}
                     className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                  >
                     <div className="mt-4">
                        <InputLabel htmlFor="user_name" value="User Name" />
                        <TextInput
                           id="user_name"
                           type="text"
                           name="name"
                           value={data.name}
                           placeholder="Enter user name"
                           isFocused={true}
                           onChange={(e) => setData("name", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError message={errors.name} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel htmlFor="user_email" value="User Email" />
                        <TextInput
                           id="user_email"
                           type="email"
                           name="email"
                           value={data.email}
                           placeholder="Enter user email"
                           onChange={(e) => setData("email", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError message={errors.email} className="mt-2" />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="user_password"
                           value="User Password"
                        />
                        <TextInput
                           id="user_password"
                           type="password"
                           name="password"
                           value={data.password}
                           placeholder="Enter user password"
                           onChange={(e) => setData("password", e.target.value)}
                           className="mt-1 block w-full"
                        />
                        <InputError
                           message={errors.password}
                           className="mt-2"
                        />
                     </div>
                     <div className="mt-4">
                        <InputLabel
                           htmlFor="user_password_confirmation"
                           value="Confirm Password"
                        />
                        <TextInput
                           id="user_password_confirmation"
                           type="password"
                           name="password_confirmation"
                           value={data.password_confirmation}
                           placeholder="Enter user password_confirmation"
                           onChange={(e) =>
                              setData("password_confirmation", e.target.value)
                           }
                           className="mt-1 block w-full"
                        />
                        <InputError
                           message={errors.password_confirmation}
                           className="mt-2"
                        />
                     </div>
                     <div className="mt-4 text-right">
                        <Link href="#">
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
