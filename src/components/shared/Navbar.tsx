import Link from "next/link"

const Navbar = () => {
    return (
        <>
            <nav className="bg-green-200">
                {/* --------------------top---------------- */}
                <div className="w-screen h-24 flex justify-between bg-red-300">
                    <div>
                        logo
                    </div>

                    <div>
                        name
                    </div>
                </div>
                {/* -------------------side----------------- */}
                <div className="h-screen w-80 bg-red-500">
                    <Link href="/blog">Blog</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar