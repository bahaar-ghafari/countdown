# Countdown

Countdown is a responsive and interactive Angular application that allows users to set a future date and view a live countdown timer. Built with Angular 18 and Angular Material, it offers a sleek user interface and seamless user experience. The application leverages Reactive Forms for efficient form handling and utilizes local storage to persist user settings.

## Table of Contents

+ [Features](#features)
+ [Demo](#demo)
+ [Installation](#installation)
+ [Usage](#usage)
+ [Testing](#testing)
+ [Technologies Used](#technologies-used)

## Features

+ Live Countdown Timer: Displays the time remaining until the selected event date.
+ Responsive Design: Optimized for various screen sizes and devices.
+ Persistent Storage: Saves event title and date using local storage.
+ User-Friendly Forms: Intuitive form controls with validation.
+ Loading Indicators: Provides visual feedback during data processing.
+ Error Handling: Gracefully handles errors with user notifications.
+ Accessible Design: Implements ARIA attributes for better accessibility.

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

1. Enter Event Title: Type in the title of your event in the provided input field.

2. Pick a Date: Select a future date using the date picker.

3. View Countdown: The application will automatically display a live countdown to the selected date.
    
    
## Persistent Data

The application uses localStorage to save your event title and date, so even if you refresh the page or close the browser, your data will remain intact.


## Debounce Time for Local Storage

To optimize the performance of local storage updates, the application uses the debounceTime operator from RxJS. This operator ensures that updates to localStorage occur only after the user has stopped typing or interacting with the form for a certain period (set to 1 second in this case). This reduces the number of write operations and enhances the overall performance.

## Testing

### Running Unit Tests

The application includes a set of unit tests that can be executed with the following command:

```bash
    ng test
```
This will run the tests using Karma, providing a detailed report of the test results in the console.

## Key Tests
+ Component Creation: Ensures that the components are created successfully.
+ Form Value Initialization: Verifies that the form initializes with the correct default values.
+ LocalStorage Updates: Tests that local storage is correctly updated when the form values change.
+ Countdown Calculation: Checks that the countdown is calculated accurately.


## Technologies Used

+ Angular 18: The core framework used for building the application.
+ Angular Material: Provides UI components like form fields and date pickers.
+ RxJS: Used for managing asynchronous operations, including form control debouncing.
+ gx PWA Local Storage: Handles persistent storage of form data.
+ Karma & Jasmine: Tools for testing the application.