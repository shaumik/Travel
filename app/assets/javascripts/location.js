$(document).ready(function(){
	$("#location_button").click(function(){
		//alert("click");
		getLocation();
	});

	$.ajaxSetup({
		headers:{'X-CSTF-Token': $('meta[name="csrf-token"]').attr('content')}
	});

	function onError(msg){
		switch(error.code){
			case error.PERMISSION_DENIED:
				alert("User denied the permission");
				break;
			case error.POSITION_UNAVAILABLE:
				alert("Location is unavailable");
				break;
			case error.TIMEOUT:
				alert("The request to get location timed out. Please try again");
				break;
			case error.UNKNOWN_ERROR:
				alert("Unknown error occurred. Please Try again");
				break;
		}
	}
	
	function onSuccess(pos){
		//alert("ajax call");
		param = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
		//alert(pos.coords.latitude);
		$.ajax({
			type: 'POST',
			url: 'location',
			beforeSend: function(xhr){
				xhr.setRequestHeader('X-CSRF-Token',
									 $('meta[name="csrf-token"]').attr('content'));
			},
			data: param,
			success: ajaxSuccess
		});
	}
	
	function ajaxSuccess(data, status, jqXHR){
		
	}
	
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				onSuccess,
				onError,
				{
					enableHighAccuracy: true,
					timeout: 20000,
					maximumAge: 25000
				}
				);
		} else {
			alert("Your browser does not support geolocation");
		}
	}
})
