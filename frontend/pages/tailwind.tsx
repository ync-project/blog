const people = [
  {
    name: 'Calvin Hawkins',
    email: 'calvin.hawkins@example.com',
    title: 'Regional Paradigm Technician',
    image:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Kristen Ramos',
    email: 'kristen.ramos@example.com',
    title: 'Product Directives Officer',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ted Fox',
    email: 'ted.fox@example.com',
    title: 'Senior Designer',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
  
  export default function Example() {
    return (
      <>
      <ul className="divide-y divide-gray-200">
        {people.map((person) => (
          <li key={person.email} className="py-4 flex">
            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th>Title</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr key={person.email} 
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700
                odd:bg-white even:bg-slate-100">
              <td>{person.name}</td>
              <td>{person.title}</td>
              <td>{person.email}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-lg md:text-xl bg-red-500 hover:bg-blue-500">
        When controlling the flow of text, using the CSS property
        <span className="inline">display: inline</span>
        will cause the text inside the element to wrap normally.

        While using the property <span className="inline-block">display: inline-block</span>
        will wrap the element to prevent the text inside from extending beyond its parent.

        Lastly, using the property <span className="block">display: block</span>
        will put the element on its own line and fill its parent.
      </div>

      </>
    )
  }