
'use strict'
// IIFE - Immediately Invoked Function Expression
var appModule = (function($, helperModule) {

	// The $ is now locally scoped
	var productData = {},
		apiUrl = 'https://gist.githubusercontent.com/arvin09/d276580bbbc86df710b71e3c23a6d93f/raw/880589c7fb6abd61e5f1557bd4574fbb9fcfa530/products.json';

	// Listen for the jQuery ready event on the document
	$(function() {

		// The DOM is ready!
		helperModule.getApiData(apiUrl,'GET')
			.done(function(response) {
				productData = JSON.parse(response);
				console.log(productData);
				initialize();
				getscrollUpDown();
				scrolltoTop();
			});

		$('#myModal').on('show.bs.modal', function (e) {
			var image = $(e.relatedTarget).attr('src');
			$('.img-responsive').attr('src', image);
		});

		
	});

	// The rest of the code goes here!

	function getscrollUpDown()
	{
           $('body').scrollspy({target: ".navbar", offset: 50});   

            // Add smooth scrolling on all links inside the navbar
           $("#myNavbar a,footer a[href='#myPage']").on('click', function(event) {
             // Make sure this.hash has a value before overriding default behavior
             if (this.hash !== "") {
                 // Prevent default anchor click behavior
               event.preventDefault();

             // Store hash
              var hash = this.hash;

               // Using jQuery's animate() method to add smooth page scroll
              // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
             $('html, body').animate({
               scrollTop: $(hash).offset().top
               }, 800, function(){
   
          // Add hash (#) to URL when done scrolling (default click behavior)
           window.location.hash = hash;
      });
    }  // End if
  });
  
   $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });            
	
   }
	
	
	
  function scrolltoTop()
	{ 
        window.onscroll = function() {scrollFunction()};

           function scrollFunction() {
               if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("myBtn").style.display = "block";
        } 
	   else {
          document.getElementById("myBtn").style.display = "none";
        }
      }
	}
	
	
	function initialize(){
		loadProducts('1');
	}

	function getSelectedProduct(event,type)
	{
		var selectedProduct = $(event.currentTarget).parent().parent().data('product');
		if(type === 'modal'){
			$('.modal-title').html(selectedProduct.name);
		}else{
			// code for button goes here
		}
		console.info(selectedProduct);
		console.info(type);
	}

	function loadProducts(categoryId){
		var productHTML = '',
			productContainer = $('.product-container');
			var selectedProduct = productData['category'+ categoryId];

		$.each(selectedProduct, function(index,prodObject){
			productHTML += '<div class="col-lg-4 col-md-6 mb-4"><div class="card'+index+' h-100">';
			productHTML += '<a href="#"><img class="card-img-top img-fluid" id="6" onclick="appModule.getSelectedProduct(event,\'modal\')" data-toggle="modal" data-target="#myModal"';
			productHTML += 'src="http://tympanus.net/Tutorials/CaptionHoverEffects/images/'+ prodObject.imageUrl +'" alt="'+ prodObject.imageUrl +'"></a>';
			productHTML += '<div class="card-block"><h4 class="card-title"><a href="#">'+ prodObject.name +'</a></h4><h5>$24.99</h5>';
			productHTML += '<p class="card-text">'+ prodObject.description +'</p></div>';
			productHTML += '<div class="card-footer">';
			productHTML += '<button type="button" onclick="appModule.getSelectedProduct(event,\'button\')" class="btn btn-info"><span class="fa fa-envelope"></span> Enquire</button>';
			productHTML += '</div></div></div>';
		});

		productContainer.html(productHTML);

		$.each(selectedProduct, function(index,prodObject){
			$('.card'+index).data('product',prodObject);
		});
	}

	return {
		getSelectedProduct: getSelectedProduct,
		loadProducts: loadProducts
	};

}(window.jQuery, helperModule));
// The global jQuery object is passed as a parameter