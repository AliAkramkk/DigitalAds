import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axiosInstance from "../../api/axiosInstance";
import UserNavbar from '../../components/User/UserNavbar';

const AdWatchPage = () => {
  const { id } = useParams();
  const playerRef = useRef(null);

  const [ad, setAd] = useState(null);
  const [hasWatchedFully, setHasWatchedFully] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const adRes = await axiosInstance.get(`/user/ads/${id}`);
        setAd(adRes.data);
        const commentRes = await axiosInstance.get(`/user/ads/${id}/comments`);
        setComments(commentRes.data);
      } catch (err) {
        console.error('Error fetching ad:', err);
      }
    };
    fetchAd();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const duration = playerRef.current.getDuration?.();
        const played = playerRef.current.getCurrentTime?.();
        if (duration && played && played >= duration - 1 && !hasWatchedFully) {
          setHasWatchedFully(true);
          clearInterval(interval);

          // Mark as watched in backend
          axiosInstance.post(`/user/ads/${id}/mark-watched`, { adId: id })
            .then(() => console.log("Marked as watched"))
            .catch(err => console.error("Error marking watched:", err));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [id, hasWatchedFully]);

  const handleReward = async () => {
    try {
      await axiosInstance.post(`/user/reward`, { adId: id });
      setRewardClaimed(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/user/ads/${id}/comment`, { comment, rating });
      const updated = await axiosInstance.get(`/user/ads/${id}/comments`);
      setComments(updated.data);
      setComment('');
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting comment.');
    }
  };

  if (!ad) return <div className="p-5">Loading...</div>;

  return (
    <>
    <UserNavbar />
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>
      <p className="text-gray-600 mb-4">{ad.description}</p>

      <div className="my-5">
        <ReactPlayer
          ref={playerRef}
          url={ad.videoUrl}
          playing
          controls
          width="100%"
          height="400px"
        />
      </div>

      {!hasWatchedFully && (
        <div className="text-center text-red-600 font-semibold mb-4">
          ⏳ Watch the full ad to unlock rewards and leave feedback!
        </div>
      )}

      {hasWatchedFully && (
        <>
          {!rewardClaimed ? (
            <button
              onClick={handleReward}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 mb-4 w-full text-lg"
            >
              🎁 Claim Your Reward
            </button>
          ) : (
            <div className="text-green-700 text-center font-semibold mb-4">
              ✅ Reward Claimed Successfully!
            </div>
          )}

          <form onSubmit={handleComment} className="bg-gray-100 p-4 rounded mt-6">
            <h2 className="font-bold text-lg mb-2">Leave a Comment & Rating</h2>
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Your thoughts about this ad..."
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <div className="mb-3">
              <label className="font-semibold mr-2">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 rounded border"
              >
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val} Star{val > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </form>
        </>
      )}

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-3">🗨️ Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="border-b py-2">
              <p className="text-sm font-semibold">{c.user?.name || 'User'}</p>
              <p className="text-gray-700">{c.comment}</p>
              <p className="text-yellow-500">⭐ {c.rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default AdWatchPage;
