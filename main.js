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
            <strong>Hello there!</strong> I'm <b>Jared Butler</b>, a Black and Italian college student at Rider University, majoring in Computer Science with a minor in Cybersecurity. My passion for technology and IT drives me to constantly explore new tools and systems, always seeking to expand my knowledge and skills.

            I thrive on solving complex problems, whether it’s debugging code, optimizing network performance, or designing secure digital environments. I have hands-on experience maintaining and administering servers using a variety of Linux distributions, including Arch, Debian, and Fedora. This exposure has given me a strong command of system configuration, shell scripting, and troubleshooting across different operating systems.

            Beyond the classroom, I love tinkering with servers and networks, setting up virtual labs, and experimenting with new open-source technologies. My technical toolkit also includes proficiency in Windows and macOS environments, making me adaptable and versatile in any IT setting.

            I’m deeply committed to building innovative solutions that have a real impact within the tech community. Whether collaborating on group projects, contributing to open-source initiatives, or mentoring peers, I strive to make technology more accessible, secure, and meaningful for everyone.
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
                <b>IT:</b> Networking, virtualization, system administration, PC fixing/maintenance<br>
                <b>Tools:</b> Git, Docker, VS Code, Linux CLI, Windows PowerShell,  VirtualBox, VMware, QEMU, TrueNAS, Proxmox <br>
                <b>Soft Skills:</b> Problem-solving, teamwork, communication, adaptability 
            </p>
        `;
    }
    if (type === 'server') {
        return `
            <h4>TrueNAS Server</h4>
            <ul>
                <li>4TB ZFS Raid1/Mirror Storage Array</li>
                <li>Docker, VMs, Media Streaming</li>
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
