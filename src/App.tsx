import { useEffect, useRef } from "react";
import { PrebidService } from "./services/prebid.service";
import { Footer, Navbar } from "./components";
import Hero from "./theme/hero";
import { Articles, Posts } from "./theme";

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

    return () => {
      initialized.current = false;
    };
  }, []);

  return (
    <>
      <div id="div-1" className="absolute top-56 z-50">
      </div>
      <div id="div-2" className="absolute top-0 z-[100] w-full">
      </div>

      <Navbar />
      <Hero />
      <Posts />
      <Articles />
      <Footer />
    </>
  );
}

export default App;
