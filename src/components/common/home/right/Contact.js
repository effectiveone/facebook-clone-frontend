export default function Contact({ user }) {
  console.log("co tu sie odpierdala", user);
  return (
    <div className="contact hover3">
      <div className="contact_img">
        <img src={user?.picture} alt="" />
      </div>
      <span>
        {user?.first_name} {user?.last_name}
      </span>
    </div>
  );
}
