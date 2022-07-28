const partners = [
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    // More partners...
]

export default function Example() {
    return (
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {partners.map((partner) => (
                <li key={partner.source} className="relative">
                    <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src={partner.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {partner.title}</span>
                        </button>
                    </div>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{partner.title}</p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">{partner.size}</p>
                </li>
            ))}
        </ul>
    )
}
