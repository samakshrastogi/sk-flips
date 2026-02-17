import { useState } from "react";
import api from "../api/api";

export default function Upload({ onUploadSuccess }) {
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const upload = async () => {
        if (!video) {
            alert("Please select a video file");
            return;
        }

        if (!title.trim()) {
            alert("Please enter a title");
            return;
        }

        const formData = new FormData();
        formData.append("video", video);
        formData.append("title", title);

        try {
            setUploading(true);

            await api.post("/videos/upload", formData, {
                onUploadProgress: (e) => {
                    const percent = Math.round((e.loaded * 100) / e.total);
                    setProgress(percent);
                },
            });

            alert("Video uploaded successfully!");

            // reset form
            setVideo(null);
            setTitle("");
            setProgress(0);

            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            alert("Upload failed");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h2>⬆ Upload Video</h2>

            <div style={styles.form}>
                <input
                    type="text"
                    placeholder="Video title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                />

                <button onClick={upload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </button>

                {uploading && (
                    <div style={styles.progressWrapper}>
                        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
    },
    progressWrapper: {
        width: "100%",
        height: "8px",
        backgroundColor: "#eee",
        borderRadius: "4px",
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#4caf50",
        transition: "width 0.2s ease",
    },
};
