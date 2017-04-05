// IIFE - Immediately Invoked Function Expression
var appModule = (function($, helperModule) {

	// The $ is now locally scoped
	var productData = {},
		apiUrl = "https://gist.githubusercontent.com/arvin09/d276580bbbc86df710b71e3c23a6d93f/raw/880589c7fb6abd61e5f1557bd4574fbb9fcfa530/products.json";

	// Listen for the jQuery ready event on the document
	$(function() {

		// The DOM is ready!
		helperModule.getApiData(apiUrl,'GET')
			.done(function(response) {
				productData = JSON.parse(response);
				console.log(productData);
				initialize();
			});

		$('#myModal').on('show.bs.modal', function (e) {
			var image = $(e.relatedTarget).attr('src');
			$(".img-responsive").attr("src", image);
		});

	});

	// The rest of the code goes here!

	function initialize(){
		loadProducts('1');
	}

	function getEnquireDetail(event){
		var selectedProduct = $(event.currentTarget).data('product')
		console.log(selectedProduct);
	}

	function loadProducts(categoryId){
		var productHTML = "",
			productContainer = $('.product-container');
			var selectedProduct = productData['category'+ categoryId];

		$.each(selectedProduct, function(index,prodObject){
			productHTML += "<div class='col-lg-4 col-md-6 mb-4'><div class='card h-100'>";
			productHTML += "<a href='#'><img class='card-img-top img-fluid' id='6' data-toggle='modal' data-target='#myModal'";
			productHTML += "src='http://tympanus.net/Tutorials/CaptionHoverEffects/images/"+ prodObject.imageUrl +"' alt='"+ prodObject.imageUrl +"'></a>";
			productHTML += "<div class='card-block'><h4 class='card-title'><a href='#''>"+ prodObject.name +"</a></h4><h5>$24.99</h5>";
			productHTML += "<p class='card-text'>"+ prodObject.description +"</p></div>"
			productHTML += "<div class='card-footer'>"
			productHTML += "<button type='button' data-product='"+ JSON.stringify(prodObject) +"' onclick='myModule.getEnquireDetail(event)' class='btn btn-info'><span class='fa fa-envelope'></span> Enquire</button>"
			productHTML += "</div></div></div>"
		});

		productContainer.html(productHTML);
	}

	return {
		getEnquireDetail: getEnquireDetail,
		loadProducts: loadProducts
	}

}(window.jQuery, helperModule));
// The global jQuery object is passed as a parameter

