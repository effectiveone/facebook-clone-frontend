export default function Story({ story }) {
  // Determine what type of story we have (dummy or real API data)
  const isTextStory = story.type === 'text';
  const storyImage = story.image || (isTextStory ? null : story.background || '#1877f2');
  const profilePicture = story.profile_picture || story.user?.picture || '../../../../images/default_pic.png';
  const profileName = story.profile_name || story.user?.first_name || 'User';
  
  return (
    <div className="story">
      {isTextStory ? (
        <div 
          className="story_text_preview" 
          style={{ backgroundColor: story.background || '#1877f2' }}
        >
          <div className="story_text_content">{story.text?.substring(0, 20)}{story.text?.length > 20 ? '...' : ''}</div>
        </div>
      ) : (
        <img src={storyImage} alt="" className="story_img" />
      )}
      <div className="story_profile_pic">
        <img src={profilePicture} alt="" />
      </div>
      <div className="story_profile_name">{profileName}</div>
    </div>
  );
}
