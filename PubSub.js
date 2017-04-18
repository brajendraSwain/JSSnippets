class PubSub() {

	constructor() {
		this._uId = 0;
		this._subjectMap = {};
		// making it singleton
		if(!this._instance) {
			this._instance = new PubSub();
		}
		return this._instance;
	}

	subscribe(subject, callback) {
		if(!this._subjectMap[subject]) {
			this._subjectMap[subject] = [];
		}
		let subscriberToken = {
			_id: (++this._uId++).toString(),
			_subject: subject
		}; 
		this._subjectMap[subject].push(Object.assign({}, subscriberToken, { callback: callback }));
		return subscriberToken;
	}

	publish(subject, value) {
		let subArrLen = this._subjectMap[subject] ? this._subjectMap[subject].length : 0;
		if(!subArrLen) {
			console.error("no subsribers or invalid subject");
			return false;
		}
		while (subArrLen--) {
			setTimeout(() => {
				subArr[subArrLen].callback(value);
			}, 0);
		}
		return true;
	}

	publishSync(subject, value) {
		let subArrLen = this._subjectMap[subject] ? this._subjectMap[subject].length : 0;
		if(!subArrLen) {
			console.error("no subsribers or invalid subject");
			return false;
		}
		while (subArrLen--) {
			subArr[subArrLen].callback(value);
		}
		return true;
	}

	unSubscribe(subscriberToken) {
		let subcribeIndex = this._subjectMap[subscriberToken._subject] ? this._subjectMap[subscriberToken._subject].findIndex(o => o._token === subscriberToken._token) : -1;
		if(subcribeIndex < 0) {
			console.error("no subsribers subscribed for this token");
			return false;
		}
		this._subjectMap[subscriberToken._subject].splice(subcribeIndex, 1);
		return true;
	}

	unSubscribeAll() {
		this._subjectMap = {};
		return true;
	}

}