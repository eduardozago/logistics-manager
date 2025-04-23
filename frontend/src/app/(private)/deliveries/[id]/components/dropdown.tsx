import { CaretDown, CarProfile, Check, Spinner, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

enum DeliveryStatus {
    PENDING = 'Pending',
    IN_TRANSIT = 'In transit',
    DELIVERED = 'Delivered',
    ISSUES = 'Issues'
}

interface DropdownProps {
    status: DeliveryStatus;
    setStatus: React.Dispatch<React.SetStateAction<DeliveryStatus>>;
}

export default function Dropdown({ status, setStatus }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const [ bgClasses, setBgClasses ] = useState('')
    const [ icon, setIcon ] = useState(<></>)

    function handleOpenClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    function getBgColor(status: DeliveryStatus) {
        switch (status) {
          case DeliveryStatus.PENDING:
            return 'bg-yellow-500 hover:bg-yellow-400'
          case DeliveryStatus.IN_TRANSIT:
            return 'bg-blue-400 hover:bg-blue-300'
          case DeliveryStatus.DELIVERED:
            return 'bg-green-500 hover:bg-green-400'
          case DeliveryStatus.ISSUES:
            return 'bg-red-500 hover:bg-red-400'
          default:
            return 'bg-gray-400 hover:bg-gray-500'
        }
    }

    function getIcon(status: DeliveryStatus) {
        switch (status) {
            case DeliveryStatus.PENDING:
                return <Spinner size={18} />
            case DeliveryStatus.IN_TRANSIT:
                return <CarProfile size={18} />
            case DeliveryStatus.DELIVERED:
                return <Check size={18} />
            case DeliveryStatus.ISSUES:
                return <X size={18} />
            default: 
                return <></>
        }
    }

    useEffect(() => {
        setBgClasses(getBgColor(status))
        setIcon(getIcon(status))
    }, [status])

    return (
        <div className="relative w-64 w-full">
            <button
                onClick={handleOpenClick}
                className={`flex justify-center items-center gap-3 w-[10rem] px-[1rem] ${bgClasses} rounded-lg text-gray-700 shadow-sm cursor-pointer transition-all duration-400`}
            >
                {icon}
                {status}
                <CaretDown size={16} />
            </button>

            { isOpen && (
                <ul className="absolute w-full bg-gray-700 rounded-lg mt-1 shadow-lg border border-gray-500">
                    {Object.values(DeliveryStatus).map((deliveryStatus: DeliveryStatus) => (
                    <li
                        key={deliveryStatus}
                        onClick={() => {
                            setStatus(deliveryStatus)
                            setIsOpen(false);
                        }}
                        className={`flex justify-center items-center gap-3 px-[1rem] border-b border-gray-700 rounded-lg text-gray-700 ${getBgColor(deliveryStatus)} shadow-sm cursor-pointer transition-all duration-400`}
                    >
                        {(() => {
                            switch (deliveryStatus) {
                                case DeliveryStatus.PENDING:
                                    return (
                                        <Spinner size={18} />
                                    )
                                case DeliveryStatus.IN_TRANSIT:
                                    return (
                                        <CarProfile size={18} />
                                    )
                                case DeliveryStatus.DELIVERED:
                                    return (
                                        <Check size={18} />
                                    )
                                case DeliveryStatus.ISSUES:
                                    return (
                                        <X size={18} />
                                    )
                                default: 
                                return null 
                            }
                        })()}
                        {deliveryStatus}
                    </li>
                    ))}
                </ul>
                )
            } 
        </div>
    )
}
