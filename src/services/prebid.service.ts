import { adSlots, floors, adUnits as defaultUnits } from "../prebig.config.json";

declare const pbjs: any;
declare const googletag: any;

interface AdUnit {
    code: string;
    sizes: number[][];
    mediaTypes: object;
    bids: object[];
}

export class PrebidService {
    private static instance: PrebidService;
    private adUnits: AdUnit[] = [];
    private PREBID_TIMEOUT = 3000;
    private initialized = false;

    private constructor() {
        this.adUnits = defaultUnits;
    }

    public static getInstance(): PrebidService {
        if (!PrebidService.instance) {
            PrebidService.instance = new PrebidService();
        }
        return PrebidService.instance;
    }

    private debug(...args: any[]): void {
        console.log('[PrebidService]', ...args);
    }

    private myBucketFunction(cpm: number): string {
        return cpm <= 1 ? '<= 1$' : '> 1$';
    }

    public async init(): Promise<void> {
        if (this.initialized) return;

        this.debug('Initializing PrebidService');

        window.pbjs = window.pbjs || {};
        window.pbjs.que = window.pbjs.que || [];
        window.googletag = window.googletag || {};
        window.googletag.cmd = window.googletag.cmd || [];

        this.initialized = true;
        this.debug('Initialization complete');
    }

    public configurePrebid(): Promise<void> {
        this.debug('Configuring Prebid');
        return new Promise((resolve) => {
            pbjs.que.push(() => {
                pbjs.setConfig({ debug: true, floors });
                pbjs.addAdUnits(this.adUnits);

                // Analytics setup
                pbjs.enableAnalytics({
                    provider: 'ga',
                    options: {
                        sampling: 0.1,
                        cpmDistribution: this.myBucketFunction,
                    },
                });

                this.debug('Prebid configured with analytics');

                // Set up event listeners
                this.setupEventListeners();

                resolve();
            });
        });
    }

    private setupEventListeners(): void {
        pbjs.onEvent('addAdUnits', () => {
            this.debug('Ad units were added to Prebid.');
            this.debug(pbjs.adUnits);
        });

        pbjs.onEvent('bidRequested', (args: any) => {
            this.debug('Bid requested:', args);
        });

        pbjs.onEvent('bidResponse', (bid: any) => {
            this.debug(`Bid response from ${bid}:`, bid);
        });

        pbjs.onEvent('auctionEnd', (data: any) => {
            this.debug('Auction ended:', data);
        });

        pbjs.onEvent('bidWon', (bid: any) => {
            this.debug(`Bid won by ${bid.bidderCode}:`, bid);
        });

        pbjs.onEvent('noBid', (bid: any) => {
            this.debug(`No bid received from ${bid}`);
        });

        this.debug('Event listeners set up');
    }

    public requestBids(): Promise<void> {
        this.debug('Requesting bids');
        return new Promise((resolve) => {
            pbjs.que.push(() => {
                pbjs.requestBids({
                    bidsBackHandler: () => {
                        this.debug('Bids received');
                        this.initAdserver();
                        resolve();
                    },
                });
            });

            setTimeout(() => {
                this.debug('Bid timeout reached');
                this.initAdserver();
                resolve();
            }, this.PREBID_TIMEOUT);
        });
    }

    private initAdserver(): void {
        if (pbjs.initAdserverSet) {
            this.debug('Ad server already initialized');
            return;
        }

        this.debug('Initializing ad server');
        googletag.cmd.push(() => {
            pbjs.que.push(() => {
                pbjs.setTargetingForGPTAsync();
                googletag.pubads().refresh();
                this.debug('Ad server initialized and ads refreshed');
            });
        });

        pbjs.initAdserverSet = true;
    }

    public setupGPT(): Promise<void> {
        this.debug('Setting up GPT');
        return new Promise((resolve) => {
            googletag.cmd.push(() => {
                googletag.pubads().clear();
                for (const slot of adSlots) {
                    const [adUnit, adSize, adElementId] = slot;
                    this.debug(`Defining ad slot: ${adElementId}`);
                    googletag.defineSlot(adUnit, adSize, adElementId)
                        .addService(googletag.pubads());
                }

                googletag.pubads().disableInitialLoad();
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                this.debug('GPT setup complete');
                resolve();
            });
        });
    }

    public displayAds(adElements: string[]): Promise<void> {
        this.debug('Displaying ads');
        return new Promise((resolve) => {
            googletag.cmd.push(() => {
                adElements.forEach((divId) => {
                    this.debug(`Displaying ad for: ${divId}`);
                    if (document.getElementById(divId)) {
                        googletag.display(divId);
                    } else {
                        this.debug(`Warning: Element ${divId} not found in DOM`);
                    }
                });
                resolve();
            });
        });
    }
}


