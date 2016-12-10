//test to see if lbs radio is filled
(function micCheck() {
    var hid = document.getElementById("hid").value;
    var lbs = document.getElementsByName("lbs");
    if (hid === '0') {
        lbs[1].checked = true;
    }
	if (hid == 1) {
        lbs[0].checked = true;
    }
    
})();