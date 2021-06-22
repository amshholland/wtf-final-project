import React from "react";
import { render, screen } from "@testing-library/react";
import Header from './Header';


test('does not render sign out button', () => {
    render(<Header />);
    const signoutButton = screen.queryByRole("button", {name: "Sign Out"});
    expect(signoutButton).not.toBeInTheDocument();
});

test('renders sign in button', () => {
    render(<Header />);
    const signinButton = screen.queryByRole("button", {name: "Sign In"});
    expect(signinButton).not.toBeInTheDocument();
});