import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Paginate";
import { Head, Link, router } from "@inertiajs/react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams = null, success }) {
   queryParams = queryParams || {};
   // Search and status filters
   const searchFieldChanged = (name, value) => {
      if (value) {
         queryParams[name] = value;
      } else {
         delete queryParams[name];
      }

      router.get(route("project.index"), queryParams);
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

      router.get(route("project.index"), queryParams);
   };

   const deleteProject = (project) => {
      if (!window.confirm("are you sure?")) {
         return;
      } else {
         router.delete(route("project.destroy", project));
      }
   };

   return (
      <AuthenticatedLayout
         user={auth.user}
         header={
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  Projects
               </h2>

               <Link
                  href={route("project.create")}
                  className="bg-emerald-500 py-1 px-3 text-white rounded-md shadow transition-all hover:bg-emerald-600"
               >
                  Add new
               </Link>
            </div>
         }
      >
         <Head title="Projects" />

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
                              <TableHeading sortable={false}>
                                 Image
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
                                 name="status"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 Status
                              </TableHeading>
                              <TableHeading
                                 name="created_at"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 Created Date
                              </TableHeading>
                              <TableHeading
                                 name="due_date"
                                 sort_field={queryParams.sort_field}
                                 sort_direction={queryParams.sort_direction}
                                 sortChanged={sortChanged}
                              >
                                 Due Date
                              </TableHeading>
                              <TableHeading sortable={false}>
                                 Created By
                              </TableHeading>
                              <TableHeading sortable={false}>
                                 Actions
                              </TableHeading>
                           </tr>
                        </thead>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                           <tr className="text-nowrap">
                              <th className="p-3"></th>
                              <th className="p-3"></th>
                              <th className="p-3">
                                 <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Project Name"
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
                                 <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                       searchFieldChanged(
                                          "status",
                                          e.target.value
                                       )
                                    }
                                 >
                                    <option value="">Select status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                       In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                 </SelectInput>
                              </th>
                              <th className="p-3"></th>
                              <th className="p-3"></th>
                              <th className="p-3"></th>
                              <th className="p-3"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {projects.data.length > 0 ? (
                              projects.data.map((project) => (
                                 <tr
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    key={project.id}
                                 >
                                    <td className="px-3 py-2">{project.id}</td>
                                    <td className="px-3 py-2">
                                       <img
                                          src={project.image_path}
                                          alt=""
                                          width={{ width: 60 }}
                                       />
                                    </td>
                                    <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                       <Link
                                          href={route(
                                             "project.show",
                                             project.id
                                          )}
                                       >
                                          {project.name}
                                       </Link>
                                    </th>
                                    <td className="px-3 py-2 ">
                                       <span
                                          className={
                                             "px-2 py-1 rounded text-white " +
                                             PROJECT_STATUS_CLASS_MAP[
                                                project.status
                                             ]
                                          }
                                       >
                                          {
                                             PROJECT_STATUS_TEXT_MAP[
                                                project.status
                                             ]
                                          }
                                       </span>
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">
                                       {project.created_at}
                                    </td>
                                    <td className="px-3 py-2 text-nowrap">
                                       {project.due_date}
                                    </td>
                                    <td className="px-3 py-2">
                                       {project.createdBy.name}
                                    </td>
                                    <td className="px-3 py-2 flex">
                                       <Link
                                          href={route(
                                             "project.edit",
                                             project.id
                                          )}
                                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                       >
                                          Edit
                                       </Link>
                                       <button
                                          type="button"
                                          onClick={(e) =>
                                             deleteProject(project)
                                          }
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
                     <Pagination links={projects.meta.links} />
                  </div>
               </div>
            </div>
         </div>
      </AuthenticatedLayout>
   );
}
