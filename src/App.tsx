import { useEffect, useRef } from "react";
import { PrebidService } from "./services/prebid.service";

function App() {
  const initialized = useRef(false);

  useEffect(() => {
    const initAds = async () => {
      if (initialized.current) return;
      initialized.current = true;

      try {
        const prebidService = PrebidService.getInstance();

        // Initialize and wait for scripts to load
        await prebidService.init();

        // Configure services in sequence
        await prebidService.configurePrebid();
        await prebidService.setupGPT();

        // Request bids first
        await prebidService.requestBids();

        // Display ads after bids are set
        await prebidService.displayAds(['div-1', 'div-2']);

      } catch (error) {
        console.error('Error initializing ads:', error);
      }
    };

    initAds();

    // Cleanup function
    return () => {
      initialized.current = false;
    };
  }, []);

  return (
    <div>
      <div id="div-1">
        <p>No response</p>
      </div>
      <div id="div-2">
        <p>No response</p>
      </div>
    </div>
  );
}

export default App;
