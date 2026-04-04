import { NavLink } from 'react-router-dom';
import { HomeIcon, CreditCardIcon, ChartBarIcon, LockOpenIcon, CogIcon  } from "@heroicons/react/24/outline";
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Accounts', href: '/cuentas', icon: CreditCardIcon },
    { name: 'Reports', href: '/reportes', icon: ChartBarIcon },
    { name: 'Settings', href: '/conf', icon: CogIcon },
    { name: 'Logout', href: '/', icon: LockOpenIcon },
]

function Sidebar() {
    return(
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <div className="p-4 text-xl font-bold">Mi Presupuesto</div>
            <nav className="flex-1 space-y-1 px-2"> 
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
                        {item.name}
                    </NavLink>                    
                ))}
            </nav>

        </div>
    );
}

export default Sidebar;