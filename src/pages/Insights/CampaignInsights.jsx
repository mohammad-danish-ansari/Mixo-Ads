import React, { useEffect, useState } from 'react'
import { showAlert } from '../../utils/alerts';
import { getByIdCampaignsInsights } from '../../services/insightService';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react/dist/cjs/lucide-react';

const CampaignInsights = () => {
    const { id } = useParams();
    const [campInsights, setCampInsights] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const getLoadByIdCampaignsInsights = async () => {
        try {
            setLoading(true);
            const response = await getByIdCampaignsInsights(id);
            setCampInsights(response.insights);
            setLoading(false);
        } catch (error) {
            showAlert.error("failed to load campaignsInsights.");
        }
    };

    useEffect(() => {
        getLoadByIdCampaignsInsights();
    }, [id]);
    return (
        <div className="p-6">

            <div className="mb-4">
                <button
                    onClick={() => navigate("/campaigns")}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                    <ArrowLeft size={20} />
                    Back to Campaigns
                </button>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            )}

            {/* insights content */}
            {!loading && campInsights && (
                <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">

                    <h2 className="text-xl font-semibold text-blue-600  mb-4 hover:underline cursor-pointer"
                        key={campInsights.campaign_id} onClick={() => navigate(`/campaigns/${campInsights.campaign_id}/stream`)}>
                        Campaign Insights — {campInsights.campaign_id}
                    </h2>

                    <p className="text-sm text-gray-500 mb-6">
                        Updated at: {new Date(campInsights.timestamp).toLocaleString()}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Impressions</p>
                            <p className="text-xl font-bold text-gray-800">{campInsights.impressions}</p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Clicks</p>
                            <p className="text-xl font-bold text-gray-800">{campInsights.clicks}</p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Conversions</p>
                            <p className="text-xl font-bold text-gray-800">{campInsights.conversions}</p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Spend</p>
                            <p className="text-xl font-bold text-gray-800">₹{campInsights.spend}</p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">CTR</p>
                            <p className="text-xl font-bold text-gray-800">{campInsights.ctr}%</p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">CPC</p>
                            <p className="text-xl font-bold text-gray-800">₹{campInsights.cpc}</p>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-xl">
                            <p className="text-sm text-gray-500">Conversion Rate</p>
                            <p className="text-xl font-bold text-gray-800">
                                {campInsights.conversion_rate}%
                            </p>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );

}

export default CampaignInsights
