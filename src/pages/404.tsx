import { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <p style={{ fontSize: 36, fontWeight: "bold" }}>404</p>
      <p style={{ fontSize: 16 }}>Page Not Found</p>
    </div>
  );
}

export default NotFound;
