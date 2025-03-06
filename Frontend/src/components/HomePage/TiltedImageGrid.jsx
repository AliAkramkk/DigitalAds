import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./TiltedImageGrid.css";

// Import images from assets folder
import ad1 from "../../assets/Images/ad1.webp";
import ad2 from "../../assets/Images/ad2.jpg";
import ad3 from "../../assets/Images/ad3.jpg";
import ad4 from "../../assets/Images/ad4.jpg";
import ad5 from "../../assets/Images/ad5.jpg";
import ad6 from "../../assets/Images/ad6.jpg";
import ad7 from "../../assets/Images/ad7.jpg";

const allImages = [ad1, ad2, ad3, ad4, ad5, ad6, ad7];

export default function TiltedGrid() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const [displayImages, setDisplayImages] = useState(
    window.innerWidth > 1024 ? allImages : allImages.slice(0, 6)
  );

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth > 1024;
      setIsLargeScreen(isLarge);
      setDisplayImages(isLarge ? allImages : allImages.slice(0, 6));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid-container ml-4">
      {displayImages.map((src, index) => (
        <motion.div
          key={index}
          className="grid-item"
          initial={{ rotate: Math.random() * 20 - 10, opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: Math.random() * 20 - 10,
            y: isLargeScreen ? [0, -10, 10, 0] : 0, // Moves on large screens only
          }}
          whileHover={{ scale: 1.1, rotate: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <img src={src} alt={`Image ${index}`} />
        </motion.div>
      ))}
    </div>
  );
}
