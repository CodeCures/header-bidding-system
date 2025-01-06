// global.d.ts
interface Window {
    pbjs: {
        que: Array<() => void>;
        setConfig: (config: object) => void;
        addAdUnits: (adUnits: object[]) => void;
        requestBids: (options: { bidsBackHandler: () => void }) => void;
        setTargetingForGPTAsync: () => void;
        onEvent: (event: string, handler: (...args: any[]) => void) => void;
        initAdserverSet?: boolean;
        getBidResponses?: () => object;
    };
    googletag: {
        cmd: Array<() => void>;
        defineSlot: (adUnitPath: string, size: any, divId: string) => any;
        pubads: () => any;
        enableServices: () => void;
    };
}
