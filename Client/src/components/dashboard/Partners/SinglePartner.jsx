
import { GlobeAltIcon } from '@heroicons/react/solid'


export default function SinglePartner({partner}) {
    console.log(partner);
    return (
        <div className="bg-white overflow-hidden">
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen" />
                <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
                    <div>
                        <div className="text-base text-indigo-600 font-semibold tracking-wide uppercase" />
                        <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {partner[0].companyName}
                        </h3>
                    </div>
                </div>
                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                    <div className="relative lg:row-start-1 lg:col-start-2">
                        <svg
                            className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20"
                            width={404}
                            height={384}
                            fill="none"
                            viewBox="0 0 404 384"
                            aria-hidden="true"
                        >
                            <defs>
                                <pattern
                                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                                    x={0}
                                    y={0}
                                    width={20}
                                    height={20}
                                    patternUnits="userSpaceOnUse"
                                >
                                    <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                                </pattern>
                            </defs>
                            <rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                        </svg>
                        <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                            <figure>
                                <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                                    <img
                                        className="rounded-lg shadow-lg object-cover object-center"
                                        src={`https://localhost:7002/wwwroot/Uploads/Partners/${partner[0].thumbnailName}`}
                                        alt="Whitney leaning against a railing on a downtown street"
                                        width={1184}
                                        height={1376}
                                    />
                                </div>
                                <figcaption className="mt-3 flex text-sm text-gray-500">
                                    <GlobeAltIcon className="ml-1 flex-none w-6 h-6 text-gray-400" aria-hidden="true" />
                                    <a href={`${partner[0].link}`} className="ml-2 text-base text-blue-600 hover:text-blue-800">Company website</a>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <div className="mt-8 lg:mt-0">
                        <div className="text-base max-w-prose mx-auto lg:max-w-none">
                            <p className="text-lg text-gray-500">
                                {partner[0].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

