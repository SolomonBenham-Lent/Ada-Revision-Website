function Countdown() {
    const examDate = new Date("2026-05-13T09:00:00");
    const now = new Date();
    const diff = examDate - now;

    if (diff <= 0) {
    document.getElementById("countdown").textContent = "Exam Season!";
    return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("countdown").textContent =
    `${days.toString().padStart(3, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(Countdown, 1000);
Countdown();