import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./Watch.css";

export default function Watch() {
    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [streamUrl, setStreamUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!state) {
            navigate("/videos", { replace: true });
            return;
        }

        if (state.mediaType === "icon") {
            setLoading(false);
            return;
        }

        api.get(`/videos/${id}/stream-url`)
            .then((res) => {
                setStreamUrl(res.data.url);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, state, navigate]);

    if (!state) {
        return null;
    }

    if (state.mediaType === "icon") {
        return (
            <div className="watch-page">
                <h2 className="watch-title">{state.title}</h2>
                <img
                    src={state.s3Url}
                    alt={state.title}
                    className="watch-image"
                />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="watch-page">
                <div className="watch-loading">Loading video</div>
            </div>
        );
    }

    return (
        <div className="watch-page">
            <h2 className="watch-title">{state.title}</h2>
            <video
                className="watch-player"
                controls
                src={streamUrl}
            />
        </div>
    );
}
