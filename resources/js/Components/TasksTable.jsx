import TableHeading from "./TableHeading";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react";
import Pagination from "./Paginate";

export default function TasksTable({
   queryParams = null,
   tasks,
   hideProjectColumn = false,
}) {
   queryParams = queryParams || {};
   // Search and status filters
   const searchFieldChanged = (name, value) => {
      if (value) {
         queryParams[name] = value;
      } else {
         delete queryParams[name];
      }

      router.get(route("task.index"), queryParams);
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

      router.get(route("task.index"), queryParams);
   };
   return (
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
                  <TableHeading sortable={false}>Image</TableHeading>
                  {!hideProjectColumn && (
                     <TableHeading sortable={false}>Project Name</TableHeading>
                  )}
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
                  <TableHeading sortable={false}>Created By</TableHeading>
                  <TableHeading sortable={false}>Actions</TableHeading>
               </tr>
            </thead>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
               <tr className="text-nowrap">
                  <th className="p-3"></th>
                  <th className="p-3"></th>
                  {!hideProjectColumn && <th className="p-3"></th>}
                  <th className="p-3">
                     <TextInput
                        className="w-full"
                        defaultValue={queryParams.name}
                        placeholder="Task Name"
                        onBlur={(e) =>
                           searchFieldChanged("name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("name", e)}
                     />
                  </th>
                  <th className="p-3">
                     <SelectInput
                        className="w-full"
                        defaultValue={queryParams.status}
                        onChange={(e) =>
                           searchFieldChanged("status", e.target.value)
                        }
                     >
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
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
               {tasks.data.length > 0 ? (
                  tasks.data.map((task) => (
                     <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={task.id}
                     >
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                           <img
                              src={task.image_path}
                              alt=""
                              width={{ width: 60 }}
                           />
                        </td>
                        {!hideProjectColumn && (
                           <td className="px-3 py-2">{task.project.name}</td>
                        )}
                        <td className="px-3 py-2">{task.name}</td>
                        <td className="px-3 py-2 ">
                           <span
                              className={
                                 "px-2 py-1 rounded text-white " +
                                 TASK_STATUS_CLASS_MAP[task.status]
                              }
                           >
                              {TASK_STATUS_TEXT_MAP[task.status]}
                           </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                           {task.created_at}
                        </td>
                        <td className="px-3 py-2 text-nowrap">
                           {task.due_date}
                        </td>
                        <td className="px-3 py-2">{task.createdBy.name}</td>
                        <td className="px-3 py-2">
                           <Link
                              href={route("task.edit", task.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                           >
                              Edit
                           </Link>
                           <Link
                              href={route("task.destroy", task.id)}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                           >
                              Delete
                           </Link>
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
         <Pagination links={tasks.meta.links} />
      </div>
   );
}
