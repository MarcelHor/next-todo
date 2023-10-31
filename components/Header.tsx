import Link from 'next/link';
import HeaderButtons from "@/components/misc/HeaderButtons";

export default function Header() {
    return (
        <div className="navbar bg-base-100 h-16 flex items-center">
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost normal-case text-xl">Next-todo</Link>
            </div>
            <div className="flex-none">
                <HeaderButtons/>
            </div>
        </div>
    );
}
