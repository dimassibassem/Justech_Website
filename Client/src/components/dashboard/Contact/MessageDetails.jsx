export default function MessageDetails({contact}) {
    return (
        <div className="w-full py-16 bg-white overflow-hidden">
            <div className=" px-4 sm:px-6 lg:px-8">
                <div className="text-lg max-w-prose mx-auto">
                    <h1>

                        <span
                            className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
             {contact.subject}
            </span>
                    </h1>
                </div>
                <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                    <blockquote>
                        <p>
                            {contact.message}
                        </p>
                    </blockquote>
                    <div className="mt-10">
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Phone: </dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.phone}</dd>
                            </div>
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Email: </dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.email}</dd>
                            </div>
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Address: </dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.address}</dd>
                            </div>
                            <div className="border-t-2 border-gray-100 pt-6">
                                <dt className="text-base font-medium text-gray-500">Company: </dt>
                                <dd className="text-3xl font-extrabold tracking-tight text-gray-900">{contact.company}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}
