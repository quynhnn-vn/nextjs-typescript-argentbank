import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { putUserProfile } from "../shared/apis";
import { selectToken } from "../store/features/auth/authSlice";
import {
  selectUserProfile,
  setUserProfile,
} from "../store/features/user/userSlice";

interface NewName {
  firstName: string;
  lastName: string;
}

export default function UserProfile() {
  const user = useAppSelector(selectUserProfile);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newName, setNewName] = useState<NewName>({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    setNewName({
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }, [user.firstName, user.lastName]);

  const handleClickEditName = () => {
    setIsEditOpen((prev: boolean) => !prev);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName((prev: NewName) => ({
      ...prev,
      [e.target.name as keyof NewName]: e.target.value,
    }));
  };

  const handleSaveEditName = () => {
    if (
      newName.firstName !== user.firstName ||
      newName.lastName !== user.lastName
    ) {
      putUserProfile(token, newName)
        .then((response) => {
          if (response?.status === 200) {
            dispatch(setUserProfile(response?.body));
            handleClickEditName();
          }
        })
        .catch((error) => console.log(error));
    } else {
      handleClickEditName();
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back</h1>
        {!isEditOpen ? (
          <h2>
            {newName.firstName} {newName.lastName}
          </h2>
        ) : (
          <div className="edit-name-ctn">
            <input
              name="firstName"
              placeholder={user.firstName}
              value={newName.firstName}
              onChange={handleChangeName}
              className="edit-name-input"
            />
            <input
              name="lastName"
              placeholder={user.lastName}
              value={newName.lastName}
              onChange={handleChangeName}
              className="edit-name-input"
            />
          </div>
        )}
        {!isEditOpen ? (
          <button className="edit-button" onClick={handleClickEditName}>
            Edit Name
          </button>
        ) : (
          <div className="edit-name-ctn">
            <button onClick={handleSaveEditName} className="edit-name-btn">
              Save
            </button>
            <button onClick={handleClickEditName} className="edit-name-btn">
              Cancel
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
