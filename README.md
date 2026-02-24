# Job Application Tracker

A web application for tracking job applications with status management.

## Features

- View all job applications
- Categorize jobs into Interview and Rejected statuses
- Dashboard showing total, interview, and rejected counts
- Tabbed interface for easy navigation
- Delete jobs from the tracker
- Responsive design

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript

## How to Use

1. Open `index.html` in a web browser
2. Click on Interview or Rejected buttons to categorize jobs
3. Use tabs to view jobs by status
4. Click the delete icon to remove jobs

## Functionality

- Clicking Interview button moves the job to Interview tab and updates counts
- Clicking Rejected button moves the job to Rejected tab and updates counts
- Toggle between statuses by clicking the respective buttons
- Delete button removes the job and deducts from counts

---

### Assignment Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans:getElementById নির্দিষ্ট ID দিয়ে ১টি, getElementsByClassName নির্দিষ্ট Class দিয়ে সব, querySelector যেকোনো CSS সিলেক্টর দিয়ে প্রথমটি এবং querySelectorAll ওই সিলেক্টর দিয়ে সব এলিমেন্টকে একসাথে সিলেক্ট করে।

### 2. How do you create and insert a new element into the DOM?
Ans:document.createElement() দিয়ে নতুন এলিমেন্ট তৈরি করে appendChild() বা append() মেথডের মাধ্যমে তা DOM-এ ইনসার্ট করতে হয়।

### 3. What is Event Bubbling? And how does it work?
Ans:Event Bubbling হলো এমন একটি প্রক্রিয়া যেখানে কোনো ভেতরের Element Event (যেমন: Click) ঘটলে তা নিচ থেকে উপরের দিকে তার parent  এলিমেন্টগুলোতে পর্যায়ক্রমে ছড়িয়ে পড়ে।

 ### 4. What is Event Delegation in JavaScript? Why is it useful?
Ans:Event Delegation হলো প্রতিটি চাইল্ডের বদলে শুধুমাত্র তাদের প্যারেন্ট এলিমেন্টে একটি ইভেন্ট লিসেনার যুক্ত করার কৌশল, যা মেমরি সাশ্রয় করে এবং ডাইনামিকভাবে তৈরি হওয়া নতুন এলিমেন্টগুলোকে সহজেই হ্যান্ডেল করতে সাহায্য করে।

### 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans:preventDefault() ব্রাউজারের স্বাভাবিক বা ডিফল্ট কাজ (যেমন ফর্ম সাবমিট বা লিংক ওপেন হওয়া) থামায়, আর stopPropagation() ইভেন্টটিকে উপরের দিকের প্যারেন্ট এলিমেন্টে ছড়িয়ে পড়া বা ইভেন্ট বাবলিং বন্ধ করে।
