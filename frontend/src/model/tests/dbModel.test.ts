import { Truck } from './../dbModel';
import sampleJson from './truckTest.json';

const sampleResponse: Truck = sampleJson;

describe( "Food Truck Model", () => {
    test( "Truck Response", () => {
        expect( sampleResponse.totalResults ).toBe( 5356 );
    } );
    test( "Truck", () => {
        const sampleTruck = sampleResponse.Trucks[ 0 ];
        expect( sampleTruck.name ).toBe( "The Drunken Rooster Food Truck" );
        expect( sampleTruck.profileDescription ).toBe( "The Drunken Rooster Food Truck can be found all around the Metro Detroit Area." );
        expect( sampleTruck.lastLocation.timestamp ).toBe( "TL;DR: As of May 20, you can pay what you want for the 2021 Learn to Code JavaScript Certification Bundle.\n\nWith this JavaScript Certification Bundle, you can jumpstart your career in coding and programming with 50 hours of easy-to-follow lessons and lectures…" );
    } );
} );