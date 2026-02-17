export default function Watch({ videoId }) {
    if (!videoId) {
        return (
            <div style={styles.empty}>
                <h3>▶ Select a video to watch</h3>
                <p>Click on a video from the list above.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>▶ Watch</h2>

            <video
                style={styles.player}
                controls
                src={`http://localhost:5000/api/videos/${videoId}/stream`}
            />

        </div>
    );
}

const styles = {
    player: {
        width: "100%",
        maxHeight: "500px",
        backgroundColor: "#000",
        borderRadius: "6px",
    },
    empty: {
        textAlign: "center",
        color: "#666",
        padding: "40px 0",
    },
};
