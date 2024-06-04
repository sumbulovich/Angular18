import { MonacoServices } from "monaco-languageclient";

export {};

declare global {
	interface Window {
		// Google Task Manager event broadcast
		dataLayer: any[];
		// HubSpot Tracking code
		_hsq: any[];
		// Monaco service instance
		monacoServiceInstance: MonacoServices;
	}
}
