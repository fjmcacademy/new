import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const content = document.getElementById("content");
const logout = document.getElementById("logout");


onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const studentUID = user.uid;

    content.innerHTML = "<p>Loading your content...</p>";

    try {

        // =========================
        // GET VIDEOS
        // =========================

        const videoQuery = query(
            collection(db, "videos"),
            where("studentId", "==", studentUID)
        );

        const videoSnapshot = await getDocs(videoQuery);


        // =========================
        // GET PDFs
        // =========================

        const pdfQuery = query(
            collection(db, "pdfs"),
            where("studentId", "==", studentUID)
        );

        const pdfSnapshot = await getDocs(pdfQuery);


        let html = `<h2>Welcome</h2>`;


        // =========================
        // VIDEOS
        // =========================

        html += `<h2>?? My Videos</h2>`;

        if (videoSnapshot.empty) {

            html += `<p>No videos assigned.</p>`;

        } else {

            videoSnapshot.forEach((doc) => {

                const video = doc.data();

                html += `
                    <div>
                        <h3>${video.title}</h3>

                        <iframe
                            width="560"
                            height="315"
                            src="${convertYouTubeURL(video.url)}"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <hr>
                `;
            });
        }


        // =========================
        // PDFs
        // =========================

        html += `<h2>?? My PDFs</h2>`;

        if (pdfSnapshot.empty) {

            html += `<p>No PDFs assigned.</p>`;

        } else {

            pdfSnapshot.forEach((doc) => {

                const pdf = doc.data();

                html += `
                    <div>
                        <h3>${pdf.title}</h3>

                        <a href="${pdf.url}" target="_blank">
                            ?? Open PDF
                        </a>
                    </div>
                    <hr>
                `;
            });
        }


        content.innerHTML = html;

    } catch (error) {

        console.error(error);

        content.innerHTML =
            "<p>Content load nahi ho paya.</p>";
    }

});


// =========================
// YOUTUBE URL CONVERTER
// =========================

function convertYouTubeURL(url) {

    if (url.includes("youtu.be/")) {

        const id = url.split("youtu.be/")[1].split("?")[0];

        return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("watch?v=")) {

        const id = url.split("watch?v=")[1].split("&")[0];

        return `https://www.youtube.com/embed/${id}`;
    }

    return url;
}


// =========================
// LOGOUT
// =========================

logout.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "login.html";

});