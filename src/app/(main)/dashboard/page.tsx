import { LogOut } from "@src/components/LogOut"

const DashboardPage = () => {
    return (
        <div className='text-white h-dvh w-full gap-10 flex justify-center items-center'>
            <h1 className='text-4xl'>Dashboard</h1>
            <LogOut />
        </div>
    )
}

export default DashboardPage