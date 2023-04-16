import { Dots, NewRoom, Search } from "../../../../assets/svg";
import Contact from "./Contact";
import React from "react";
import "./style.css";
import { useFriends } from "../../../../hooks/useFriends";
import Messenger from "../../Messenger/Messenger";
export default function RightHome() {
  const { data, friends } = useFriends();

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    friends?.forEach((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f._id);
      f.isOnline = isUserOnline ? true : false;
    });

    return friends;
  };

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
          {checkOnlineUsers(data.friends, friends.onlineUsers)?.map(
            (cur, i) => (
              <React.Fragment key={i}>
                <Contact user={cur} isOnline={cur.isOnline} />
              </React.Fragment>
            )
          )}
          <Messenger />
        </div>
      </div>
    </div>
  );
}
