import React from 'react';
import { render, screen } from '@testing-library/react';
import FoodTruckCard from './FoodTruckCard';

test('renders truck card insta handle', () => {
    const closeModal = () => null;
    const sampleTruck = {
        iGId: 12345,
        name: "Super Tacos Sample Truck",
        profilePhoto: "https://media.istockphoto.com/photos/young-entrepreneurs-food-truck-picture-id988321954",
        profileDescription: "We serve the best tacos... the best.",
        instagramHandle: "superTacoTruck",
        lastRefresh: 12345678,
        lastLocation: {
            locationName: "The White House",
            photo: "sample text", // = Version.url[1]
            timestamp: 1234,
            lat: 100,
            lng: -100,
            address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
            city: "Grand Rapids",
            caption: {
                text: "We are out here selling tacos."
            }
        },
        locationHistory: [
            {
                locationName: "The White House",
                photo: "sample text", // = Version.url[1]
                timestamp: 1234,
                lat: 100,
                lng: -100,
                address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
                city: "Grand Rapids",
                caption: {
                    text: "We are out here selling tacos."
                }
            },
            {
                locationName: "The White House",
                photo: "sample text", // = Version.url[1]
                timestamp: 1234,
                lat: 100,
                lng: -100,
                address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
                city: "Grand Rapids",
                caption: {
                    text: "We are out here selling tacos."
                }
            },
            {
                locationName: "The White House",
                photo: "sample text", // = Version.url[1]
                timestamp: 1234,
                lat: 100,
                lng: -100,
                address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
                city: "Grand Rapids",
                caption: {
                    text: "We are out here selling tacos."
                }
            }
        ]
    }
    render(<FoodTruckCard truck={sampleTruck} handleClose={ closeModal } />);
    const instagramHandle = screen.getByText("@superTacoTruck");
    expect(instagramHandle).toBeInTheDocument();
});

test('renders truck card description', () => {
    const closeModal = () => null;
    const sampleTruck = {
        iGId: 12345,
        name: "Super Tacos Sample Truck",
        profilePhoto: "https://media.istockphoto.com/photos/young-entrepreneurs-food-truck-picture-id988321954",
        profileDescription: "We serve the best tacos... the best.",
        instagramHandle: "superTacoTruck",
        lastRefresh: 12345678,
        lastLocation: {
            locationName: "The White House",
            photo: "sample text", // = Version.url[1]
            timestamp: 1234,
            lat: 100,
            lng: -100,
            address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
            city: "Grand Rapids",
            caption: {
                text: "We are out here selling tacos."
            }
        },
        locationHistory: [
            {
                locationName: "The White House",
                photo: "sample text", // = Version.url[1]
                timestamp: 1234,
                lat: 100,
                lng: -100,
                address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
                city: "Grand Rapids",
                caption: {
                    text: "We are out here selling tacos."
                }
            },
            {
                locationName: "The White House",
                photo: "sample text", // = Version.url[1]
                timestamp: 1234,
                lat: 100,
                lng: -100,
                address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
                city: "Grand Rapids",
                caption: {
                    text: "We are out here selling tacos."
                }
            },
            {
                locationName: "The White House",
                photo: "sample text", // = Version.url[1]
                timestamp: 1234,
                lat: 100,
                lng: -100,
                address: "1234 Fake Avenue, Real St, Grand Rapids, MI 49506",
                city: "Grand Rapids",
                caption: {
                    text: "We are out here selling tacos."
                }
            }
        ]
    }
    render(<FoodTruckCard truck={sampleTruck} handleClose={ closeModal } />);
    const profileDescription = screen.getByText("We serve the best tacos... the best.");
    expect(profileDescription).toBeInTheDocument();
});