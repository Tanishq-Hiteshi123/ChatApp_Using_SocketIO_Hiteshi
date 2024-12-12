import React from 'react'

function GroupTable({groupDetails}) {
  return (
    <div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table className="w-full text-sm text-left rtl:text-right text-black">
        <thead className="text-xs  uppercase ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Group name
                </th>
                <th scope="col" className="px-6 py-3 ">
                    Members
                </th>
                <th scope="col" className="px-6 py-3">
                    Created At
                </th>
            
                <th scope="col" className="px-6 py-3">
                    <span className='text-right'>Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
           
          {
             groupDetails.map((singleGroup , index) =>{
                 return  <tr key={index} className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-blue-600">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap ">
                    {singleGroup.Name}
                </th>
                <td className="px-6 py-4">
                    {
                         singleGroup.GroupMembers.map((user , index) =>{
                             return <p className='my-1' key={index}>{user}</p>
                         })
                    }
                </td>
                <td className="px-6 py-4">
                    {singleGroup.createdAt}
                </td>
            
                <td className="px-6 py-4 ">
                    <p className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</p>
                </td>
            </tr>
             })
          }
        </tbody>
    </table>
</div>

    </div>
  )
}

export default GroupTable
