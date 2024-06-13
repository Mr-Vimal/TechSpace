// InfoForm.js

import React from "react";
import "./Info.css";
import UserProfile from "./User";

export default function Info() {
    return (
        <div>
            {/* <UserProfile/> */}
        <div className="info-user-form">
            <h2>Account Information</h2>
            <form>
                <div className="info-form">
                    <label htmlFor="bio" className="info-label">Bio</label>
                    <textarea id="bio" className="info-input" rows="5" ></textarea>
                </div>
                <div className="info-form">
                    <label htmlFor="birthday" className="info-label">Birthday</label>
                    <input type="date" id="birthday" className="info-input" />
                </div>
                <div className="info-form">
                    <label htmlFor="country" className="info-label">Country</label>
                    <select id="country" className="custom-select">
                        <option>USA</option>
                        <option selected>Canada</option>
                        <option>UK</option>
                        <option>Germany</option>
                        <option>France</option>
                    </select>
                </div>
                <div className="info-forms">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" className="info-input" pattern="^\+[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{3}$" placeholder="+94 00 00 00 000" />
                </div>
                <div className="info-form">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" className="info-input" defaultValue="" />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
        </div>
    );
}
