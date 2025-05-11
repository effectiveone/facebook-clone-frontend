import React, { useEffect, useState } from 'react';
import { ArrowRight, Plus } from '../../../assets/svg';
import './style.css';
import Story from './Story';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { getStories } from '../../../api';
import StoryViewer from './StoryViewer';
export default function Stories() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]); // Start with empty array until API loads
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [selectedUserStories, setSelectedUserStories] = useState([]);

  // Fetch stories on component mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);

        const response = await getStories();

        if (response.error) {
          console.log('Error from API:', response.error);
          setStories([]);
          return;
        }

        // If API returns stories successfully, use them
        if (response.data && response.data.data) {
          setStories(response.data.data);
        } else {
          setStories([]);
        }
      } catch (err) {
        console.log('Error fetching stories:', err);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (story, index, userStories) => {
    setSelectedStory(story);
    setSelectedStoryIndex(index);
    setSelectedUserStories(userStories);
  };

  const closeStoryViewer = () => {
    setSelectedStory(null);
  };
  const query1175px = useMediaQuery({
    query: '(max-width: 1175px)',
  });
  const query1030px = useMediaQuery({
    query: '(max-width: 1030px)',
  });

  const query960px = useMediaQuery({
    query: '(max-width: 960px)',
  });
  const query885px = useMediaQuery({
    query: '(max-width: 885px)',
  });
  const max = query885px
    ? 5
    : query960px
      ? 4
      : query1030px
        ? 5
        : query1175px
          ? 4
          : stories.length;
  return (
    <>
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          storyIndex={selectedStoryIndex}
          stories={selectedUserStories}
          onClose={closeStoryViewer}
        />
      )}
      <div className='stories'>
        {loading ? (
          <div className='stories_loading'>Loading stories...</div>
        ) : (
          <>
            <div
              className='create_story_card'
              onClick={() => navigate('/create-story')}
            >
              <img
                src='../../../../images/default_pic.png'
                alt=''
                className='create_story_img'
              />
              <div className='plus_story'>
                <Plus color='#fff' />
              </div>
              <div className='story_create_text'>Utwórz</div>
            </div>
            {stories.slice(0, max)?.map((storyGroup, i) => {
              // Safely check if storyGroup has stories array and if it's not empty
              if (
                !storyGroup ||
                !storyGroup.stories ||
                !storyGroup.stories.length
              ) {
                return null; // Skip rendering this story if data is invalid
              }

              const firstStory = storyGroup.stories[0];
              const storyType = firstStory.type || 'photo';

              return (
                <div
                  key={i}
                  onClick={() =>
                    handleStoryClick(firstStory, 0, storyGroup.stories)
                  }
                >
                  <Story
                    story={{
                      type: storyType,
                      image: firstStory.image || null,
                      text: firstStory.text || null,
                      background: firstStory.background || '#1877f2',
                      profile_picture:
                        storyGroup.user?.picture ||
                        '../../../../images/default_pic.png',
                      profile_name: storyGroup.user?.first_name || 'User',
                    }}
                  />
                </div>
              );
            })}
            {stories.length > max && (
              <div className='white_circle'>
                <ArrowRight color='#65676b' />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
