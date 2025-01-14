// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) { // Check if the section exists
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


function updateLogo() {
    const logo = document.querySelector('.TVD');

    if (window.innerWidth <= 350) {
        logo.src = 'otherComponent/Tivenda Logo Mobile Mini.png';
        logo.style.width = '45px';
    } else if (window.innerWidth <= 600) {
        logo.src = 'otherComponent/Tivenda Logo Mobile.png';
        logo.style.width = '160px';
    } else if (window.innerWidth <= 1010) {
        logo.src = 'otherComponent/Tivenda Logo Web.png';
        logo.style.width = '250px';
    } else {
        logo.src = 'otherComponent/Tivenda Logo Web.png';
        logo.style.width = '260px';
    }
}

updateLogo();

window.addEventListener('resize', updateLogo);



// Function to check if a portion of the element is in the viewport
function isElementInViewport(el, threshold = 0) {
    if (!el) {
        console.error('Element is null or undefined');
        return false; // Return false if the element does not exist
    }

    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // Check if the element is at least partially visible
    return (
        rect.top + rect.height * threshold < windowHeight && // Top of the element is above the bottom of the viewport
        rect.bottom - rect.height * threshold > 0 && // Bottom of the element is below the top of the viewport
        rect.left + rect.width * threshold < windowWidth && // Left of the element is to the right of the viewport
        rect.right - rect.width * threshold > 0 // Right of the element is to the left of the viewport
    );
}

