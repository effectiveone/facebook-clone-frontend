import { HashLoader } from "react-spinners";
import CreatePost from "../common/createPost";
import Header from "../common/header";
import LeftHome from "./left";
import RightHome from "./right";
import SendVerification from "./sendVerification";
import Stories from "./stories";
import Post from "../common/post";
import "./style.scss";
import { useAppContext } from "../../context/useAppContext";
import { useHomeContext } from "../../context/useHomeContext";

export default function Home() {
  const { setVisible, posts, loading } = useAppContext();
  const { height, middle, user } = useHomeContext({ loading });

  return (
    <>
      {/* <Header page="home" /> */}
      <div className="home" style={{ height: `${height + 150}px` }}>
        <Header page="home" />
        <LeftHome user={user} />
        <div className="home_middle" ref={middle}>
          <Stories />
          {user.verified === false && <SendVerification user={user} />}
          <CreatePost user={user} setVisible={setVisible} />
          {loading ? (
            <div className="sekelton_loader">
              <HashLoader color="#1876f2" />
            </div>
          ) : (
            <div className="posts">
              {Array.isArray(posts.posts) && posts.posts.length > 0 ? (
                posts.posts?.map((p, i) => (
                  <Post key={i} post={p} user={user} />
                ))
              ) : (
                <div className="no_posts">No posts available</div>
              )}
            </div>
          )}
        </div>
        <RightHome user={user} />
      </div>
    </>
  );
}
