# HEADER BIDDING SYSTEM

![Alt text](image.png)

## Overview

The Prebid Service provides a simplified, scalable header bidding solution for optimizing ad revenue on a publisher's website. It integrates Prebid.js and Google Publisher Tags (GPT) to facilitate real-time bidding and maximize competition for ad inventory.

This service includes the following features:

- **Prebid.js integration** with multiple SSPs.
- **Dynamic floor pricing** based on ad size and device type.
- **Analytics tracking** for bids, win rates, and latency.
- **Fallback ads** for scenarios where no bids are received.
- **Lazy-loading** to optimize performance.
- **CI/CD pipeline integration** for automated deployments.

---

## Features

1. **Prebid.js Configuration**  
   - Dynamically loads and configures Prebid.js with demand partners.
   - Adds ad units for responsive ad displays on mobile and desktop.

2. **Event Listeners**  
   - Tracks bidding events like `bidRequested`, `bidResponse`, `auctionEnd`, `bidWon`, and `noBid`.

3. **Dynamic Floor Pricing**  
   - Implements a `myBucketFunction` to categorize CPMs for analytics purposes.

4. **Fallback Ads**  
   - Ensures fallback ads are displayed when no bids are won.

5. **Lazy Loading**  
   - Displays ads only when they are in the user's viewport.

6. **Analytics Integration**  
   - Utilizes Google Analytics for tracking bid performance.

7. **Error Handling**  
   - Logs errors and timeouts for better debugging.

8. **CI/CD Support**  
   - Designed for seamless deployment via GitHub Actions or GitLab CI/CD.

---

## Setup Instructions

### Prerequisites

- Node.js installed.
- Prebid.js library included in the project.
- Google Publisher Tag (GPT) library added to your site.

### Configuration

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Prebid Configuration File:**  
   Define your ad units, floor pricing, and ad slots in `prebig.config.json`:
   ```json
   {
     "adSlots": [["/1234567/homepage", [300, 250], "div-gpt-ad-123456789-0"]],
     "floors": {
       "buckets": [{ "min": 0, "max": 5, "increment": 0.5 }]
     },
     "adUnits": [
       {
         "code": "div-gpt-ad-123456789-0",
         "sizes": [[300, 250], [728, 90]],
         "mediaTypes": { "banner": {} },
         "bids": [
           {
             "bidder": "appnexus",
             "params": { "placementId": 12345678 }
           }
         ]
       }
     ]
   }
   ```

3. **Include Prebid.js and GPT in your HTML:**
   ```html
   <script src="https://your-prebid-url.js"></script>
   <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
   ```

---

## Usage

1. **Initialize the Service:**
   ```typescript
   const prebidService = PrebidService.getInstance();
   await prebidService.init();
   ```

2. **Configure Prebid.js:**
   ```typescript
   await prebidService.configurePrebid();
   ```

3. **Set Up Google Publisher Tags (GPT):**
   ```typescript
   await prebidService.setupGPT();
   ```

4. **Request Bids:**
   ```typescript
   await prebidService.requestBids();
   ```

5. **Display Ads:**
   ```typescript
   await prebidService.displayAds(['div-gpt-ad-123456789-0']);
   ```

---

## Event Logging

The service logs key events for monitoring and debugging:

- **Ad Units Added:** Logs added ad units.
- **Bid Requested/Response:** Tracks bid requests and responses.
- **Auction Ended:** Logs auction completion data.
- **Bid Won/No Bid:** Reports winning bids or when no bids are received.

---

## Error Handling

The following errors are captured and logged:
- Bid failures
- Timeouts
- Invalid responses from SSPs

---

## Analytics

Prebid analytics are configured to track the following:
- Bid win rates
- Latency
- CPM distribution via `myBucketFunction`.



<!-- ## Resources

- [Prebid.js Documentation](https://docs.prebid.org/)
- [OpenRTB Specification](https://iabtechlab.com/wp-content/uploads/2022/04/OpenRTB-2-6_FINAL.pdf)
- [Google Publisher Tags (GPT)](https://developers.google.com/publisher-tag/guides/get-started)
 -->
