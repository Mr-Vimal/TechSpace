import React from "react";
import './AccountSetting.css'
import UserProfile from "./User";
import Navbar from "../../Components/Navbar/Navbar";

export default function AccountSetting() {

    return (
        <div>
            <Navbar className="nav-acc" />
            {/* <UserProfile /> */}
            <div className="acc-setting">
                <div className="acc-set">
                    <div className="profile-pc">
                        <img src="" alt="" className="d-block ui-w-80" />
                        <div className="profile-btns">
                            <input type="file" className="account-settings-fileinput" placeholder="Allowed JPG, GIF or PNG. Max size of 800K" />
                        </div>
                    </div>
                    <div className="pro-form">
                        <div className="profile-form">
                            <label className="form-label">Username</label>
                            <input type="text" className="profile-input" />
                        </div>
                        <div className="profile-form">
                            <label className="form-label">Name</label>
                            <input type="text" className="profile-input" />
                        </div>
                        <div className="profile-form">
                            <label className="form-label">E-mail</label>
                            <input type="email" className="profile-input" />
                        </div>
                        <div className="profile-form">
                            <label className="form-label">Company</label>
                            <input type="text" className="profile-input" />
                        </div>
                    </div>
                    <div className="two-btns">
                        {/* <button type="button" className="profile-reset-btn">Reset</button> */}
                        <button type="button" className="profile-save-btn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}