# Countdown

Countdown is a responsive and interactive Angular application that allows users to set a future date and view a live countdown timer. Built with Angular 18 and Angular Material, it offers a sleek user interface and seamless user experience. The application leverages Reactive Forms for efficient form handling and utilizes local storage to persist user settings.

## Table of Contents

+ [Features](#features)
+ [Demo](#demo)
+ [Installation](#installation)
+ [Usage](#usage)
+ [Readme](#readme)
+ [Testing](#testing)
+ [Technologies Used](#technologies-used)

## Features

+ **Live Countdown Timer:** Displays the time remaining until the selected event date.
+ **Responsive Design:** Optimized for various screen sizes and devices.
+ **Persistent Storage:** Saves event title and date using local storage.
+ **User-Friendly Forms:** Intuitive form controls with validation.
+ **Loading Indicators:** Provides visual feedback during data processing.
+ **Error Handling:** Gracefully handles errors with user notifications.
+ **Accessible Design:** Implements ARIA attributes for better accessibility.

## Demo



## Installation

Follow these steps to set up the project locally:

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
    ng serve
```

4. Run the development server:

```bash
    ng serve

```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Usage
### Setting Up an Event

**1. Enter Event Title:** Type in the title of your event in the provided input field.

**2. Pick a Date:** Select a future date using the date picker.

**3. View Countdown:** The application will automatically display a live countdown to the selected date.
    
## Improvements
Here are some ideas for future enhancements that could be implemented in this application:

### 1. Event Dictionary
 - **Feature:** Create a dictionary of common events (e.g., New Year's Eve, Christmas, Birthdays) that users can select from a dropdown. When an event is selected, the corresponding date is automatically filled in.
 - **Benefit:** This feature enhances user experience by saving time and ensuring accuracy when setting up common events.

### 2. Event Suggestions Based on User History
- **Feature:**  Implement a feature that tracks and saves past events set by the user. When the user starts typing a new event, the application could suggest previously saved events and their dates.
- **Benefit:** This allows for quick setup of recurring or similar events, making the app more user-friendly and personalized.

### 3. Caching Data for Offline Access
- **Feature:**  Implement a caching mechanism using service workers or local storage to ensure that the countdown continues to work offline. Cached data could include event details and countdown state.
- **Benefit:** Provides a more reliable experience, especially in environments with inconsistent internet access, by allowing users to access their countdowns even when offline.

### 4. Notifications and Alerts
- **Feature:**  Add notifications or alerts that notify the user when a countdown is close to reaching zero. These notifications could be desktop notifications, emails, or even push notifications on mobile devices.
- **Benefit:** Keeps the user engaged and informed, ensuring they don’t miss important events.

### 5. Multiple Events Management
- **Feature:**  Allow users to manage multiple countdowns simultaneously. Users could add, edit, or delete multiple events, each with its own countdown timer.
- **Benefit:** This turns the application into a more robust event management tool, suitable for tracking various important dates and deadlines.

### 6. Integration with Calendars
- **Feature:**  Integrate the application with popular calendar services like Google Calendar, Outlook, or Apple Calendar. Users could sync events directly from their calendars to the countdown app.
- **Benefit:** Enhances convenience by eliminating the need to manually input dates, ensuring that the countdown app is always in sync with the user's schedule.

### 7. Custom Themes and Personalization
- **Feature:**  Offer users the ability to customize the look and feel of the countdown timer, such as changing colors, fonts, and background images. Users could also save their preferences for future use.
- **Benefit:** Improves user engagement by allowing them to personalize the app according to their taste and style.

### 8. Progress Tracking and Milestones
- **Feature:**  Add progress tracking to show the user how much time has elapsed versus how much is remaining until the event. Include milestones (e.g., "50% time remaining") that users can set to receive notifications or alerts.
- **Benefit:** Enhances the user experience by providing additional context and allowing users to track their progress toward the event.

### 9. Export and Share Countdowns
- **Feature:**  Enable users to export their countdowns as images, links, or widgets that they can share on social media, embed in websites, or send to friends and family.
- **Benefit:** Increases the app's visibility and utility by allowing users to easily share their countdowns with others.
Contributing

### 10. Multi-Language Support with Dictionary
- **Feature:**  Implement a dictionary feature that allows the application to support multiple languages. Users can choose their preferred language, and the UI text will be dynamically translated.
- **Benefit:** Expands the application's reach by making it accessible to a global audience and providing a more inclusive user experience.

## User experience
### Persistent Data
The application uses localStorage to save your event title and date, so even if you refresh the page or close the browser, your data will remain intact.

### Debounce Time for Local Storage
To optimize the performance of local storage updates, the application uses the debounceTime operator from RxJS. This operator ensures that updates to localStorage occur only after the user has stopped typing or interacting with the form for a certain period (set to 1 second in this case). This reduces the number of write operations and enhances the overall performance.

## Testing

### Running Unit Tests

The application includes a set of unit tests that can be executed with the following command:

```bash
    ng test
```
This will run the tests using Karma, providing a detailed report of the test results in the console.

### Key Tests
+ **Component Creation:** Ensures that the components are created successfully.
+ **Form Value Initialization:** Verifies that the form initializes with the correct default values.
+ **LocalStorage Updates:** Tests that local storage is correctly updated when the form values change.
+ **Countdown Calculation:** Checks that the countdown is calculated accurately.


## Technologies Used

+ **Angular 18:** The core framework used for building the application.
+ **Angular Material:** Provides UI components like form fields and date pickers.
+ **RxJS:** Used for managing asynchronous operations, including form control debouncing.
+ **gx PWA Local Storage:** Handles persistent storage of form data.
+ **Karma & Jasmine:** Tools for testing the application.