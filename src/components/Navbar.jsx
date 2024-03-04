import React, { useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Booklist from './Booklist'


const navigation = [
    { name: 'Home', href: 'home', current: true },
    { name: 'Book list', href: 'booklist', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {


    const [searchInput, setSearchInput] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [booklist, setBooklist] = useState([]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (searchInput === '') return;
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=books+${searchInput}&key=AIzaSyAbr_mnO88bXbeseUjO5aX1L2xXQCoVr_c`
        );
        const data = await response.json();
        setResults(data.items);
    }


    const addToBooklist = (result) => {
        const oldresult = [...booklist]
        const newresult = [...oldresult, result]
        setBooklist(newresult)
        console.log(newresult)

    }

    const removeFromBooklist = (id) => {
        const oldresult = [...booklist]
        const newresult = oldresult.filter(result => result.id !== id)
        setBooklist(newresult)
        console.log(newresult)
    }



    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://picsum.photos/id/24/4855/1803"
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Search bar */}

                                <form onSubmit={handleSubmit} className="flex items-center max-w-sm mx-auto">
                                    <label htmlFor="searchInput" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            id="searchInput"
                                            value={searchInput}
                                            onChange={(event) => setSearchInput(event.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search book..."
                                            required

                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>

                    <div className="">
                        {isLoading ? (
                            <div className="text-center py-8">Loading...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {results.map((result) => (
                                    <div key={result.id} className="bg-white p-4 shadow-md rounded">
                                        {result.volumeInfo.imageLinks && (
                                            <img
                                                src={result.volumeInfo.imageLinks.smallThumbnail}
                                                alt={result.volumeInfo.title}
                                                className="mb-2 rounded"
                                            />
                                        )}
                                        <div>
                                            <h6 className="text-lg font-semibold">{result.volumeInfo.title}</h6>
                                            <p className="text-gray-600">{result.volumeInfo.authors}</p>
                                            <div className="mt-2">
                                                <a
                                                    href={result.volumeInfo.previewLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                                                >
                                                    See more
                                                </a>
                                                <Link to="/booklist">
                                                    <button
                                                        type="button"
                                                        onClick={() => addToBooklist(result)}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Add to Booklist
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </Disclosure>
    )
}
