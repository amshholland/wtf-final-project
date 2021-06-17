import { ReactNode, createContext, useState } from 'react';

import { Truck } from '../model/dbModel';

interface truckContextValue {
    trucks: Truck[];
    addTruck: ( truck: Truck ) => void;
    removeTruck: ( index: number ) => void;
}

const defaultValue: truckContextValue = {
    trucks: [],
    addTruck: () => { },
    removeTruck: () => { }
};

export const truckContext = createContext( defaultValue );

export function truckContextProvider( { children }: { children: ReactNode; } ) {
    const [ trucks, setTrucks ] = useState<Truck[]>( [] );

    function addTruck( truck: Truck ): void {
        setTrucks( prev => [ ...prev, truck ] );
    }

    function removeTruck( index: number ): void {
        setTrucks( prevTrucks => [
            ...prevTrucks.slice( 0, index ),
            ...prevTrucks.slice( index + 1 )
        ] );
    }

    return (
        <truckContext.Provider value={ { trucks, addTruck, removeTruck } }>
            { children }
        </truckContext.Provider>
    );
}