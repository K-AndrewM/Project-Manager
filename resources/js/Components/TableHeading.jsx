import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function TableHeading({
   name,
   sortable = true,
   sortChanged = () => {},
   sort_field = null,
   sort_direction = null,
   children,
}) {
   return (
      <th onClick={(e) => sortChanged(name)} className="p-3">
         <div className="w-full flex items-center content-between gap-1">
            {children}
            {sortable && (
               <div>
                  <ChevronUpIcon
                     className={
                        "w-4 " +
                        (sort_field === name && sort_direction === "asc"
                           ? "text-white"
                           : "")
                     }
                  />
                  <ChevronDownIcon
                     className={
                        "w-4 -mt-2 " +
                        (sort_field === name && sort_direction === "desc"
                           ? "text-white"
                           : "")
                     }
                  />
               </div>
            )}
         </div>
      </th>
   );
}