// Function to add the 'anim' class when the element is in the viewport
function checkVisibility() {
    const contentServices = document.querySelectorAll('.contentService');
    const rightServiceContainer = document.querySelector('.rightServiceContainer');
    const titleServices = document.querySelector('.title');

    const invertLine = document.querySelectorAll('.invertLine');
    const titleProducts = document.querySelectorAll('.titleText2');
    const line = document.querySelectorAll('.line');
    const content2Info = document.querySelector('.content2Info');

    const productList = document.querySelectorAll('.just-for-animation');

    // Check if titleServices exists before checking its visibility
    if (titleServices && isElementInViewport(titleServices, 0.3)) {
        titleServices.classList.add('anim');
    }

    contentServices.forEach(contentService => {
        if (isElementInViewport(contentService, 0.4)) {
            contentService.classList.add('anim');
        }
    });

    // Check if rightServiceContainer exists before checking its visibility
    if (rightServiceContainer && isElementInViewport(rightServiceContainer, 0.3)) {
        rightServiceContainer.classList.add('anim3');
    }

    invertLine.forEach(invertLine => {
        if (isElementInViewport(invertLine, 0.3)) {
            invertLine.classList.add('anim');
        }
    });

    titleProducts.forEach(titleProducts => {
        if (isElementInViewport(titleProducts, 0.3)) {
            titleProducts.classList.add('anim-vm');
        }
    });

    line.forEach(line => {
        if (isElementInViewport(line, 0.3)) {
            line.classList.add('anim3');
        }
    });

    // Check if content2Info exists before checking its visibility
    if (content2Info && isElementInViewport(content2Info, 0.3)) {
        content2Info.classList.add('anim-vm');
    }

    productList.forEach(productList => {
        if (isElementInViewport(productList, 0.5)) {
            productList.classList.add('anim-vm');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

checkVisibility();

document.addEventListener('DOMContentLoaded', function () {
    checkVisibility(); // Call checkVisibility after DOM is loaded
});




// ----------------------------------- LANGUAGE DROPDOWN -----------------------------------
function showLanguage() {
    const dropdown = document.getElementById('dropdownMenu');
    const globeContainer = document.getElementById('globeContainer');

    // Toggle the dropdown visibility
    dropdown.classList.toggle('show');

    // Add or remove the hover class based on dropdown visibility
    if (dropdown.classList.contains('show')) {
        globeContainer.classList.add('hover'); // Add hover class
    } else {
        globeContainer.classList.remove('hover'); // Remove hover class
    }
}

function hideLanguage() {
    const dropdown = document.getElementById('dropdownMenu');
    const globeContainer = document.getElementById('globeContainer');

    dropdown.classList.remove('show');
    globeContainer.classList.remove('hover'); // Ensure hover class is removed
}

// Function to handle clicks outside the dropdown
function handleClickOutside(event) {
    const dropdown = document.getElementById('dropdownMenu');
    const globeContainer = document.getElementById('globeContainer'); // Reference to the element that triggers the dropdown

    // Check if the click was outside the dropdown and the globeContainer
    if (!dropdown.contains(event.target) && !globeContainer.contains(event.target)) {
        hideLanguage();
    }
}

document.addEventListener('click', handleClickOutside);



// ----------------------------------- SIDEBAR MENU -----------------------------------
let isSidebarOpen = false;
let isPopupOpen = false;

const SIDEBAR_HIDE_TIMEOUT = 200;
const POPUP_CLOSE_TIMEOUT = 300;

const overlay = document.querySelector('.overlay-background');
const popup = document.querySelector('.popup-mats');

function showOverlay() {
    overlay.classList.add('active');
}

function hideOverlay() {
    overlay.classList.remove('active');
}

function showSidebar() {
    const sidebar = document.querySelector('.sidebarMenu');
    sidebar.classList.add('open');
    showOverlay();
    document.body.classList.add('sidebar-open');
    document.body.classList.add('no-scroll'); // Disable scrolling
    isSidebarOpen = true;
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebarMenu');
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    document.body.classList.remove('no-scroll'); // Enable scrolling

    // Wait for the animation to finish before hiding the overlay
    setTimeout(hideOverlay, SIDEBAR_HIDE_TIMEOUT);
    isSidebarOpen = false;
}

function handleOverlayClick() {
    if (isSidebarOpen) {
        hideSidebar();
    } else if (isPopupOpen) {
        closeMaterialInfo(); // Close the popup if it's open
    }
}

// Function to toggle the sidebar
function toggleSidebar() {
    if (isSidebarOpen) {
        hideSidebar();
    } else {
        showSidebar();
    }
}

// Function to handle window resize
function handleResize() {
    if (window.innerWidth > 1010 && isSidebarOpen) {
        hideSidebar(); // Close the sidebar if the width exceeds 1010px
    }
}

// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Attach overlay click event
    overlay.addEventListener('click', handleOverlayClick);
});

function openMaterialInfo(element) {
    // Get the parent li element
    const listItem = element.closest('li');

    // Get the image, description, and title from data attributes
    const imageSrc = listItem.getAttribute('data-image');
    const description = listItem.getAttribute('data-description');
    const title = listItem.getAttribute('data-title');
    const highlightPhrase = listItem.getAttribute('data-highlight-phrase');

    // Update the popup content
    const popupImage = popup.querySelector('.popup-mats-material-image');
    const popupDescription = popup.querySelector('.mats-description-container p');
    const popupTitle = popup.querySelector('.mats-description-title h2');

    // Check if the description starts with the highlight phrase
    let highlightedDescription = description;
    if (description.startsWith(highlightPhrase)) {
        highlightedDescription = `<span class="colorBold2" style="color: #2D3191;">${highlightPhrase}</span>` + description.slice(highlightPhrase.length);
    }

    // Set the popup content
    popupImage.src = imageSrc;
    popupDescription.innerHTML = highlightedDescription;
    popupTitle.innerHTML = title;

    // Show the popup and overlay
    popup.classList.add('open');
    showOverlay();
    document.body.classList.add('no-scroll'); // Disable scrolling when popup is open
    isPopupOpen = true;
}

function closeMaterialInfo() {
    popup.classList.add('disappear');

    // Wait for the animation to complete before hiding the popup
    setTimeout(() => {
        popup.classList.remove('open');
        hideOverlay();
        popup.classList.remove('disappear');
        document.body.classList.remove('no-scroll'); // Enable scrolling when popup is closed
        isPopupOpen = false;
    }, POPUP_CLOSE_TIMEOUT);
}

// Close the popup when clicking outside of the popup content
window.onclick = function (event) {
    if (event.target === overlay) {
        closeMaterialInfo();
    }
}

function attachClickEvent() {
    const matsListItems = document.getElementsByClassName("popup-smaller-screen");

    // Convert HTMLCollection to an array and loop through each item
    Array.from(matsListItems).forEach(item => {
        // Remove any existing click event listeners
        item.onclick = null; // Clear previous event listener

        // Check the current screen width
        if (window.innerWidth <= 705) {
            item.onclick = function () {
                openMaterialInfo(this);
            };
        }
    });
}

// Add event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    attachClickEvent(); // Attach click event on load

    // Add a resize event listener to handle window resizing
    window.addEventListener("resize", attachClickEvent); // Re-attach click events based on new width

    // Attach overlay click event
    overlay.addEventListener('click', handleOverlayClick);
});





