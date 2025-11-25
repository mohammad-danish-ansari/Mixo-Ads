import React, { useEffect, useState } from "react";
import { Search, Filter, ArrowUpDown, ChevronDown, Loader2, Edit } from "lucide-react";
import { showAlert } from "../../utils/alerts";
import { getAllCampaigns } from "../../services/campaignsService";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    const getAllLoadComp = async () => {
        try {
            setLoading(true);
            const response = await getAllCampaigns();
            setCampaigns(response.campaigns);
        } catch (error) {
            showAlert.error("failed to load campaigns.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllLoadComp();
    }, []);

    // Filter by search
    const filteredData = (campaigns ?? []).filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="flex-1 overflow-auto">

            {/* Header */}
            {/* <div className="bg-white lg:px-6 flex items-center justify-end bt_1"> */}
            <div className="flex justify-between items-center p-4">
                <h1 className="text-xl font-semibold">All Campaigns</h1>

                <button
                    className="inline-flex justify-end items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                    Add Campaign
                </button>
                {/* </div> */}
            </div>

            <div className="p-6">

                {/* Search & Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">

                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search campaigns..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            <Filter size={16} className="mr-2" />
                            {showFilters ? "Hide Filters" : "Filters"}
                        </button>

                        <span className="text-sm text-gray-600">
                            {filteredData.length} campaigns
                        </span>
                    </div>

                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium mb-4">Advanced Filters</h3>
                            <p className="text-gray-400">Coming soon...</p>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                                ) : filteredData.length > 0 ? (
                                    filteredData.map((camp) => (
                                        <tr key={camp.id} className="hover:bg-gray-50">

                                            <td key={camp.id} onClick={() => navigate(`/campaigns/${camp.id}/insights`)} className="
    px-6 py-4 text-sm font-medium text-blue-600 
    hover:text-blue-800 hover:underline cursor-pointer
  ">
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
                                                <button className="text-blue-600 hover:text-blue-800 px-6 py-4"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // prevents row click
                                                        navigate(`/campaigns/${camp.id}`);
                                                    }}>
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
            </div>
        </div>
    );
};

export default Campaigns;

