import React from "react";
import './Password.css'
import UserProfile from "./User";
import Navbar from "../../Components/Navbar/Navbar";

export default function PasswordChange() {

    return (
        <div>
            {/* <UserProfile /> */}
            <Navbar className="nav-edit"/>

            <div class="password-change" >
                <div class="pass-change">
                    <div class="pass-form">
                        <label class="pass-label">Current password</label>
                        <input type="password" class="pass-input" />
                    </div>
                    <div class="pass-form">
                        <label class="pass-label">New password</label>
                        <input type="password" class="pass-input" />
                    </div>
                    <div class="pass-form">
                        <label class="pass-label">Repeat new password</label>
                        <input type="password" class="pass-input" />
                    </div>
                    <div className="pass-btn">
                        <button className="pass-btn1">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}