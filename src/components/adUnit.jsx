import React, { useEffect } from 'react';

const AdSenseAd = () => {
  // Use useEffect to run the push logic *after* the component renders
  useEffect(() => {
    try {
      // Check if the adsbygoogle array is available and push an empty object
      // This tells the main script to look for a new ad unit on the page
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense Error: ", e);
    }
  }, []); // The empty array ensures this runs only once after mount

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }} // Important: Use the style prop for React
        data-ad-client="ca-pub-5005896729722611"
        data-ad-slot="4368261081" // Your specific ad slot
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSenseAd;