// --- Matrix Terminal Animation ---

const terminalText = [
    "Hi, I'm Jared 🐺👋",
    "Welcome to my portfolio!",
    "Click the buttons above to learn more about me.",
    "Enjoy your visit! 😊",
    "LinkedIn: https://www.linkedin.com/in/jared-butler-0b1a4b1b2/",
    "GitHub: https://github.com/JrockWolf",
    "Email: JaredButler@workmail.com",
    "Feel free to reach out for collaboration or just to say hi! Would love to hear from you or just chat about tech.",
];

// Get the terminal container
let terminal = document.getElementById('terminal');

// Create a new div for terminal text animation, after the photo
let terminalTextDiv = document.createElement('div');
terminalTextDiv.id = 'terminal-text';
terminal.appendChild(terminalTextDiv);

let line = 0, char = 0;

function typeLine() {
    if (line < terminalText.length) {
        if (char < terminalText[line].length) {
            terminalTextDiv.innerHTML += terminalText[line][char++];
            setTimeout(typeLine, 30);
        } else {
            terminalTextDiv.innerHTML += "<br>";
            line++; char = 0;
            setTimeout(typeLine, 500);
        }
    }
}

// Start typing animation after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    typeLine();
});

// --- Popup Window Logic ---
const popups = {};

function openPopup(type) {
    if (popups[type]) return; // Prevent duplicate

    const popup = document.createElement('div');
    popup.className = 'window-popup';
    popup.innerHTML = `
        <div class="window-header" onmousedown="startDrag(event, this.parentElement)">
            <h3>${capitalize(type)}</h3>
            <button onclick="closePopup('${type}')">&times;</button>
        </div>
        <div class="window-content">${getPopupContent(type)}</div>
    `;
    document.getElementById('popup-container').appendChild(popup);
    popups[type] = popup;
    // Center popup
    popup.style.left = `50vw`;
    popup.style.top = `100px`;
}

function closePopup(type) {
    if (popups[type]) {
        popups[type].remove();
        delete popups[type];
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPopupContent(type) {
    if (type === 'about') {
        return `
            <p>
                <strong>Hello!</strong> I'm <b>Jared Butler</b>, a Black and Italian college student at Rider University, majoring in Computer Science and a minor in Cybersecurity, with a deep passion for technology and IT.<br>
                I thrive on solving problems, learning new systems, and building cool things.<br>
                I'm highly skilled across all major operating systems and love tinkering with servers and networks.<br>
                My goal is to create innovative solutions that make a difference witin the tech community.
            </p>
            <div class="os-grid">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" class="os-icon" title="Windows" alt="Windows">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" class="os-icon" title="Linux" alt="Linux">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" class="os-icon" title="macOS" alt="macOS">
            </div>
        `;
    }
    if (type === 'skills') {
        return `
            <div class="skill-grid">
                <div class="skill-chip">HTML</div>
                <div class="skill-chip">CSS</div>
                <div class="skill-chip">JavaScript</div>
                <div class="skill-chip">Java</div>
                <div class="skill-chip">C/C#</div>
                <div class="skill-chip">Python</div>
            </div>
            <p>
                <b>Web:</b> Responsive layouts, interactive UI, modern CSS<br>
                <b>Programming:</b> OOP, scripting, automation, debugging<br>
                <b>IT:</b> Networking, virtualization, system administration
            </p>
        `;
    }
    if (type === 'server') {
        return `
            <h4>TrueNAS Server</h4>
            <ul>
                <li>24TB ZFS Storage Array</li>
                <li>Docker, VMs, Media Streaming</li>
                <li>10GbE Fiber Networking</li>
                <li>Automated Backups & Snapshots</li>
            </ul>
            <p>
                I run my own TrueNAS server for storage, virtualization, and media. I'm comfortable with advanced IT setups and troubleshooting.
            </p>
        `;
    }
    return '';
}

let dragData = null;

window.startDrag = function(e, popup) {
    dragData = {
        popup,
        offsetX: e.clientX - popup.offsetLeft,
        offsetY: e.clientY - popup.offsetTop
    };
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', stopDrag);
};

function dragMove(e) {
    if (!dragData) return;
    dragData.popup.style.left = `${e.clientX - dragData.offsetX}px`;
    dragData.popup.style.top = `${e.clientY - dragData.offsetY}px`;
}

function stopDrag() {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', stopDrag);
    dragData = null;
}
