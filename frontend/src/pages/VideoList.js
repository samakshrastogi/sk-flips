import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./VideoList.css";

export default function VideoList() {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/videos")
            .then((res) => {
                setMedia(res.data.media || []);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="videos-loading">Loading</div>;
    }

    if (media.length === 0) {
        return <div className="videos-empty">No videos found</div>;
    }

    return (
        <div className="videos-page">
            <h2 className="videos-title">Videos</h2>

            <div className="videos-grid">
                {media.map((item) => (
                    <div
                        key={item.id}
                        className="video-card"
                        onClick={() => navigate(`/videos/${item.id}`, { state: item })}
                    >
                        <div className="video-preview">
                            ▶
                        </div>

                        <div className="video-info">
                            <div className="video-title">
                                {item.title}
                            </div>
                            <div className="video-channel">
                                {item.channelName}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
