import Image from "next/future/image";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import logo from '@/images/logos/logo.png';
import ErrorModal from "@/components/login/ErrorModal";
import {useLocalStorage} from "@/store";

export default function Login() {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [state, setState] = useState({});
    const setToken = useLocalStorage(store => store.setToken);
    const router = useRouter();
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/auth?email=${state.email}&password=${state.password}`)
        if (!res.data.success) {
            setOpen(true);
            setError(res.data.message);
        } else {
            setToken(res.data.message);
            await router.push('/dashboard');
        }
    }

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    className="mx-auto w-2/3 max-w-md"
                    src={logo}
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-800">Sign in to your
                    account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
                <div className="bg-blue-gray-200 py-8 px-4 shadow-md sm:rounded-lg sm:px-10">
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#033888] hover:bg-[#002449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <ErrorModal open={open} setOpen={setOpen} error={error}/>
                </div>
            </div>
        </div>
    )
}
