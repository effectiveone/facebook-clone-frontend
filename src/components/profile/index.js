import { Link } from "react-router-dom";
import Header from "../common/header";
import "./style.scss";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../common/createPost";
import GridPosts from "./GridPosts";
import Post from "../common/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../common/intro";
import CreatePostPopup from "../common/createPostPopup";
import Skeleton from "react-loading-skeleton";
import { HashLoader } from "react-spinners";
import "react-loading-skeleton/dist/skeleton.css";
import { useAppContext } from "../../context/useAppContext";
import { useProfileContext } from "../../context/useProfileContext";

export default function Profile() {
  const { getAllPosts } = useAppContext();
  const {
    visible,
    username,
    navigate,
    user,
    photos,
    loading,
    profile,
    visitor,
    othername,
    height,
    profileTop,
    leftSide,
    leftHeight,
    scrollHeight,
    setVisible,
    check,
    setOthername,
    userName,
    dispatch,
  } = useProfileContext();

  // console.log("useProfileContext", profile);

  const { posts } = useAppContext();

  return (
    <div className="profile">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page="profile" getAllPosts={getAllPosts} />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          {loading ? (
            <>
              <div className="profile_cover">
                <Skeleton
                  height="347px"
                  containerClassName="avatar-skeleton"
                  style={{ borderRadius: "8px" }}
                />
              </div>
              <div
                className="profile_img_wrap"
                style={{
                  marginBottom: "-3rem",
                  transform: "translateY(-8px)",
                }}
              >
                <div className="profile_w_left">
                  <Skeleton
                    circle
                    height="180px"
                    width="180px"
                    containerClassName="avatar-skeleton"
                    style={{ transform: "translateY(-3.3rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton
                        height="35px"
                        width="200px"
                        containerClassName="avatar-skeleton"
                      />
                      <Skeleton
                        height="30px"
                        width="100px"
                        containerClassName="avatar-skeleton"
                        style={{ transform: "translateY(2.5px)" }}
                      />
                    </div>
                    <div className="profile_friend_count">
                      <Skeleton
                        height="20px"
                        width="90px"
                        containerClassName="avatar-skeleton"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                    <div className="profile_friend_imgs">
                      {Array.from(new Array(6), (val, i) => i + 1).map(
                        (id, i) => (
                          <Skeleton
                            circle
                            height="32px"
                            width="32px"
                            containerClassName="avatar-skeleton"
                            style={{ transform: `translateX(${-i * 7}px)` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && "fix"}`}>
                  <Skeleton
                    height="36px"
                    width={120}
                    containerClassName="avatar-skeleton"
                  />
                  <div className="flex">
                    <Skeleton
                      height="36px"
                      width={120}
                      containerClassName="avatar-skeleton"
                    />
                    {visitor && (
                      <Skeleton
                        height="36px"
                        width={120}
                        containerClassName="avatar-skeleton"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Cover
                cover={profile.cover}
                visitor={visitor}
                photos={photos.resources}
              />
              <ProfielPictureInfos
                profile={profile}
                visitor={visitor}
                photos={photos.resources}
                othername={othername}
                loading={loading}
              />
            </>
          )}

          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              <div className="profile_left" ref={leftSide}>
                {loading ? (
                  <>
                    <div className="profile_card">
                      <div className="profile_card_header">Intro</div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Photos
                        <div className="profile_header_link">
                          See all photos
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Friends
                        <div className="profile_header_link">
                          See all friends
                        </div>
                      </div>
                      <div className="sekelton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Intro
                      detailss={profile.details}
                      visitor={visitor}
                      setOthername={setOthername}
                    />
                    <Photos
                      username={userName}
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profile.friends} />
                  </>
                )}
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                <GridPosts />
                {loading ? (
                  <div className="sekelton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <div className="posts">
                    {posts.posts?.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
