import TasksTable from "@/Components/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({
   auth,
   tasks,
   queryParams = null,
   currentRoute,
}) {
   return (
      <AuthenticatedLayout
         user={auth.user}
         header={
            <div className="flex justify-between items-center">
               <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                  My Tasks
               </h2>
            </div>
         }
      >
         <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"></div>
            <TasksTable
               queryParams={queryParams}
               tasks={tasks}
               currentRoute={currentRoute}
            />
         </div>
      </AuthenticatedLayout>
   );
}
