//toggle icon navbar
let menuIcon = document.querySelector ("#menu-icon");
let navbar = document.querySelector (".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle ("bx-x");
    navbar.classList.toggle ("active");

}

// scroll section
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector ("header nav a[href*= " + id + "]").classList.add("active");
            });
            // active section for animation on scroll
            sec.classList.add("show-animate");
        }
        // if want to use animation that repats on scroll use this
     else {
            sec.classList.remove("show-animate");

        }
    });
    // sticky header
    let header = document.querySelector ("header");

    header.classList.toggle("sticky", window.scrollY > 100);

    // remove toggle icon and navbar links (scroll)
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");

    // animation footer on
    let footer = document.querySelector("footer");

    footer.classList.toggle("show-animate", this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}


document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();  // Verhindert das Standardformularverhalten
    
    var form = e.target;
    var formData = new FormData(form);
    
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById("form-message").innerHTML = "Thank you for your message! We will get back to you soon.";
            form.reset();
        } else {
            response.json().then(data => {
                document.getElementById("form-message").innerHTML = data.message || "Oops! There was a problem submitting your form.";
            });
        }
    }).catch(error => {
        document.getElementById("form-message").innerHTML = "There was a problem submitting your form. Please try again.";
    });
});