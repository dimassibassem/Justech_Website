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
                </div>
            </div>
        </div>
    )
}
