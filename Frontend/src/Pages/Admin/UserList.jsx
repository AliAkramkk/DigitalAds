import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AdminLayout from "../../components/admin/AdminLayout";

const UserList = () => {
  const [view, setView] = useState("user"); // 'user' or 'customer'
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          view === "user" ? "/admin/getUser" : "/admin/getcustomers";
        const response = await axiosInstance.get(endpoint);
        const data = response.data.userDetails || response.data.customers || [];
        console.log("Fetched data:", data);
        setAllData(data);
        setFilteredData(data); // apply filter logic if needed
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${view}s:`, error);
        setLoading(false);
      }
    };
    fetchData();
  }, [view]);

  const toggleBlockUser = async (userId, block) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/${block ? "block" : "unblock"}User/${userId}`
      );
      // Optimistically update local state
      setAllData((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isBlocked: block } : user
        )
      );
      setFilteredData((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isBlocked: block } : user
        )
      );
    } catch (err) {
      console.error(`Failed to ${block ? "block" : "unblock"} user`, err);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    setShowDropdown(true);

    if (!keyword) {
      setFilteredData(allData);
      return;
    }

    setFilteredData(
      allData.filter((user) => user.name.toLowerCase().includes(keyword))
    );
  };

  useEffect(() => {
    if (!search.trim()) {
      setFilteredData(allData);
    } else {
      const keyword = search.toLowerCase();
      setFilteredData(
        allData.filter((user) => user.name?.toLowerCase().includes(keyword))
      );
    }
  }, [search, allData]);
  useEffect(() => {
    if (view === "customer") {
      console.log("Customer details:", allData);
    }
  }, [allData, view]);
  return (
    <AdminLayout>
    <div className="p-6">
      {/* Toggle and Search */}
      <div className="flex flex-col md:flex-row  items-start md:items-center gap-24 mb-4">
        <div className="flex md:w-1/8 border-2 rounded mb-4 md:mb-0">
          <button
            onClick={() => setView("user")}
            className={`px-4 py-2 mr-2 rounded ${
              view === "user" ? "bg-amber-500 text-white" : "bg-gray-100"
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setView("customer")}
            className={`px-4 py-2 rounded ${
              view === "customer" ? "bg-amber-500 text-white" : "bg-gray-100"
            }`}
          >
            Customers
          </button>
        </div>

        <div className="relative md:w-4/6 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // give click time
            placeholder={`Search ${view} by name`}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          {showDropdown && search && (
            <div className="absolute bg-white border rounded w-full z-10 max-h-40 overflow-y-auto">
              {filteredData.slice(0, 5).map((user) => (
                <div
                  key={user._id}
                  onMouseDown={() => {
                    setSearch(user.name);
                    setFilteredData([user]); // filter to just selected user
                    setShowDropdown(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {user.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border text-sm">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2">Email</th>
              {view === "user" ? (
                <>
                  <th className="px-4 py-2">Ads Watched</th>
                  <th className="px-4 py-2">Rewards Earned</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-2">Ads Posted</th>
                  <th className="px-4 py-2">Plan</th>
                </>
              )}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 text-center py-2">{user.name}</td>
                <td className="px-4 py-2 text-center ">{user.email}</td>
                {view === "user" ? (
                  <>
                    <td className="px-4 py-2 text-center ">
                      {user.totalAdsWatched || 0}
                    </td>
                    <td className="px-4 py-2 text-center ">
                      {user.totalRewardEarned || 0}
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 text-center ">
                      {user.adsPosted || 0}
                    </td>
                    <td className="px-4 py-2 text-center ">
                      {user.plan || "N/A"}
                    </td>
                  </>
                )}
                <td className="px-4 py-2 text-center ">
                  <button
                    onClick={() => toggleBlockUser(user._id, !user.isBlocked)}
                    className={`px-3 py-1 rounded   text-white ${
                      user.isBlocked ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </AdminLayout>
  );
};

export default UserList;
