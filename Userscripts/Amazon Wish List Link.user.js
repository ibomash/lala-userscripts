// ==UserScript==
// @name        Amazon Wish List Link
// @namespace   http://fluidapp.com
// @description Adds "Add to wish list" link to album pages
// @include     *
// @author      Adam Nolley
// @version     1.0.1
// ==/UserScript==

if (typeof jQuery == "undefined") {
	// Include jQuery and set it up in noConflict mode so it doesn't override $(), which Lala has already defined
	window.fluid.include(window.fluid.userscriptPath + 'jquery-1.2.6.min.js');
	
	if (typeof jQuery == "undefined" && !window.__lala_WishList_jQueryWarned) {
		window.__lala_WishList_jQueryWarned = true;
		alert("Unable to load jQuery. The Amazon Wish List Link userscript will not function without it. Please download the full Lala userscript package from nanovivid.com.");
	} else {
		jQuery.noConflict();
	}
}

if (MyMusic && !MyMusic.prototype._lala_WishList_doneLoadingPageOld && typeof jQuery != "undefined") {
	MyMusic.prototype._lala_WishList_doneLoadingPageOld = MyMusic.prototype._doneLoadingPage;
	
	MyMusic.prototype._doneLoadingPage = function() {
		
		// Delaying the check for whether #shareLinks exists by a bit because it was randomly failing otherwise
		setTimeout(function() {
			// Make sure we're on an album page and that we haven't already added the link
			if (jQuery("#shareLinks").is("*") && !jQuery("#shareLinks a.universalWishlistLink").is("*")) {
				
				jQuery(
					'<span style="display: block"></span>'
				).append(
					'<a class="mjn_10 universalWishlistLink" href="javascript: void 0">Add to wish list</a>'
				).bind("click", function() {
					
					// This code comes from the bookmarklet at http://www.amazon.com/wishlist/universal/ref=cm_wl_uwl
					var w=window;
					var l=w.location;
					var d=w.document;
					var s=d.createElement('script');
					var e=encodeURIComponent;
					var x='undefined';
					var u='http://www.amazon.com/gp/wishlist/add';
					
					if(typeof s!='object')
						l.href=u+'?u='+e(l)+'&t='+e(d.title);
						
					function g(){
						if(d.readyState&&d.readyState!='complete'){
							setTimeout(g,200);
						} else {
							if (typeof AUWLBook == x) {
								s.setAttribute('src',u+'.js?loc='+e(l)),d.body.appendChild(s);
							}
							
							function f(){
								(typeof AUWLBook==x)?setTimeout(f,200):AUWLBook.showPopover();
							}
							f();
					    }
					}
					g();
					return false;
				}
				).andSelf(
				).appendTo(
					"#shareLinks"
				);
			}
		}, 700);
		
		
		MyMusic.g._lala_WishList_doneLoadingPageOld();
	}
}


/*

jQuery(document).ready(function() {
	
		
	// Delaying the check for whether #shareLinks exists by a bit because it was randomly failing otherwise
	setTimeout(function() {
		
		// Make sure we're on an album page and that we haven't already added the link
		if (jQuery("#shareLinks").is("*") && !jQuery("#__universalWishlistLink").is("*")) {
			
			jQuery(
				'<span style="display: block"></span>'
			).append(
				'<a id="__universalWishlistLink" class="mjn_10" href="javascript: void 0">Add to wish list</a>'
			).bind("click", function() {
				
				// This code comes from the bookmarklet at http://www.amazon.com/wishlist/universal/ref=cm_wl_uwl
				var w=window;
				var l=w.location;
				var d=w.document;
				var s=d.createElement('script');
				var e=encodeURIComponent;
				var x='undefined';
				var u='http://www.amazon.com/gp/wishlist/add';
				
				if(typeof s!='object')
					l.href=u+'?u='+e(l)+'&t='+e(d.title);
					
				function g(){
					if(d.readyState&&d.readyState!='complete'){
						setTimeout(g,200);
					} else {
						if (typeof AUWLBook == x) {
							s.setAttribute('src',u+'.js?loc='+e(l)),d.body.appendChild(s);
						}
						
						function f(){
							(typeof AUWLBook==x)?setTimeout(f,200):AUWLBook.showPopover();
						}
						f();
				    }
				}
				g();
				return false;
			}
			).andSelf(
			).appendTo(
				"#shareLinks"
			);
		}
	}, 100);
});*/