function openPopup(popupId, productName, content) {
    const popup = document.getElementById(popupId);
    const overlay = document.querySelector('.overlay-background');
    const imageGallery = document.getElementById('imageGallery');
    const popupTitle = popup.querySelector('.popup-content-top h2');
    const imageGalleryContainer = document.querySelector('.image-gallery-container');

    // Clear existing images
    imageGallery.innerHTML = '';

    // Set the popup title
    popupTitle.textContent = productName;

    // Check if the product is Hangar Press or Shopping Bag
    if (productName === 'Hangar Press' || productName === 'Shopping Bag') {
        // Create a text element for the content
        const textElement = document.createElement('h3');
        textElement.textContent = content;
        textElement.style.textAlign = 'center'; // Center the text
        imageGallery.appendChild(textElement);

        // Add a class to center the gallery
        imageGalleryContainer.classList.add('centered-gallery');
        imageGallery.classList.add('centered-text');
    } else {
        // If content is an array (for images)
        if (Array.isArray(content)) {
            content.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = productName;
                imageGallery.appendChild(img);
            });
        }

        // Remove the centering class if it was previously added
        imageGalleryContainer.classList.remove('centered-gallery');
    }

    // Show the popup and overlay
    popup.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    isPopupOpen = true; // Track that the popup is open
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.querySelector('.overlay-background');
    const imageGallery = document.getElementById('imageGallery');
    const imageGalleryContainer = document.querySelector('.image-gallery-container');

    popup.classList.add('disappear');

    // Wait for the animation to complete before hiding the popup
    setTimeout(() => {
        popup.classList.remove('open');
        popup.classList.remove('disappear');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        isPopupOpen = false;

        // Reset the image gallery to its original state
        imageGallery.classList.remove('centered-text');
        imageGallery.innerHTML = '';
        imageGalleryContainer.classList.remove('centered-gallery');
    }, 300);
}

function handleOverlayClick() {
    if (isSidebarOpen) {
        hideSidebar();
    } else if (isPopupOpen) {
        closePopup('popupProduct'); // Close the popup if it's open
    }
}

// Attach the overlay click handler
document.querySelector('.overlay-background').addEventListener('click', handleOverlayClick);








// let clickEventsAttached = false; // Flag to track if click events are attached

// function openMaterialInfo(element) {
//     const popup = document.querySelector('.popup-mats');
//     const overlay = document.querySelector('.overlay-background');

//     // Get the parent li element
//     const listItem = element.closest('li');

//     // Get the image, description, and title from data attributes
//     const imageSrc = listItem.getAttribute('data-image');
//     const description = listItem.getAttribute('data-description');
//     const title = listItem.getAttribute('data-title'); // Get the title
//     const highlightPhrase = listItem.getAttribute('data-highlight-phrase'); // Get the phrase to highlight

