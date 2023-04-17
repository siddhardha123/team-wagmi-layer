import React from "react";
import { ConnectKitButton } from 'connectkit';
const navlinks = [
    { name: "Home", href: "/", sublist: [{name:"blah",href:"/"}, {}, {}] },
    { name: "Profile", href: "/Profile", sublist: [{name:"blah",href:"/"}, {name:"blah",href:"/"}, {name:"blah",href:"/"}] },
    { name: "Projects", href: "/projects", sublist: [{}, {}, {}] },

];

function Navbar() {

    // const { connect, address } = useStateContext()
    return (

        <div className="bg-black">
            <div className="flex  text-center  pt-6  justify-evenly text-white ">
                <div className="my-auto text-4xl">
                   <a href="/">Pro<span className="text-[#CB1C8D]">Gigs</span> </a> 
                </div>
                <div className="flex">
                    {navlinks.map((data) => (
                            <div className=" px-5 py-2 text-center my-auto hover:bg-[#751051] rounded-md" >
                             <a href={data.href} className="">{data.name}</a>
                            </div>
                    ))}
                </div>
                <div>
                 <ConnectKitButton />
                </div>
            </div>
        </div>
    );
}

export default Navbar;  