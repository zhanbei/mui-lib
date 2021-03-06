//

import React from 'react';
import {IFetcher, useFetcher} from './useFetcher';

interface IFetcherRefer {
	active: boolean;
}

// By default, will trigger the async promise directly; provide a #doRefresh API to refresh data.
// FIX-ME Need to support delay of requests, for frequent switches triggering multiple requests.
// Not Yet, because the time between switches are usually around 300 milliseconds.
// Yes, to set the delay over one second.
// Yes, because be powerful first and optimize for end uses later.
// FIX-ME Added delay, but the fetcher should be reset when the depends changed.
export const usePromiseFetcher = <T, E = Error>(doFetch: () => Promise<T>, depends: any[] = [], delay: number = 0): [IFetcher<T, E>, (noBlinking?: boolean) => any] => {
	const ref = React.useRef(true);
	// Guideline I: Do not synchronously update component state directly.
	const [fetcher, fetched, refreshing] = useFetcher<T, E>(depends, delay !== 0);
	// console.log('updating fetcher:', fetcher);
	const doRefresh = (noBlinking?: boolean): IFetcherRefer => {
		if (!noBlinking) {refreshing();}
		// console.log('refreshing/noBlinking', noBlinking);
		const _ref: IFetcherRefer = {active: true};
		doFetch().then(assets => {
			// ref: No update/setState call for unmount components.
			// _ref: No update/setState call for expired requests.
			ref.current && _ref.active && fetched(assets);
			// console.log('fetched(assets);', assets);
			return assets;
		}).catch(ex => {
			ref.current && _ref.active && fetched(undefined, ex);
			// console.log('failed to fetch:', ex);
			// Here, the exception hence is swallowed.
			// return ex;
		}).catch(() => {
			// Terminate the lifecycle of the current fetcher.
			_ref.active = false;
		});
		return _ref;
	};
	React.useEffect(() => {
		// Guideline II: Treat as initializing on the props changed.
		ref.current = true;
		// FIX-ME Cancel the request of same component with different dependencies.
		let _ref: IFetcherRefer | undefined;
		let timer: any;
		if (delay === 0) {
			// Initialization of the Target Component
			// Should not update state again, during the initialization process of the target component.
			// Reset of the Target Component, Requested by Dependencies
			// Should reset the fetcher explicitly, because the current fetcher holds an incorrect cache.
			// The process of initializing or resetting is the logically same, ignoring the mounting or unmounting of the target component.
			_ref = doRefresh(true);
		} else if (delay > 0) {
			timer = setTimeout(() => {
				// The call of refreshing() may be ignored for performance.
				// The state changes will be: 1. Initial => XX Initializing XX => 2. Fetched
				_ref = doRefresh();
				timer = undefined;
			}, delay);
		}
		return () => {
			ref.current = false;
			if (_ref) {_ref.active = false;}
			if (timer) {clearTimeout(timer);}
		};
	}, depends);
	return [fetcher, doRefresh];
};
