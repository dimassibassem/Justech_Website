import {useId} from 'react'

export default function Blog({partners}) {
    const id = useId()
    return (
        <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Partners</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
                    </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-7 lg:grid-cols-3 lg:max-w-none">
                    {partners.map((partner) => (
                        <div key={id + partner.companyName} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                            <div className="flex-shrink-0">
                                <a href={partner.link} >
                                <img className="h-48 w-full p-6" src={`https://localhost:7002/Uploads/Partners/${partner.thumbnailName}`} alt="" />
                                </a>
                                </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <a href={partner.link} className="block mt-2 hover:underline">
                                        <p className="text-xl font-semibold text-gray-900">{partner.companyName}</p>
                                    </a>
                                        <p className="mt-3 text-base text-gray-500">{partner.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
