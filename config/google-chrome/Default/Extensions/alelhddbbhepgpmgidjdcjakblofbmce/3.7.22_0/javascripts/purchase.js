function getPurchases(){console.log("google.payments.inapp.getPurchases"),google.payments.inapp.getPurchases({parameters:{env:"prod"},success:onLicenseUpdate,failure:onLicenseUpdateFail})}function onLicenseUpdate(a){var b=a.response.details,c=b.length;if(c>0)for(var d=0;c>d;d++)if("capture_desktop_window"===b[d].sku){localStorage.capture_desktop="true",document.querySelector("#no-purchase").style.display="none",document.querySelector("#purchased").style.display="block";break}}function onLicenseUpdateFail(a){console.log("onSkuDetailsFailed",a)}function getSkuDetails(){console.log("google.payments.inapp.getSkuDetails"),google.payments.inapp.getSkuDetails({parameters:{env:"sandbox"},success:onSkuDetails,failure:onSkuDetailsFailed})}function onSkuDetails(a){console.log(a)}function onSkuDetailsFailed(a){console.log("onSkuDetailsFailed",a)}function buy(a){a.preventDefault();var b="capture_desktop_window";google.payments.inapp.buy({parameters:{env:"prod"},sku:b,success:onPurchase,failure:onPurchaseFail})}function donate(a){a.preventDefault();var b="donate";google.payments.inapp.buy({parameters:{env:"prod"},sku:b,success:onPurchase,failure:onPurchaseFail})}function onPurchaseFail(a){console.log("failed: ",a)}function onPurchase(a){console.log("success: ",a),getPurchases()}document.querySelector("#donate").addEventListener("click",donate,!1),document.querySelector("#purchase").addEventListener("click",buy,!1),localStorage.capture_desktop&&"true"==localStorage.capture_desktop&&(document.querySelector("#no-purchase").style.display="none",document.querySelector("#purchased").style.display="block");