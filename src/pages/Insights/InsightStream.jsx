import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getByIdCampaignsInsightStream } from '../../services/insightService';
import { showAlert } from '../../utils/alerts';

const InsightStream = () => {
  const { id } = useParams();
  const [campInsightStream, setCampInsightStream] = useState(null);

  useEffect(() => {
  let isActive = true;

  const loadStream = async () => {
    try {
      const stream = await getByIdCampaignsInsightStream(id);
      console.log("stream=====", stream);

      if (stream.stream) {
        stream.read((rawEvent) => {
          if (!isActive) return;

          console.log("RAW EVENT:", rawEvent);

          let parsed = null;

          if (rawEvent?.data && typeof rawEvent.data === "string") {
            try {
              parsed = JSON.parse(rawEvent.data);
            } catch (err) {
              console.error("JSON parse error", err);
            }
          }
          else if (rawEvent?.data && typeof rawEvent.data === "object") {
            parsed = rawEvent.data;
          }
          else if (typeof rawEvent === "object") {
            parsed = rawEvent;
          }

          if (parsed) setCampInsightStream(parsed);
        });
      }
    } catch (e) {
      showAlert.error("failed to load campaignsInsightStream.");
    }
  };

  loadStream();

  return () => {
    isActive = false;
  };
}, [id]);



  if (!campInsightStream) {
    return <p className="text-center p-6">Waiting for live insights...</p>;
  }

  const insights = campInsightStream;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Campaign Live Insights</h2>

      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Campaign ID:</span> {insights.campaign_id}</p>
        <p><span className="font-semibold">Timestamp:</span> {new Date(insights.timestamp).toLocaleString()}</p>

        <hr className="my-2" />

        <p><span className="font-semibold">Impressions:</span> {insights.impressions}</p>
        <p><span className="font-semibold">Clicks:</span> {insights.clicks}</p>
        <p><span className="font-semibold">Conversions:</span> {insights.conversions}</p>
        <p><span className="font-semibold">Spend:</span> ₹{insights.spend}</p>

        <hr className="my-2" />

        <p><span className="font-semibold">CTR:</span> {insights.ctr}%</p>
        <p><span className="font-semibold">CPC:</span> ₹{insights.cpc}</p>
        <p><span className="font-semibold">Conversion Rate:</span> {insights.conversion_rate}%</p>
      </div>
    </div>
  );
};

export default InsightStream;
