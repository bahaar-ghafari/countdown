# Countdown

Countdown is a responsive and interactive Angular application that allows users to set a future date and view a live countdown timer. Built with Angular 18 and Angular Material. The application leverages Reactive Forms for efficient form handling and utilizes local storage to persist user settings.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Text Fitting Algorithm](#algorithm) 
- [Optional Goals](#optional-goals)
- [Improvement](#improvement)
- [Debounce And Local Storage](#debounce-and-Local-Storage)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Future Suggested Roadmap](#future-suggested-roadmap)

## Features

- **Live Countdown Timer:** Displays the time remaining until the selected event date.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Persistent Storage:** Saves event title and date using local storage.
- **User-Friendly Forms:** Intuitive form controls with validation.
- **Loading Indicators:** Provides visual feedback during data processing.
- **Accessible Design:** Implements ARIA attributes for better accessibility.

## Demo

You can see live demo of project in http://188.245.69.243:4200/

## Installation

Follow these steps to set up the project locally:

1. install Node.js and npm package manager.(Angular requires an active LTS or maintenance LTS version of Node.js.)

2. install angular CLI using npm:

```bash
npm install -g @angular/cli@17
```

1. Clone the Repository

```bash
   git clone https://github.com/bahaar-ghafari/countdown.git
```

2. Navigate to the Project Directory

```bash
    cd countdown
```

3. Install Dependencies using npm

```bash
    npm install
```

4. Run the development server:

```bash
    ng serve

```

Navigate to `http://localhost:4200/`.

## Usage

Setting Up an Event

**1. Enter Event Title:** Type in the title of your event in the provided input field.

**2. Pick a Date:** Select a future date using the date picker.

**3. View Countdown:** The application will automatically display a live countdown to the selected date.

## Algorithm

**Text Fitting Algorithm:** This algorithm compares to **using font-size with vw units**, which is simple but inflexible for dynamic content, and a **binary search** approach, which offers precise fitting with 𝑂(log𝑛) time complexity and adds implementation complexity. My algorithm, with a linear
**𝑂(𝑛)** time complexity, provides a practical balance, offering less computational overhead than binary search and more adaptability than the vw method, making it well-suited for responsive designs.

**How It Works**
**1. Initial Setup:** The text starts with a default font size (5 rem).

**2. Measure Text Width:** Calculates the text width using the canvas API, based on the computed styles of the text element.

**3. Adjust Font Size:** It calculates the required font size using the **ratio of the container width to the text width**, then applies a reduction factor (0.95) to ensure the text fits comfortably within the container.
Apply Font Size:

The final adjusted font size is applied to the text element.

**Example Usage:**

```bash
this.textFittingAlgorithmService.adjustFontSizeToFit(this.titleRef);
```

# Optional Goals

- **Scalability Challenges**

**1. Performance Issues:** When applied to many elements, the algorithm can degrade performance as each element requires its own text measurement and font size adjustment, leading to high computational load, especially during window resizing or content changes.

**2. UI Lag:** In dynamic applications with frequent content updates (e.g., live dashboards), the algorithm's frequent recalculations can cause delays and reduce UI responsiveness, particularly on less powerful devices.
These challenges emphasize the need for optimization to maintain efficiency in large-scale or dynamic environments.

## Improvement

- **Multi-Language Support with Dictionary:** Implement a dictionary feature that allows the application to support multiple languages. Users can choose their preferred language, and the UI text will be dynamically translated.

- **Custom Themes and Personalization:** Offer users the ability to customize the look and feel of the countdown timer, such as changing theme to improve accessability.

- **Caching Data for Offline Access:** Implement a caching mechanism using service workers or local storage to ensure that the countdown continues to work offline. Cached data could include event details and countdown state.

## Debounce and Local Storage

The application uses localStorage to save your event title and date, so even if you refresh the page or close the browser, your data will remain intact.
To optimize the performance of local storage updates, the application uses the debounceTime operator from RxJS. This operator ensures that updates to localStorage occur only after the user has stopped typing or interacting with the form for a certain period (set to 1 second in this case).

## Testing

**Running Unit Tests:** The application includes a set of unit tests that can be executed with the following command:

```bash
    ng test
```

This will run the tests using Karma, providing a detailed report of the test results in the console.

### Key Tests

- **Component Creation:** Ensures that the components are created successfully.
- **Form Value Initialization:** Verifies that the form initializes with the correct default values.
- **LocalStorage Updates:** Tests that local storage is correctly updated when the form values change.
- **Countdown Calculation:** Checks that the countdown is calculated accurately.

## Technologies Used

- **Angular 18 and Typescript:** The core language and framework used for building the application.
- **Angular Material:** Provides UI components like form fields and date pickers.
- **RxJS:** Used for managing asynchronous operations, including form control debouncing.
- **Local Storage:** Handles persistent storage of form data.
- **Karma & Jasmine:** Tools for testing the application.

## Future Suggested Roadmap

Here are some ideas for future enhancements that could be implemented in this application:

- **Event Suggestions Based on User History or common events:** Create a dictionary of common events (e.g., New Year's Eve, Christmas, Birthdays) or events set by the user. When an event is selected, the corresponding date is automatically filled in.

- **Progress Tracking and Milestones:** Add progress tracking to show the user how much time has elapsed versus how much is remaining until the event.

- **Export and Share Countdowns:** Enable users to export their countdowns as images, links, or widgets that they can share on social media, embed in websites, or send to friends and family.

- **Notifications and Alerts:** Add notifications or alerts that notify the user when a countdown is close to reaching zero.
