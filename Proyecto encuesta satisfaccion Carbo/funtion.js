

const phoneInput = window.intlTelInput(document.querySelector("#telefono"), {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    preferredCountries: ["co", "mx", "es", "us"],
    separateDialCode: true
});

document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const checkboxes = document.querySelectorAll('input[name="areas"]:checked');
    
    if (checkboxes.length === 0) {
        alert('Por favor, seleccione al menos un área.');
        return; 
    }

    const form = this;
    
    google.script.run.withSuccessHandler(showSuccessMessage).processForm(form);
});

function showSuccessMessage(response) {
    document.getElementById('successMessage').innerText = response; 
    document.getElementById('successMessage').style.display = 'block'; 
    document.getElementById('surveyForm').style.display = 'none';
}

function selectRating(groupId, button) {
    const group = document.getElementById(groupId);
    
    group.querySelectorAll('.rating-button').forEach(btn => {
        btn.classList.remove('selected');
        btn.classList.remove(`${groupId}-0`, `${groupId}-1`, `${groupId}-2`, `${groupId}-3`, `${groupId}-4`, `${groupId}-5`, `${groupId}-6`, `${groupId}-7`, `${groupId}-8`, `${groupId}-9`, `${groupId}-10`);
    });
    
    button.classList.add('selected');
    button.classList.add(`${groupId}-${button.innerText}`);

    if (groupId === "satisfaccion") {
        document.getElementById('satisfaccionValue').value = button.innerText; 
    } else if (groupId === "recomendacion") {
        document.getElementById('recomendacionValue').value = button.innerText; 
    }
}

document.getElementById('acceptBtn').addEventListener('click', function() {
   document.querySelector('button[type=submit]').style.display = 'block'; 
   document.getElementById('policySection').style.display = 'none'; 
});



document.getElementById("year").textContent = new Date().getFullYear();
