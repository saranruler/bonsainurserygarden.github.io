// Get the modal
var imageModal = document.getElementById('imageModal');
var shareModal = document.getElementById('shareModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == imageModal || event.target == shareModal) {
        imageModal.style.display = 'none';
        shareModal.style.display = 'none';
    }
};

// Get the modal
var imageModal = document.getElementById('imageModal');

const modalImg = document.getElementById('img01');
const captionText = document.getElementById('caption');

function openImageModal(e) {
    imageModal.style.display = 'block';
    modalImg.src = e.src;
    captionText.innerHTML = e.alt;
}

// Get the <span> element that closes the modal
const imageModalClose = document.getElementById('imageModalClose');

// When the user clicks on <span> (x), close the modal
imageModalClose.onclick = function() {
    imageModal.style.display = 'none';
};


// Get the modal
var shareModal = document.getElementById('shareModal');

function openShareModal(e, title) {
    if (navigator.share) {
        navigator.share({
                title,
                url: window.location.href,
            }).then(() => {
                console.log('Thanks for sharing!');
            })
            .catch(console.error);
    } else {
        shareModal.style.display = 'flex';
    }
}

// Get the <span> element that closes the modal
const shareModalClose = document.getElementById('shareModalClose');

// When the user clicks on <span> (x), close the modal
shareModalClose.onclick = function() {
    shareModal.style.display = 'none';
};


function handleWhatsappShare(e, cc) {
    const {
        value
    } = document.getElementById('whatsapp-input');
    if (value.length > 12) {        
        return false;
    }
    e.href = `https://wa.me/`+cc+`${document.getElementById('whatsapp-input').value}?text=${window.location.href}`;
}

function handleDirectWhatsappShare(e) {
    e.href = `whatsapp:\/\/send?text=${window.location.href}`;
}

function sendEnquiry111(ele, mailTo, fullName) {
    const name = document.getElementById('enquiryName');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    if(name.value != '') {
    	document.fileUploadForm.submit();
    } else {
    	alert("Name cannot be left empty. Please enter your name!");
    	name.focus();
    	return false;
    }
}

function fileValidation() { 
    var fileInput = document.getElementById('feedback_file'); 
      
    var filePath = fileInput.value; 
  
    // Allowing file type
    var allowedExtensions =  
            /(\.jpg|\.jpeg|\.png|\.doc|\.docx|\.gif|\.pdf|\.jpeg|\.tiff|\.tif|\.JFIF)$/i; 
      
    if (!allowedExtensions.exec(filePath)) { 
        alert('Invalid file type'); 
        fileInput.value = ''; 
        return false; 
    } else {
    	return true;
    }
} 

function sendEnquiry11(ele, mailTo, fullName) {
    const name = document.getElementById('enquiryName');
    const phoneNumber = document.getElementById('phoneNumber');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    var fileInput = document.getElementById('feedback_file'); 
    
    if(name.value != '') {
    	event.preventDefault();
        var form1 = $('#fileUploadForm')[0];
        var data = new FormData(form1);
        data.append("name", name.value);
        //data.append("phoneNumber", phoneNumber.value);
        data.append("name", name.value);
        //data.append("email", email.value);
        //data.append("message", message.value);
        data.append("mailTo", mailTo);
        data.append("fullName", fullName);
        data.append("userID", agentID);
        //$("#btnSubmit").prop("disabled", true);
    	
    	
    	ele.value = 'Sending...';
    	ele.disabled = true;
    	$.ajax({
            url: contextPath + '/api/v1/sendEnquiry',
            type: "POST",
            enctype: 'multipart/form-data',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,           
            success: function(result) {
            	alert('Success: Mail sent Successfuly');
                name.value = '';
                phoneNumber.value = '';
                email.value = '';
                message.value = '';
                ele.value = 'Send';
                fileInput.value = ''; 
                ele.disabled = false;
            },
            error: function(e) {
                //$("#result").text(e.responseText);
                console.log("ERROR : ", e);
                //$("#btnSubmit").prop("disabled", false);
                name.value = '';
                phoneNumber.value = '';
                email.value = '';
                message.value = '';
                fileInput.value = ''; 
                ele.value = 'Send';
                
                ele.disabled = false;
            }
        });
    } else {
    	alert("Name cannot be left empty. Please enter your name!");
    	name.focus();
    	return false;
    }
}

// Feedback code
const starRatingControl = new StarRating('.star-rating', {
    maxStars: 5,
});


function ValidateExtension() {
    var allowedFiles = [".doc", ".docx", ".pdf", ".jpg", ".jpeg", ".png", ".tiff", ".gif", ".tif"];
    var fileUpload = document.getElementById("feedback_file");
    var lblError = document.getElementById("lblError");
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (!regex.test(fileUpload.value.toLowerCase())) {
        lblError.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
        return false;
    }
    lblError.innerHTML = "";
    return true;
}

function sendFeedback(ele, cardId, fullName, emailID) {
    ele.value = 'Sending...';
    ele.disabled = true;
    const feedbackList = document.getElementsByClassName('feedback-list')[0];
    const rating = document.getElementById('rating');
    const name = document.getElementById('feedbackName');
    const feedback = document.getElementById('feedback');
    const feedback_file = document.getElementById('feedback_file');
    const data = {};
    data.cardId = cardId;
    data.rating = rating.value;
    data.name = name.value;
    data.feedback = feedback.value;
    
    $.ajax({
        url: contextPath + '/api/v1/feedback',
        data: {
            'cardId': cardId,
            'rating': rating.value,
            'name': name.value,
            'feedback': feedback.value,
            'mailTo': emailID,
            'fullName': fullName,
            'userID': agentID
        },
        success: function(result) {
        	alert('Success: Feedback Given Successfully');
        	ele.value = 'Give Feedback';
            ele.disabled = false;
            
            rating.value = '';
            name.value = '';
            feedback.value = '';
            feedback_file.value = '';
            
            var response = JSON.parse(result);
            // Pushing new feedback in the list
            const feedbackResponse = response.data.feedback;
            const newFeedback = `<div class="feedback-wrapper">
                <span class="feedback-name-wrapper"><span class="feedback-name">${feedbackResponse.name}</span> on ${feedbackResponse.date} </span>
                <div><span class="gl-star-rating-stars s${feedbackResponse.rating}0"><span data-value="1" data-text="Terrible"></span><span data-value="2" data-text="Poor"></span><span data-value="3" data-text="Average"></span><span data-value="4" data-text="Very Good"></span><span data-value="5" data-text="Excellent"></span></span></div>
                <div>${feedbackResponse.feedback}</div>
                <hr />
            </div>`;
            feedbackList.insertAdjacentHTML('afterbegin', newFeedback);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    let deferredPrompt;
    const saveBtn = document.querySelector('.save-card-button');
    saveBtn.style.display = 'none';

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        saveBtn.style.display = 'block';

        saveBtn.addEventListener('click', (e) => {
            // hide our user interface that shows our A2HS button
            saveBtn.style.display = 'none';
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    });
});