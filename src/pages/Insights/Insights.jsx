import React, { useEffect, useState } from 'react'
import { getAllCampaignsInsights } from '../../services/insightService';


const Insights = () => {
    const [insights, setInsights] = useState(null);
    useEffect(() => {
        const fetchInsights = async () => {
            const data = await getAllCampaignsInsights();
            console.log("data==", data);

            setInsights(data.insights);
        };

        fetchInsights();
    }, []);
    return (
        <div>
            <div className="flex justify-start items-center p-4">
              <h1 className="text-xl font-semibold">Insights</h1>

            </div>
            {insights && (
                <div className="grid grid-cols-4 gap-4">
                    <div className="card p-2"> <b>Total Campaigns:</b> {insights.total_campaigns}</div>
                    <div className="card p-2"> <b>Active Campaigns:</b> {insights.active_campaigns}</div>
                    <div className="card p-2"> <b>Avg Conversion Rate:</b> {insights.avg_conversion_rate}</div>
                    <div className="card p-2"> <b>Avg Cpc:</b> {insights.avg_cpc}</div>
                    <div className="card p-2"> <b>Avg Ctr:</b> {insights.avg_ctr}</div>
                    <div className="card p-2"> <b>Completed Campaigns:</b> {insights.completed_campaigns}</div>
                    <div className="card p-2"> <b>Paused: </b>{insights.paused_campaigns}</div>
                    <div className="card p-2"> <b>Total Impressions:</b> {insights.total_impressions}</div>
                    <div className="card p-2"> <b>Total Clicks:</b> {insights.total_clicks}</div>
                    <div className="card p-2"> <b>Total Conversions:</b> {insights.total_conversions}</div>
                    <div className="card p-2"> <b>Total spend:</b> {insights.total_spend}</div>

                </div>
            )}
        </div>
    )
}

export default Insights
