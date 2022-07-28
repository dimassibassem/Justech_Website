import {MailIcon, XIcon} from '@heroicons/react/solid'
import React, {useEffect, useId, useState} from "react";
import axios from "axios";

export default function UsersGrid() {
    const id = useId()

    const [usersFromDb, setUsersFromDb] = useState();

    const fetchUsers = async () => {
        const result = await axios.get('https://localhost:7002/api/User/all')

        setUsersFromDb(result.data);
    }
    useEffect(() => {
        fetchUsers().catch(e => console.log(e))
    }, []);

    return (
        <div>
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {usersFromDb?.map((person, i) => (
                    <li key={`${id + i}`} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 text-sm font-medium truncate">{person.firstName} {person.lastName}</h3>

                                </div>
                                <p className="mt-1 text-gray-500 text-sm truncate">{person.title}</p>
                            </div>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="w-0 flex-1 flex">
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                                        <span className="ml-3">Email</span>
                                    </a>
                                </div>
                                <div className="-ml-px w-0 flex-1 flex">

                                    {/* todo: change to delete user */}
                                    <a
                                        href={`tel:${person.telephone}`}
                                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                    >
                                        <XIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                                        <span className="ml-3">Delete</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
