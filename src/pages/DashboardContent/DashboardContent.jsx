import React, { useEffect, useState } from "react";
import {
  ArrowUpDown,
  Edit,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  Megaphone,
 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllCampaigns } from "../../services/campaignsService";
import { showAlert } from "../../utils/alerts";

const DashboardContent = () => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayCampaigns, setDisplayCampaigns] = useState([]);
  const getAllLoadComp = async () => {
    try {
      setLoading(true);
      const response = await getAllCampaigns();
      setCampaigns(response.campaigns);
      setLoading(false);
    } catch (error) {
      showAlert.error("Failed to load campaigns.");
    }
  };

  useEffect(() => {
    getAllLoadComp();
  }, []);

  // Show latest 5 campaigns only
  useEffect(() => {
    if (campaigns && Array.isArray(campaigns)) {
      const latest = [...campaigns].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setDisplayCampaigns(latest.slice(0, 5));
    }
  }, [campaigns]);
 const TopCards = [
    {
      title: "Total Campaigns",
      value: campaigns?.length ?? 0,
      icon: Megaphone,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Active",
      value: campaigns?.filter((c) => c.status === "active").length ?? 0,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Paused",
      value: campaigns?.filter((c) => c.status === "paused").length ?? 0,
      icon: Clock,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Completed",
      value: campaigns?.filter((c) => c.status === "completed").length ?? 0,
      icon: AlertCircle,
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          {TopCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow w-full"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${card.bgColor} mr-4`}>
                    <IconComponent className={`h-4 w-4 ${card.textColor}`} />
                  </div>
                  <div>
                    <p className="text-xs font-small text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">Latest Campaigns</h2>

        <button
          onClick={() => navigate("/campaigns")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Show More 
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Brand",
                "Status",
                "Budget",
                "Daily Budget",
                "Platforms",
                "Created At",
                "Action"
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    <ArrowUpDown size={12} />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
                </td>
              </tr>
            ) : displayCampaigns.length > 0 ? (
              displayCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-50">

                  {/* Campaign Name with Click to Insights */}
                  <td
                    onClick={() => navigate(`/campaigns/${camp.id}/insights`)}
                    className="
                      px-6 py-4 text-sm font-medium text-blue-600 
                      hover:text-blue-800 hover:underline cursor-pointer
                    "
                  >
                    {camp.name}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {camp.brand_id}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full
                        ${camp.status === "active"
                          ? "bg-green-100 text-green-800"
                          : camp.status === "paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {camp.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm">₹{camp.budget}</td>
                  <td className="px-6 py-4 text-sm">₹{camp.daily_budget}</td>

                  <td className="px-6 py-4 text-sm">
                    {camp.platforms?.join(", ")}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(camp.created_at).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 px-6 py-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/campaigns/${camp.id}`);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-12 text-gray-500 text-sm"
                >
                  No campaigns found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardContent;
