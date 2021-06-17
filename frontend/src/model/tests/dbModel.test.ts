import { Truck } from './../dbModel';
import sampleJson from './news-api-sample.json';

const sampleResponse: NewsResponse = sampleJson;

describe( "Food Truck Model", () => {
    test( "Truck Response", () => {
        expect( sampleResponse.totalResults ).toBe( 5356 );
    } );
    test( "Article", () => {
        const sampleArticle = sampleResponse.articles[ 0 ];
        expect( sampleArticle.title ).toBe( "Kickstart a career in coding with this JavaScript certification bundle" );
        expect( sampleArticle.url ).toBe( "https://mashable.com/uk/shopping/may-20-2021-learn-to-code-javascript-certification-bundle/" );
        expect( sampleArticle.description ).toBe( "TL;DR: As of May 20, you can pay what you want for the 2021 Learn to Code JavaScript Certification Bundle.\n\nWith this JavaScript Certification Bundle, you can jumpstart your career in coding and programming with 50 hours of easy-to-follow lessons and lectures…" );
    } );
} );