import axios from "axios";

export default function Dashboard() {


    return (
        <div className="h-full w-full">
            <div className="drawer drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col items-center justify-center bg-base-200">



                </div>
                <div className="drawer-side">


                    <ul className="menu bg-base-100 p-4 w-80  text-base-content">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}