import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Paginate";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams = null, success }) {
   queryParams = queryParams || {};
   // Search and status filters
   const searchFieldChanged = (name, value) => {
      if (value) {
         queryParams[name] = value;
      } else {
         delete queryParams[name];
      }

      router.get(route("user.index"), queryParams);
   };

   const onKeyPress = (name, e) => {
      if (e.key !== "Enter") return;

      searchFieldChanged(name, e.target.value);
   };

   // Sorting
   const sortChanged = (name) => {
      if (name === queryParams.sort_field) {
         if (queryParams.sort_direction == "asc") {
            queryParams.sort_direction = "desc";
         } else {
            queryParams.sort_direction = "asc";
         }
      } else {
         queryParams.sort_field = name;
         queryParams.sort_direction = "asc";
      }

      router.get(route("user.index"), queryParams);
   };

   const deleteUser = (user) => {
      if (!window.confirm("are you sure?")) {
         return;
      } else {
         router.delete(route("user.destroy", user));
      }
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         header={
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  Users
               </h2>

               <Link
                  href={route("user.create")}
                  className="bg-emerald-500 py-1 px-3 text-white rounded-md shadow transition-all hover:bg-emerald-600"
               >
                  Add new
               </Link>
            </div>
         }
      >
         <Head title="Users" />

         <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               {success && (
                  <div className="bg-emerald-500 py-2 px-3 mb-4 text-white rounded-md">
                     {success}
                  </div>
               )}
               <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900 dark:text-gray-100">
                     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                           <tr className="text-nowrap">
                              <TableHeading
                                 name="id"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 ID
                              </TableHeading>
                              <TableHeading
                                 name="name"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 Name
                              </TableHeading>
                              <TableHeading
                                 name="email"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 Email
                              </TableHeading>
                              <TableHeading
                                 name="created_at"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 Created Date
                              </TableHeading>
                              <TableHeading sortable={false}>
                                 Actions
                              </TableHeading>
                           </tr>
                        </thead>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                           <tr className="text-nowrap">
                              <th className="p-3"></th>
                              <th className="p-3">
                                 <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="User Name"
                                    onBlur={(e) =>
                                       searchFieldChanged(
                                          "name",
                                          e.target.value
                                       )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                 />
                              </th>
                              <th className="p-3">
                                 <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.email}
                                    placeholder="User Email"
                                    onBlur={(e) =>
                                       searchFieldChanged(
                                          "email",
                                          e.target.value
                                       )
                                    }
                                    onKeyPress={(e) => onKeyPress("email", e)}
                                 />
                              </th>
                              <th className="p-3"></th>
                              <th className="p-3"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {users.data.length > 0 ? (
                              users.data.map((user) => (
                                 <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={user.id}
                                 >
                                    <td className="px-3 py-2">{user.id}</td>
                                    <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                       {user.name}
                                    </th>
                                    <td className="px-3 py-2 ">{user.email}</td>
                                    <td className="px-3 py-2 text-nowrap">
                                       {user.created_at}
                                    </td>
                                    <td className="px-3 py-2 flex">
                                       <Link
                                          href={route("user.edit", user.id)}
                                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                       >
                                          Edit
                                       </Link>
                                       <button
                                          type="button"
                                          onClick={(e) => deleteUser(user)}
                                          className="font-medium inline-block text-red-600 dark:text-red-500 hover:underline mx-1"
                                       >
                                          Delete
                                       </button>
                                    </td>
                                 </tr>
                              ))
                           ) : (
                              <tr>
                                 <td colSpan="8" className="text-center py-4">
                                    No data available
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                     <Pagination links={users.meta.links} />
                  </div>
               </div>
            </div>
         </div>
      </AuthenticatedLayout>
   );
}
