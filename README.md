# Study Buddy

Study Buddy is a beautiful, minimalist productivity application designed to help students and professionals stay focused. It combines a Zen Timer, daily planning, and progress tracking into a clean, modern interface.


## Problem Statement

In an age of constant digital distractions, students and professionals often struggle to maintain deep focus. Context switching and lack of clear progress tracking can lead to burnout. **Study Buddy** addresses this by providing a serene, distraction-free environment that combines a Zen Timer, daily goal setting, and visual progress tracking to help users build consistent, productive habits without the complexity of heavy project management tools.

## Features

*   **Zen Timer**: A distraction-free timer with Focus, Short Break, and Long Break modes.
*   **Smart Dashboard**: 
    *   **Greeting**: Automatically welcomes you based on the time of day.
    *   **Daily Plan**: A persistent scratchpad to write down your main goal for the day.
*   **Progress Tracking**:
    *   **Total Focus Time**: Tracks every minute you spend in Focus mode.
    *   **Session Counter**: Counts completed study sessions.
    *   **Daily Streaks**: Keeps track of how many consecutive days you've used the app.
*   **Customizable Profile**: Edit your name and bio, with all data saved locally.
*   **Stopwatch Mode**: A simple count-up timer for open-ended sessions.

## DOM Concepts Used

This project is built entirely with Vanilla JavaScript and relies heavily on DOM manipulation:

*   **Element Selection**: Using `document.getElementById` and `document.querySelectorAll` to interact with the DOM tree.
*   **Dynamic Content Updates**: Real-time updates to `textContent` for the timer, greeting, and statistics.
*   **CSS Class Manipulation**: Using `classList.add`, `.remove`, and `.toggle` to manage UI states (e.g., switching timer modes, active navigation).
*   **Attribute Manipulation**: Toggling the `contenteditable` attribute to allow inline editing of the daily plan and user profile.
*   **Event Handling**: Comprehensive usage of `addEventListener` for button clicks, mode switching, and input handling.
*   **Local Storage**: syncing DOM state with `localStorage` to persist user data across sessions.


## Technology Stack  

*   **HTML5**: Semantic structure.
*   **CSS3**: Modern styling with specific focus on aesthetics and responsiveness.
*   **JavaScript (Vanilla)**: Core logic for the timer, local storage persistence, and DOM manipulation. No external frameworks or libraries required.

## Getting Started

1.  **Clone or Download** this repository.
2.  Open the folder in your file explorer.
3.  Double-click `home.html` to launch the application in your default web browser.

## Local Storage

This app uses your browser's **Local Storage** to save your data permanently on your device. 
*   Your stats (Streaks, Time, Sessions) will persist even if you close the browser.
*   To reset everything, simply clear your browser's cache for the page.

## Usage Tips

*   **Skip Button**: Use the skip button (⏭) to instantly end a session and auto-advance to the next mode (e.g., Focus → Short Break).
*   **Editing**: Click the pencil icon (✎) on the Dashboard to edit your daily plan, or the "Edit Profile" button on the Profile page.

## Known Limitations

*   **Browser-Based Storage**: All data is stored in the browser's Local Storage. If you clear your cache or use a different device, your progress will not be synced.
*   **No Mobile App**: This is a web application accessible via mobile browser but is not a native iOS or Android app.
*   **Single User**: The application currently supports only one user profile per browser.

