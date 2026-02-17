import { useState } from "react";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Watch from "./pages/Watch";
import VideoList from "./pages/VideoList";

function App() {
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1>🎥 sk-flips</h1>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Auth */}
        <section style={styles.section}>
          <Login />
        </section>

        {/* Upload */}
        <section style={styles.section}>
          <Upload onUploadSuccess={() => window.location.reload()} />
        </section>

        {/* Video List */}
        <section style={styles.section}>
          <VideoList onSelectVideo={setSelectedVideoId} />
        </section>

        {/* Watch */}
        <section style={styles.section}>
          <Watch videoId={selectedVideoId} />
        </section>
      </main>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fafafa",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "15px 30px",
  },
  main: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
  },
  section: {
    marginBottom: "40px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "6px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
};

export default App;
