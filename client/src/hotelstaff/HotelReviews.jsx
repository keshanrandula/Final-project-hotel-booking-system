import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Star,
  Hotel,
  MessageSquare,
  ChevronLeft,
  TrendingUp,
  Award,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Mail,
  Phone,
  Search,
  Download,
  RefreshCw,
  AlertCircle,
  User
} from "lucide-react";

export default function HotelReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [respondingTo, setRespondingTo] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [posting, setPosting] = useState(false);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
    total: 0
  });

  // Get hotel info from localStorage
  const hotelToken = localStorage.getItem("hotelToken");
  const hotelId = localStorage.getItem("hotelId");
  const hotelName = localStorage.getItem("hotelName");

  useEffect(() => {
    if (!hotelToken || !hotelId) {
      navigate("/hotellogin");
      return;
    }
    fetchHotelReviews();
  }, []);

  // Fetch real reviews from backend
  const fetchHotelReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching reviews for hotel:", hotelName);
      
      const response = await axios.get(
        `http://localhost:5000/api/feedback/hotel/${encodeURIComponent(hotelName)}`,
        {
          headers: { 
            Authorization: `Bearer ${hotelToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Reviews response:", response.data);

      if (response.data.success) {
        const reviewsData = response.data.feedbacks || [];
        setReviews(reviewsData);
        setFilteredReviews(reviewsData);
        calculateStats(reviewsData);
      } else {
        setError("Failed to load reviews");
      }
      
    } catch (err) {
      console.error("Error fetching reviews:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please login again.");
        setTimeout(() => navigate("/hotellogin"), 2000);
      } else {
        setError(err.response?.data?.message || "Failed to load reviews. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from reviews
  const calculateStats = (reviewsList) => {
    const total = reviewsList.length;
    if (total === 0) {
      setStats({
        averageRating: 0,
        totalReviews: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
        total: 0
      });
      return;
    }

    const sum = reviewsList.reduce((acc, rev) => acc + rev.rating, 0);
    const average = (sum / total).toFixed(1);

    const fiveStar = reviewsList.filter(r => r.rating === 5).length;
    const fourStar = reviewsList.filter(r => r.rating === 4).length;
    const threeStar = reviewsList.filter(r => r.rating === 3).length;
    const twoStar = reviewsList.filter(r => r.rating === 2).length;
    const oneStar = reviewsList.filter(r => r.rating === 1).length;

    setStats({
      averageRating: average,
      totalReviews: total,
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar,
      total
    });
  };

  // Filter reviews
  useEffect(() => {
    let filtered = [...reviews];

    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter !== "all") {
      filtered = filtered.filter(review => review.rating === parseInt(ratingFilter));
    }

    setFilteredReviews(filtered);
  }, [searchTerm, ratingFilter, reviews]);

  // Post response to review
  const handlePostResponse = async (reviewId) => {
    if (!responseText.trim()) {
      alert("Please enter a response");
      return;
    }

    try {
      setPosting(true);
      
      const response = await axios.post(
        `http://localhost:5000/api/feedback/${reviewId}/respond`,
        { response: responseText },
        { 
          headers: { 
            Authorization: `Bearer ${hotelToken}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (response.data.success) {
        // Update the review in state
        setReviews(prevReviews =>
          prevReviews.map(review =>
            review._id === reviewId
              ? { ...review, hotelResponse: response.data.feedback.hotelResponse }
              : review
          )
        );
        
        setRespondingTo(null);
        setResponseText("");
        alert("Response posted successfully!");
      }
    } catch (err) {
      console.error("Error posting response:", err);
      alert(err.response?.data?.message || "Failed to post response");
    } finally {
      setPosting(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Extract room name from comment (if format is [Hotel - Room])
  const extractRoomName = (comment) => {
    if (!comment) return "Unknown Room";
    const match = comment.match(/\[(.*?)\]/);
    if (match) {
      const parts = match[1].split(' - ');
      return parts[1] || parts[0];
    }
    return "Unknown Room";
  };

  // Clean comment (remove the [Hotel - Room] prefix)
  const cleanComment = (comment) => {
    if (!comment) return "";
    return comment.replace(/\[.*?\]\s*/g, '');
  };

  // Export to CSV
  const exportToCSV = () => {
    try {
      const headers = ['Date', 'Customer Name', 'Email', 'Rating', 'Comment', 'Your Response'];
      const csvData = filteredReviews.map(review => [
        formatDate(review.createdAt),
        review.user?.name || 'N/A',
        review.user?.email || 'N/A',
        review.rating,
        cleanComment(review.comment).replace(/,/g, ';'),
        review.hotelResponse?.text?.replace(/,/g, ';') || ''
      ]);

      const csvContent = [headers, ...csvData]
        .map(row => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${hotelName || 'hotel'}-reviews-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting CSV:", err);
      alert("Failed to export CSV");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your hotel reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/hoteldashboard")}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
        </div>

        {/* Main Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-xl mr-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Guest Reviews
                </h1>
                <p className="text-gray-600">
                  {hotelName || 'Your Hotel'} • Real guest feedback
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={fetchHotelReviews}
                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={exportToCSV}
                disabled={filteredReviews.length === 0}
                className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {/* Statistics Cards - Only show if there are reviews */}
        {stats.totalReviews > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Average Rating */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Average Rating</p>
                  <Award className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex items-end space-x-2">
                  <p className="text-3xl font-bold text-gray-800">{stats.averageRating}</p>
                  <div className="flex mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(stats.averageRating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">out of 5 stars</p>
              </div>

              {/* Total Reviews */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{stats.totalReviews}</p>
                <p className="text-xs text-gray-500 mt-2">all time reviews</p>
              </div>

              {/* 5-Star Reviews */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">5-Star Reviews</p>
                  <ThumbsUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{stats.fiveStar}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {((stats.fiveStar / stats.total) * 100).toFixed(1)}% of total
                </p>
              </div>

              {/* 1-Star Reviews */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">1-Star Reviews</p>
                  <ThumbsDown className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-3xl font-bold text-gray-800">{stats.oneStar}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {((stats.oneStar / stats.total) * 100).toFixed(1)}% of total
                </p>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = stats[`${star}Star`];
                  const percentage = (count / stats.total) * 100;
                  
                  return (
                    <div key={star} className="flex items-center">
                      <span className="w-16 text-sm text-gray-600">{star} Star</span>
                      <div className="flex-1 mx-4">
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              star === 5 ? 'bg-green-500' :
                              star === 4 ? 'bg-blue-500' :
                              star === 3 ? 'bg-yellow-500' :
                              star === 2 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="w-12 text-sm font-medium text-gray-700">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Star Only</option>
                <option value="4">4 Star Only</option>
                <option value="3">3 Star Only</option>
                <option value="2">2 Star Only</option>
                <option value="1">1 Star Only</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredReviews.length}</span> of <span className="font-semibold">{reviews.length}</span> reviews
            </p>
          </div>
        </div>

        {/* Reviews List */}
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Reviews Found</h2>
            <p className="text-gray-600">
              {searchTerm || ratingFilter !== "all"
                ? "Try adjusting your filters"
                : "Your hotel hasn't received any reviews yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <div className="p-6">
                  {/* Review Header */}
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                        {review.user?.name?.charAt(0) || 'G'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{review.user?.name || 'Guest'}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {review.user?.email || 'N/A'}
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {review.user?.phone || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600 ml-2">
                        {review.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Room Info */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4 inline-block">
                    <span className="text-sm text-blue-700">
                      <Hotel className="w-4 h-4 inline mr-1" />
                      Room: {extractRoomName(review.comment)}
                    </span>
                  </div>

                  {/* Review Comment */}
                  <div className="mb-4">
                    <p className="text-gray-700 whitespace-pre-line text-base leading-relaxed">
                      {cleanComment(review.comment)}
                    </p>
                  </div>

                  {/* Review Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(review.createdAt)}
                  </div>

                  {/* Hotel Response */}
                  {review.hotelResponse && (
                    <div className="ml-8 pl-4 border-l-4 border-green-500 bg-green-50 p-4 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-green-700 mb-1">Your Response:</p>
                      <p className="text-gray-700">{review.hotelResponse.text}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Responded on {formatDate(review.hotelResponse.respondedAt)}
                      </p>
                    </div>
                  )}

                  {/* Response Form */}
                  {respondingTo === review._id ? (
                    <div className="mt-4">
                      <textarea
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Write your response to this review..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        rows="3"
                      ></textarea>
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handlePostResponse(review._id)}
                          disabled={posting}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                          {posting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Posting...
                            </>
                          ) : (
                            'Post Response'
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setRespondingTo(null);
                            setResponseText("");
                          }}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    !review.hotelResponse && (
                      <button
                        onClick={() => setRespondingTo(review._id)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Respond to Review
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}