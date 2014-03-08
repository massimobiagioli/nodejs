function counter(jq, selector) {
	var h,
		m,
		s,
		interval;
	
	function pad(value, length) {
	    return (value.toString().length < length) ? pad("0" + value, length) : value;
	}
	
	var updateDisplay = function() {
		jq(selector).html("" + h + ":" + pad(m, 2) + ":" + pad(s, 2));
	};
	
	var reset = function() {
		h = 0;
		m = 0;
		s = 0;
		updateDisplay();
	};
	
	var start = function() {
		interval = setInterval(function() {
			s += 1;
			if (s == 60) {
				s = 0;
				m += 1;
			}
			if (m == 60) {
				m = 0;
				h += 1;
			}
			
			updateDisplay();
		}, 1000);
	};
	
	var stop = function() {
		clearInterval(interval);
	};
	
	reset();
	
	return {
		start: start,
		stop: stop,
		reset: reset
	};
};