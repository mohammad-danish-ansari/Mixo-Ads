import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getByIdCampaigns } from "../../services/campaignsService";
import { Loader2 } from "lucide-react";

const SingleCampaigns = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSingleCampaign = async () => {
    try {
      setLoading(true);
      const response = await getByIdCampaigns(id);
      setCampaign(response.campaign);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    loadSingleCampaign();
  }, [id]);

  if (loading || !campaign) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">

        <h2 className="text-2xl font-bold mb-4">{campaign.name}</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-gray-500">Brand</p>
            <p className="font-medium">{campaign.brand_id}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">{campaign.status}</p>
          </div>

          <div>
            <p className="text-gray-500">Total Budget</p>
            <p className="font-medium">₹{campaign.budget}</p>
          </div>

          <div>
            <p className="text-gray-500">Daily Budget</p>
            <p className="font-medium">₹{campaign.daily_budget}</p>
          </div>

          <div>
            <p className="text-gray-500">Platforms</p>
            <p className="font-medium">{campaign.platforms?.join(", ")}</p>
          </div>

          <div>
            <p className="text-gray-500">Created At</p>
            <p className="font-medium">
              {new Date(campaign.created_at).toLocaleDateString()}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SingleCampaigns;
