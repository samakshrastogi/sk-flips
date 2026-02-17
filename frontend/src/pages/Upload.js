import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Upload.css";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [channelName, setChannelName] = useState("");
    const [mediaType, setMediaType] = useState("video");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const upload = async () => {
        if (!file || !channelName.trim()) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("channelName", channelName);
        formData.append("mediaType", mediaType);

        try {
            setUploading(true);

            await api.post("/videos/upload", formData, {
                onUploadProgress: (e) => {
                    if (e.total) {
                        setProgress(Math.round((e.loaded * 100) / e.total));
                    }
                },
            });

            navigate("/videos");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-page">
            <h2 className="upload-title">Upload</h2>

            <input
                className="upload-input"
                type="text"
                placeholder="Channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
            />

            <input
                className="upload-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <select
                className="upload-input"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
            >
                <option value="video">Video</option>
                <option value="icon">Icon</option>
            </select>

            <input
                className="upload-input"
                type="file"
                accept={mediaType === "video" ? "video/*" : "image/*"}
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button
                className="upload-button"
                onClick={upload}
                disabled={uploading}
            >
                {uploading ? `${progress}%` : "Upload"}
            </button>
        </div>
    );
}
