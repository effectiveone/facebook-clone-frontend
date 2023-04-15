import OnlineIndicator from "./OnlineIndicator";

export default function Contact({ user, isOnline }) {
  return (
    <div className="contact hover3">
      {isOnline && <OnlineIndicator />}
      <div className="contact_img">
        <img src={user?.picture} alt="" />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
