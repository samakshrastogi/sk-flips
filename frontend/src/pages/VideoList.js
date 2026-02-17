import { useEffect, useState } from "react";
import api from "../api/api";

export default function VideoList({ onSelectVideo }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await api.get("/videos");
                setVideos(res.data.videos);
            } catch (err) {
                console.error("Failed to load videos");
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return <p>Loading videos...</p>;
    }

    if (videos.length === 0) {
        return <p>No videos uploaded yet.</p>;
    }

    return (
        <div>
            <h2>📺 Videos</h2>

            <div style={styles.grid}>
                {videos.map((video) => (
                    <div
                        key={video.id}
                        style={styles.card}
                        onClick={() => onSelectVideo(video.id)}
                    >
                        {/* Thumbnail placeholder */}
                        <div style={styles.thumbnail}>
                            ▶
                        </div>

                        <div style={styles.info}>
                            <strong>{video.title}</strong>
                            <p style={styles.date}>
                                {new Date(video.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
    },
    card: {
        border: "1px solid #e5e5e5",
        borderRadius: "6px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    thumbnail: {
        height: "120px",
        backgroundColor: "#000",
        color: "#fff",
        fontSize: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        padding: "10px",
    },
    date: {
        fontSize: "12px",
        color: "#666",
        marginTop: "5px",
    },
};
