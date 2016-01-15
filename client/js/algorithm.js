// main algorithm, that updates each card with next time user needs to review it
// takes in 3 arguments: ef, quality of response, and number of times
// https://www.supermemo.com/english/ol/sm2.htm

// qFactor determined by frontend quiz, ranges from 0-5  (5 perfect, 0 bad)

function spacedRepetition(oldEasyF, qFactor, times, lastInterval){
	// lastInterval is lastInterval property on each review object

	if(oldEasyF<1.3) oldEasyF = 1.3;

	// dateNow is # ms since 1970 (universal time)
	var dateNow = new Date().getTime();
	// increment times person has reviewed card, so at least is 1
	times++;

	// # of ms in a day
	var msInDay = 86400000;


	var interval = calculateInterval();
	var dateNextReview = dateNow+interval*msInDay;
	var easyF = calculateEasyF();

	// object that is returned by program
	var nextReview = {
		easyF: easyF,
		interval: interval, // interval is in days
		dateNextReview: dateNextReview
	};

	// function to calculate new easiness factor
	function calculateEasyF(){
		return (oldEasyF - .8 + (.28*qFactor) - (.02*qFactor*qFactor));
	}

	// function to calculate interval (days) until next review
	function calculateInterval(){
		// algorithm says 1 and 6 days is interval for 1st and 2nd times
		if(times===1) return 1;
		else if(times===2) return 6;
		else if(times>2){
			return oldEasyF*lastInterval;
		}
	}

	return nextReview;
} // end spaced repetition whole function

