import React, {useState} from 'react';
import {ChatIcon} from "@heroicons/react/outline";
import SlideOverChat from "@/components/SlideOverChat";

function StickyButton() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <button type="button" className="fixed bottom-5 rounded-full right-5 z-10 bg-sky-900"
                    onClick={() => setOpen(!open)}>
                <ChatIcon className="w-12 h-12 p-2 text-blue-gray-200"/>
            </button>
            <SlideOverChat open={open} setOpen={setOpen}/>
        </div>
    );
}

export default StickyButton;
