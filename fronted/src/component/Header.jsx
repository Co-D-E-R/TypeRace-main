import React from "react";
import "@fontsource/bungee";
import DarkIcon from "../assets/TypeRacing.jpg";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "20px",
        marginLeft: "30px",
        alignItems: "center",
      }}
    >
      <img
        style={{
          marginRight: "20px",
          width: "9%",
          transition: "transform 0.3s ease",
        }}
        src={DarkIcon}
        alt="Dark Icon"
        onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(5deg)")} // Hover effect
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "rotate(-5deg)")
        } // Revert hover effect
      />
      <h5
        style={{
          fontFamily: "Bungee, monospace",
          fontWeight: 700,
          fontSize: "5rem",
          letterSpacing: ".3rem",
          color: "transparent",
          backgroundImage: "linear-gradient(90deg, #ff8c00, #ff0080)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          textDecoration: "none",
          margin: 0,
        }}
      >
        Type Race
      </h5>
    </div>
  );
};

export default Header;

{
  /* // <AppBar
    //   position="absolute"
    //   sx={{ backgroundColor: "transparent", display: "flex", boxShadow: "0" }}
    // >
    //   <Container maxWidth="xl" sx={{ mt: 2 }}>
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           flexGrow: 1,
    //         }}
    //       >
    //         <img
    //           src={DarkIcon}
    //           alt="logo"
    //           width="9%"
    //           height="10%"
    //           style={{
    //             marginRight: "50px",
    //             borderRadius: "15%", // Rounded corners
    //             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow effect
    //             transform: "rotate(-5deg)", // Slight rotation
    //             transition: "transform 0.3s", // Smooth transition
    //           }}
    //           onMouseEnter={(e) =>
    //             (e.currentTarget.style.transform = "rotate(5deg)")
    //           } // Hover effect
    //           onMouseLeave={(e) =>
    //             (e.currentTarget.style.transform = "rotate(-5deg)")
    //           } // Revert hover effect
    //         />
    //         <Typography
    //           variant="h5"
    //           sx={{
    //             fontFamily: "Bungee, monospace",
    //             fontWeight: 700,
    //             fontSize: "5rem",
    //             letterSpacing: ".3rem",
    //             color: "transparent",
    //             backgroundImage: "linear-gradient(90deg, #ff8c00, #ff0080)",
    //             backgroundClip: "text",
    //             WebkitBackgroundClip: "text",
    //             // textShadow: '2px 2px #000000',
    //             textDecoration: "none",
    //           }}
    //         >
    //           Type Race
    //         </Typography>
    //       </Box>
    //       <Box sx={{ ml: "auto", mr: 2 }}>
    //         <IconButton sx={{ p: 0 }}>
    //           <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
    //         </IconButton>
    //       </Box>
    //     </Box>
    //   </Container>
    // </AppBar> */
}