//     // Update the popup content
//     const popupImage = popup.querySelector('.popup-mats-material-image');
//     const popupDescription = popup.querySelector('.mats-description-container p');
//     const popupTitle = popup.querySelector('.mats-description-title h2'); // Select the h2 element

//     // Check if the description starts with the highlight phrase
//     let highlightedDescription = description;
//     if (description.startsWith(highlightPhrase)) {
//         highlightedDescription = `<span class="colorBold2" style="color: #2D3191;">${highlightPhrase}</span>` + description.slice(highlightPhrase.length);
//     }

//     // Set the popup content
//     popupImage.src = imageSrc; // Set the image source
//     popupDescription.innerHTML = highlightedDescription; // Set the description text with HTML
//     popupTitle.innerHTML = title; // Set the title in the h2 element

//     // Show the popup and overlay
//     popup.classList.add('open');
//     overlay.style.display = 'block'; // Ensure the overlay is displayed
// }

// const BREAKPOINT = 705;

// function attachClickEvent() {
//     if (clickEventsAttached) return; // Prevent re-attaching events

//     console.log('Attaching click events...');
//     const matsListItems = document.querySelectorAll('.popup-smaller-screen');

//     matsListItems.forEach(item => {
//         console.log('Attaching click event to:', item); // Log the item being processed
//         if (window.innerWidth <= BREAKPOINT) {
//             item.addEventListener('click', () => {
//                 console.log('Item clicked:', item); // Log when the item is clicked
//                 openMaterialInfo(item);
//             });
//         } else {
//             const button = item.querySelector('.btnV2-material');
//             if (button) {
//                 button.addEventListener('click', event => {
//                     event.stopPropagation();
//                     console.log('Button clicked:', button); // Log when the button is clicked
//                     openMaterialInfo(button);
//                 });
//             }
//         }
//     });

//     clickEventsAttached = true; // Set the flag to true after attaching events
// }

// // Add event listener for DOMContentLoaded
// document.addEventListener("DOMContentLoaded", function () {
//     attachClickEvent(); // Attach click event on load

//     // Add a resize event listener to handle window resizing
//     window.addEventListener("resize", () => {
//         clickEventsAttached = false; // Reset the flag on resize
//         attachClickEvent(); // Re-attach click events based on new width
//     });
// });

// function closeMaterialInfo() {
//     const popup = document.querySelector('.popup-mats');
//     const overlay = document.querySelector('.overlay-background');

//     popup.classList.add('disappear'); // Add the disappear class for exit animation

//     // Wait for the animation to complete before hiding the popup
//     setTimeout(() => {
//         popup.classList.remove('open'); // Remove the open class
//         overlay.style.display = 'none'; // Hide the overlay
//         popup.classList.remove('disappear'); // Ensure disappear class is removed
//     }, 300); // Adjust this timeout to match the duration of your CSS animation
// }

// // Close the popup when clicking outside of the popup content
// window.onclick = function (event) {
//     const popup = document.querySelector('.popup-mats');
//     const overlay = document.querySelector('.overlay-background');
//     if (event.target === overlay) {
//         closeMaterialInfo();
//     }
// }

// // Initial call to set the correct text on page load
// updateButtonText();

// // Add event listener to update text on window resize
// window.addEventListener('resize', updateButtonText);






// Function to scroll to the top of the page when it loads
window.onload = function () {
    window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
    const globeContainer = document.querySelector('.globeContainer');
    const dropdown = document.querySelector('.dropdown');

    globeContainer.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click event from bubbling up
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block'; // Toggle dropdown visibility

        // Toggle the active class
        globeContainer.classList.toggle('active');
    });

    // Close the dropdown if clicking outside of it
    document.addEventListener('click', function () {
        dropdown.style.display = 'none'; // Hide dropdown
        globeContainer.classList.remove('active'); // Remove the active class
    });
});



