
window.openNav = function() {
    document.getElementById("sidebar-menu").style.width = "250px"; 
};

function closeNav() {
    document.getElementById("sidebar-menu").style.width = "0";
}

document.addEventListener('DOMContentLoaded', () => {
    
    const closeBtn = document.querySelector('.sidebar .closebtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNav);
    }
});