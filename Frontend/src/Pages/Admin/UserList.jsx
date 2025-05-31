import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/getUser');
        setUsers(response.data.userDetails); // Assuming backend sends { userDetails: [...] }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);


  const toggleBlockUser = async (userId, block) => {
    try {
      const response = await axiosInstance.patch(`/admin/${block ? 'block' : 'unblock'}User/${userId}`);
      // Optimistically update local state
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isBlocked: block } : user
        )
      );
    } catch (err) {
      console.error(`Failed to ${block ? 'block' : 'unblock'} user`, err);
    }
  };



    return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Ads Watched</th>
              <th className="px-4 py-2">Rewards Earned</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.totalAdsWatched}</td>
                <td className="px-4 py-2">{user.totalRewardEarned}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleBlockUser(user._id, !user.isBlocked)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
