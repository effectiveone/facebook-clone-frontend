import { Dots, NewRoom, Search } from "../../../../assets/svg";
import Contact from "./Contact";
import React from "react";
import "./style.css";
import { useFriends } from "../../../../hooks/useFriends";
export default function RightHome() {
  const {
    data: { friends: user },
  } = useFriends();
  console.log("user", user);
  const color = "#65676b";
  return (
    <div className="right_home">
      <div className="heading">Sponsored</div>
      <div className="splitter1"></div>
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
          <div className="contacts_header_right">
            <div className="contact_circle hover1">
              <NewRoom color={color} />
            </div>
            <div className="contact_circle hover1">
              <Search color={color} />
            </div>
            <div className="contact_circle hover1">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contacts_list">
          {user?.map((cur, i) => (
            <React.Fragment key={i}>
              <Contact user={cur} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
