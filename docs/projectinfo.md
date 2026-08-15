# **ONTO DIGITAL**

## **Software Requirements Specification (SRS)**

**Version:** 1.0

---

# **1. Project Overview**

## **Project Name**

**ONTO DIGITAL – Agency Website & Content Management Platform**

---

## **Project Description**

ONTO DIGITAL is a modern, premium digital agency website designed to showcase the company's services, portfolio, pricing, and business information while allowing administrators to manage all dynamic content through an integrated Admin Dashboard.

Unlike a traditional static website, this platform functions as both:

- A professional agency website for visitors.
- A lightweight Content Management System (CMS) for administrators.

The primary objective is to allow non-technical administrators to manage website content without modifying the source code.

Whenever an administrator updates information through the dashboard, the changes should immediately reflect on the public website.

---

## **Vision**

Create a premium digital agency platform that combines:

- Modern UI
- Fast Performance
- SEO Optimization
- Easy Content Management
- Professional Project Showcase
- Lead Generation
- Scalability

The platform should serve as the official online identity of ONTO DIGITAL while also acting as an internal management system for the agency.

---

## **Primary Goals**

### **Business Goals**

| Goal | Description |
|------|-------------|
| Generate Client Inquiries | Convert website visitors into potential clients. |
| Build Trust | Establish credibility through professional presentation and testimonials. |
| Showcase Portfolio | Display completed projects in an engaging manner. |
| Explain Services | Clearly communicate agency offerings. |
| Display Pricing | Present transparent pricing plans. |
| Increase Conversion Rate | Encourage visitors to contact the agency. |
| Premium Online Presence | Represent ONTO DIGITAL as a modern digital agency. |

---

### **Technical Goals**

| Goal | Description |
|------|-------------|
| Fast Loading | Optimize performance and Core Web Vitals. |
| SEO Friendly | Improve search engine visibility. |
| Responsive | Support desktop, tablet, and mobile devices. |
| Easy Maintenance | Enable administrators to update content without coding. |
| Secure | Protect administrator accounts and website data. |
| Dynamic Content | Load website content from the database. |
| Scalable | Support future features and business growth. |

---

# **2. Project Scope**

## **Included Features**

### **Public Website**

| Feature |
|----------|
| Home |
| Services |
| Service Details |
| Projects |
| Project Details |
| Pricing |
| Contact |
| Terms & Conditions |
| Privacy Policy |

---

### **Admin Dashboard**

| Feature |
|----------|
| Authentication |
| Dashboard |
| Contact Management |
| Services Management |
| Projects Management |
| Testimonials Management |
| Pricing Management |
| Website Settings |
| Admin Profile |

---

### **Backend**

| Feature |
|----------|
| REST APIs |
| MongoDB Database |
| Authentication |
| Email Notifications |
| Cloud Image Storage |

---

### **Deployment**

| Service | Purpose |
|----------|----------|
| Frontend | Website Deployment |
| Backend | API Deployment |
| Database | Cloud Database |
| Images | Cloud Storage |

---

## **Not Included (Version 1)**

The following features are intentionally excluded from Version 1 to keep the initial release focused while allowing future expansion without changing the core architecture.

| Future Feature |
|----------------|
| Blog |
| Client Login Portal |
| Online Payments |
| Team Management |
| Live Chat |
| Newsletter |
| Booking Calendar |
| CRM |
| Invoice Generator |
| AI Chatbot |

---

# **3. Target Audience**

The ONTO DIGITAL website is designed for businesses and organizations seeking professional digital services.

| Audience | Requirements |
|-----------|--------------|
| Small Businesses | Professional websites and online presence |
| Startups | Branding, MVPs, and web applications |
| E-Commerce Businesses | Shopify development and custom solutions |
| Agencies | White-label development and outsourcing |
| Enterprises | Scalable web applications and enterprise solutions |

---

# **4. Website Purpose**

The website serves four primary purposes.

| Purpose | Description |
|----------|-------------|
| Marketing | Present ONTO DIGITAL as a premium digital agency. |
| Lead Generation | Convert visitors into clients through contact forms and pricing plans. |
| Portfolio Showcase | Display completed projects professionally. |
| Content Management | Allow administrators to manage website content without editing code. |

---

# **5. Website Architecture**

The overall website workflow is illustrated below.

```text
Visitor
   │
   ▼
Homepage
   │
   ▼
Services
   │
   ▼
Service Detail
   │
   ▼
Projects
   │
   ▼
Project Detail
   │
   ▼
Pricing
   │
   ▼
Contact Form
   │
   ▼
REST API
   │
   ▼
MongoDB Database
   │
   ▼
Email Notification
   │
   ▼
Admin Dashboard
```

---

# **6. Technology Stack**

## **Frontend Technologies**

| Technology | Purpose | Why It Is Used |
|------------|----------|----------------|
| Next.js 15 | Routing, SEO, Performance, Server Components | Provides excellent SEO, routing, image optimization, and high performance. |
| React 19 | UI Development | Enables reusable and component-based architecture. |
| TypeScript | Static Type Checking | Prevents runtime errors and improves maintainability. |
| Tailwind CSS | Styling | Allows rapid and consistent UI development. |
| Framer Motion | Animations | Creates smooth page and component animations. |
| React Hook Form | Form Handling | Simplifies form state management with excellent performance. |
| Zod | Validation | Provides schema-based form validation with TypeScript support. |

---

## **Backend Technologies**

| Technology | Purpose | Why It Is Used |
|------------|----------|----------------|
| NestJS | REST API Development | Modular, scalable, clean architecture, enterprise-ready framework. |

---

## **Database**

| Technology | Purpose | Why It Is Used |
|------------|----------|----------------|
| MongoDB Atlas | Cloud Database | Flexible schema, fast development, CMS-friendly architecture, and seamless NestJS integration. |
| Mongoose | ODM | Simplifies interaction with MongoDB using schemas and models. |

---

## **Authentication**

| Technology | Purpose |
|------------|----------|
| JWT | Secure administrator authentication using access tokens. |
| bcrypt | Secure password hashing before storing credentials. |

---

## **Cloud Storage**

| Technology | Purpose |
|------------|----------|
| Cloudinary | Store service images, project images, logos, testimonial images, and other media assets. |

---

## **Email Service**

| Technology | Purpose |
|------------|----------|
| Resend | Send contact notifications and automated email replies. |

---

## **Deployment**

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

---

# **7. Folder Structure**

The project follows a modular architecture for scalability and maintainability.

```text
onto-digital/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── lib/
│   ├── utils/
│   └── assets/
│
├── backend/
│   ├── modules/
│   ├── controllers/
│   ├── services/
│   ├── schemas/
│   ├── guards/
│   ├── middleware/
│   └── config/
│
├── admin/
│   ├── dashboard/
│   ├── pages/
│   └── components/
│
├── uploads/
├── docs/
└── README.md
```
# **8. Website Pages**

The public website consists of multiple pages designed to provide visitors with complete information about ONTO DIGITAL, its services, portfolio, pricing, and contact options. Most pages retrieve dynamic content from the database, allowing administrators to manage the website through the Admin Dashboard without modifying the source code.

---

# **Home Page**

## **Purpose**

The Home Page is the primary landing page of the website. Its objective is to introduce visitors to ONTO DIGITAL, establish credibility, showcase services, highlight completed work, and encourage users to contact the agency.

---

## **Sections**

| Section | Description |
|----------|-------------|
| Hero | Premium introduction with animated Earth, headline, description, and CTA buttons. |
| Trusted Companies | Displays logos of companies or clients to build trust. |
| Services Overview | Highlights the major digital services offered by the agency. |
| Process | Explains the complete workflow from discovery to deployment. |
| Featured Projects | Displays selected portfolio projects. |
| Statistics | Animated counters showing agency achievements. |
| Testimonials | Customer reviews and success stories. |
| Pricing Plans | Displays available pricing packages. |
| CTA Section | Encourages visitors to contact the agency. |
| Footer | Quick links, contact details, social media, and copyright information. |

---

## **User Actions**

Visitors can perform the following actions:

- View available services
- Explore completed projects
- Read testimonials
- Compare pricing plans
- Contact the agency
- Navigate to other website pages

---

# **Services Page**

## **Purpose**

The Services page displays all services offered by ONTO DIGITAL in a structured layout.

Each service is dynamically loaded from the database.

---

## **Each Service Card Contains**

| Field |
|--------|
| Image |
| Title |
| Short Description |
| CTA Button |

---

## **Navigation**

Clicking a service opens its dedicated detail page.

```text
/services/service-slug
```

---

# **Service Detail Page**

## **Purpose**

The Service Detail page explains a single service in depth and provides sufficient information for potential clients before contacting the agency.

---

## **Sections**

| Section |
|----------|
| Hero Banner |
| Service Overview |
| Features |
| Technologies Used |
| Development Process |
| Frequently Asked Questions |
| Pricing Information |
| Call-to-Action |

---

## **Content Source**

All content displayed on this page is dynamically retrieved from the database and managed through the Admin Dashboard.

---

# **Projects Page**

## **Purpose**

Displays the complete portfolio of ONTO DIGITAL.

Each project represents previous work completed by the agency.

---

## **Each Project Card Contains**

| Field |
|--------|
| Thumbnail Image |
| Project Title |
| Category |
| Technologies Used |

---

## **Navigation**

Clicking a project opens the detailed project page.

```text
/projects/project-slug
```

---

# **Project Detail Page**

## **Purpose**

Provides an in-depth explanation of a completed project.

---

## **Sections**

| Section |
|----------|
| Hero Banner |
| Project Overview |
| Challenge |
| Solution |
| Project Gallery |
| Technologies Used |
| Client Testimonial |
| Call-to-Action |

---

# **Pricing Page**

## **Purpose**

Displays available pricing packages offered by ONTO DIGITAL.

Pricing information is dynamically managed through the Admin Dashboard.

---

## **Pricing Plans**

| Plan |
|------|
| Starter |
| Business |
| Enterprise |

---

## **Each Pricing Plan May Include**

| Feature |
|----------|
| Plan Name |
| Price |
| Billing Type |
| Features List |
| CTA Button |

---

# **Contact Page**

## **Purpose**

The Contact page is designed to generate leads and allow visitors to communicate directly with ONTO DIGITAL.

---

## **Sections**

| Section |
|----------|
| Contact Form |
| Agency Information |
| Google Map |
| Social Media Links |

---

## **Contact Form Workflow**

```text
Visitor
   │
   ▼
Completes Contact Form
   │
   ▼
Frontend Validation
   │
   ▼
REST API
   │
   ▼
MongoDB Database
   │
   ▼
Email Notification
   │
   ▼
Admin Dashboard
```

---

## **Contact Form Fields**

| Field |
|--------|
| Full Name |
| Email Address |
| Phone Number |
| Company Name (Optional) |
| Selected Service |
| Subject |
| Message |

---

# **Privacy Policy**

## **Purpose**

Provides visitors with information regarding:

- Data collection
- Data usage
- Cookies
- Third-party services
- User rights
- Privacy practices

This page is static.

---

# **Terms & Conditions**

## **Purpose**

Defines the legal terms governing the use of the website and services.

This page is static.

---

# **9. Website Components**

Website components are reusable UI elements shared across multiple pages.

---

# **Navbar**

## **Contains**

| Item |
|------|
| Agency Logo |
| Home |
| Services |
| Projects |
| Contact |
| CTA Button |

---

## **Features**

- Sticky navigation
- Responsive layout
- Mobile navigation menu
- Smooth scrolling
- Active page indicator

---

# **Hero Section**

## **Contains**

| Item |
|------|
| Main Heading |
| Supporting Description |
| Primary CTA |
| Secondary CTA |
| Animated Earth Illustration |

---

# **Trusted Companies**

## **Purpose**

Display trusted client logos to establish credibility and social proof.

---

# **Services Cards**

## **Displays**

| Item |
|------|
| Service Icon |
| Service Title |
| Service Description |
| CTA Button |

---

# **Process Timeline**

## **Workflow**

```text
Discover
   │
   ▼
Research
   │
   ▼
Design
   │
   ▼
Develop
   │
   ▼
Deploy
```

---

# **Project Cards**

## **Displays**

| Item |
|------|
| Project Image |
| Project Title |
| Category |
| Technology Stack |

---

# **Statistics Section**

## **Purpose**

Displays animated numerical achievements.

### **Examples**

| Statistic |
|-----------|
| Projects Completed |
| Happy Clients |
| Years of Experience |
| Client Satisfaction |
| Technologies Used |

---

# **Testimonials**

## **Purpose**

Display customer reviews and success stories to improve trust and conversions.

---

## **Each Testimonial Contains**

| Field |
|--------|
| Client Name |
| Company |
| Profile Image |
| Review |
| Rating |

---

# **Pricing Component**

Displays pricing packages managed from the Admin Dashboard.

### **Available Plans**

| Plan |
|------|
| Starter |
| Business |
| Enterprise |

---

# **Call-to-Action (CTA) Section**

## **Purpose**

Encourage visitors to contact ONTO DIGITAL.

---

## **Contains**

- Headline
- Supporting text
- CTA Button

---

# **Footer**

## **Contains**

| Item |
|------|
| Quick Links |
| Contact Information |
| Social Media Links |
| Copyright |
| Privacy Policy Link |
| Terms & Conditions Link |

---

# **10. Complete User Journey**

The following workflow illustrates how a typical visitor interacts with the website.

```text
Visitor
   │
   ▼
Visits Homepage
   │
   ▼
Reads About Agency
   │
   ▼
Views Services
   │
   ▼
Chooses a Service
   │
   ▼
Reads Service Details
   │
   ▼
Views Portfolio
   │
   ▼
Chooses Pricing Plan
   │
   ▼
Submits Contact Form
   │
   ▼
Information Stored in MongoDB
   │
   ▼
Admin Receives Email Notification
   │
   ▼
Lead Appears in Admin Dashboard
   │
   ▼
Admin Contacts Client
   │
   ▼
Project Discussion Begins
   │
   ▼
Project Starts
```

---

# **11. Admin Dashboard**

The **Admin Dashboard** is a secure, private Content Management System (CMS) used by ONTO DIGITAL administrators to manage every dynamic section of the public website. It allows administrators to update content, manage inquiries, control website settings, and maintain business information without modifying the source code.

All changes made through the Admin Dashboard are stored in the database and are immediately reflected on the public website.

---

# **Admin Dashboard Objectives**

| Objective | Description |
|-----------|-------------|
| Centralized Management | Manage all website content from a single dashboard. |
| Content Management | Update services, projects, testimonials, pricing, and website information. |
| Lead Management | View and manage customer inquiries. |
| Security | Restrict dashboard access to authenticated administrators only. |
| Scalability | Easily add new management modules in future versions. |

---

# **Dashboard Authentication**

## **Purpose**

Only authorized administrators should be able to access the dashboard.

---

## **Authentication Flow**

```text
Administrator
      │
      ▼
Login Page
      │
      ▼
Enter Email & Password
      │
      ▼
Backend Authentication
      │
      ▼
Password Verification (bcrypt)
      │
      ▼
JWT Token Generated
      │
      ▼
Dashboard Access Granted
```

---

## **Authentication Features**

| Feature | Description |
|---------|-------------|
| Secure Login | Administrator login using email and password. |
| Password Encryption | Passwords stored securely using bcrypt hashing. |
| JWT Authentication | Secure API authorization using JSON Web Tokens. |
| Protected Routes | Prevent unauthorized dashboard access. |
| Session Validation | Verify authentication on every protected request. |
| Logout | Securely destroy administrator session. |

---

# **Dashboard Home**

## **Purpose**

The Dashboard Home provides an overview of the website and recent administrative activity.

---

## **Dashboard Widgets**

| Widget | Description |
|---------|-------------|
| Total Leads | Number of contact inquiries received. |
| Total Services | Number of published services. |
| Total Projects | Number of portfolio projects. |
| Testimonials | Total customer testimonials. |
| Pricing Plans | Number of pricing packages. |
| Recent Activity | Latest updates performed by administrators. |

---

# **Contact Leads Management**

## **Purpose**

Manage all client inquiries submitted through the Contact Form.

---

## **Functions**

| Function | Description |
|----------|-------------|
| View Leads | Display all submitted inquiries. |
| Search Leads | Search by name, email, or service. |
| Filter Leads | Filter by status or date. |
| View Details | Display complete inquiry information. |
| Update Status | Change inquiry status (New, Contacted, Closed). |
| Delete Lead | Permanently remove an inquiry. |

---

## **Lead Information**

| Field |
|--------|
| Full Name |
| Email Address |
| Phone Number |
| Company Name |
| Selected Service |
| Subject |
| Message |
| Status |
| Submission Date |

---

# **Services Management**

## **Purpose**

Manage all agency services displayed on the public website.

---

## **Functions**

| Function | Description |
|----------|-------------|
| Create Service | Add a new service. |
| Edit Service | Update existing service information. |
| Delete Service | Remove a service permanently. |
| Hide Service | Temporarily hide a service from the website. |
| Publish Service | Make a service visible on the public website. |

---

## **Service Fields**

| Field |
|--------|
| Service Title |
| Slug |
| Hero Image |
| Short Description |
| Full Description |
| Features |
| Technologies |
| Process |
| FAQs |
| Pricing Information |
| SEO Title |
| SEO Description |

---

# **Projects Management**

## **Purpose**

Manage the agency portfolio.

---

## **Functions**

| Function | Description |
|----------|-------------|
| Create Project | Add a new portfolio project. |
| Update Project | Edit project details. |
| Delete Project | Remove project permanently. |
| Upload Images | Upload multiple project images. |
| Feature Project | Highlight project on homepage. |
| Hide Project | Remove project from public listing without deleting. |

---

## **Project Fields**

| Field |
|--------|
| Project Title |
| Slug |
| Thumbnail Image |
| Gallery Images |
| Category |
| Technologies Used |
| Challenge |
| Solution |
| Client Testimonial |
| Completion Date |
| Project URL |
| SEO Title |
| SEO Description |

---

# **Testimonials Management**

## **Purpose**

Manage customer testimonials displayed throughout the website.

---

## **Functions**

| Function | Description |
|----------|-------------|
| Add Testimonial | Create a new testimonial. |
| Edit Testimonial | Update testimonial information. |
| Delete Testimonial | Remove testimonial permanently. |
| Publish / Unpublish | Control website visibility. |

---

## **Testimonial Fields**

| Field |
|--------|
| Client Name |
| Company |
| Designation |
| Profile Image |
| Review |
| Rating |

---

# **Pricing Plans Management**

## **Purpose**

Manage all pricing packages shown on the website.

---

## **Functions**

| Function | Description |
|----------|-------------|
| Create Plan | Add a new pricing package. |
| Update Plan | Modify pricing details. |
| Delete Plan | Remove a pricing package. |
| Publish Plan | Display on website. |
| Hide Plan | Hide from public website. |

---

## **Pricing Fields**

| Field |
|--------|
| Plan Name |
| Price |
| Billing Type |
| Features List |
| CTA Button Text |
| Display Order |

---

# **Website Settings**

## **Purpose**

Store global website information used throughout the application.

Updating a value here automatically updates it wherever it appears on the public website.

---

## **Global Settings**

| Setting |
|----------|
| Agency Name |
| Agency Logo |
| Favicon |
| Contact Email |
| Phone Number |
| Office Address |
| Business Hours |
| Social Media Links |
| Footer Content |
| Copyright |
| Default SEO Title |
| Default SEO Description |
| Google Analytics ID |
| Google Maps Embed Link |

---

# **Administrator Profile**

## **Purpose**

Allows administrators to manage their personal account information.

---

## **Functions**

| Function | Description |
|----------|-------------|
| Update Name | Change administrator name. |
| Update Email | Change login email. |
| Update Profile Photo | Upload a new profile image. |
| Change Password | Update account password securely. |
| Security Settings | Manage authentication preferences. |

---

## **Profile Fields**

| Field |
|--------|
| Full Name |
| Email Address |
| Profile Image |
| Password |
| Confirm Password |

---

# **System Workflow**

```text
Administrator
      │
      ▼
Login
      │
      ▼
Dashboard
      │
      ├──────────────► Manage Services
      │
      ├──────────────► Manage Projects
      │
      ├──────────────► Manage Testimonials
      │
      ├──────────────► Manage Pricing
      │
      ├──────────────► Manage Contact Leads
      │
      ├──────────────► Manage Website Settings
      │
      └──────────────► Manage Profile
              │
              ▼
Database Updated
              │
              ▼
Public Website Automatically Updated
```

---

# **Version 1 Features Summary**

| Module | Status |
|---------|--------|
| Public Website | ✅ Included |
| Home Page | ✅ Included |
| Services | ✅ Included |
| Service Details | ✅ Included |
| Projects | ✅ Included |
| Project Details | ✅ Included |
| Pricing | ✅ Included |
| Contact Page | ✅ Included |
| Privacy Policy | ✅ Included |
| Terms & Conditions | ✅ Included |
| Admin Authentication | ✅ Included |
| Dashboard Overview | ✅ Included |
| Contact Management | ✅ Included |
| Services Management | ✅ Included |
| Projects Management | ✅ Included |
| Testimonials Management | ✅ Included |
| Pricing Management | ✅ Included |
| Website Settings | ✅ Included |
| Admin Profile | ✅ Included |
| REST APIs | ✅ Included |
| MongoDB Atlas | ✅ Included |
| Cloudinary Storage | ✅ Included |
| Email Notifications (Resend) | ✅ Included |
| Vercel Deployment | ✅ Included |
| Render Deployment | ✅ Included |

---

# **Future Enhancements (Version 2+)**

The following modules are planned for future releases and can be integrated without changing the overall architecture.

| Future Feature | Description |
|----------------|-------------|
| Blog Management | Publish articles and SEO content. |
| Client Login Portal | Allow clients to access project updates. |
| Online Payments | Accept payments directly through the website. |
| Team Management | Display agency team members. |
| Live Chat | Real-time customer support. |
| Newsletter System | Email marketing and subscriptions. |
| Booking Calendar | Schedule meetings and consultations. |
| CRM Integration | Manage customer relationships. |
| Invoice Generator | Generate project invoices. |
| AI Chatbot | Automated customer assistance. |

---

# **Conclusion**

The **ONTO DIGITAL – Agency Website & Content Management Platform** is designed as a modern, scalable, secure, and SEO-friendly web application that combines a premium public-facing agency website with a powerful administrator dashboard.

The architecture enables administrators to manage all dynamic website content—including services, projects, testimonials, pricing, contact inquiries, and global website settings—without editing the source code.

Built with **Next.js 15**, **React 19**, **NestJS**, **MongoDB Atlas**, **Cloudinary**, **Resend**, and deployed using **Vercel** and **Render**, the platform provides excellent performance, maintainability, scalability, and long-term extensibility.

The modular architecture ensures that future features such as blogging, client portals, CRM integration, online payments, newsletters, booking systems, and AI-powered tools can be added seamlessly without requiring major architectural changes.


---

# **12. Database Design**

The website uses **MongoDB Atlas** as its cloud-hosted database.

The database stores all dynamic website content, administrator information, contact inquiries, and website settings.

---

## **Database Collections**

| Collection | Purpose |
|------------|---------|
| `admins` | Store administrator account information. |
| `contacts` | Store contact form submissions. |
| `services` | Store agency services displayed on the website. |
| `projects` | Store portfolio projects. |
| `testimonials` | Store customer testimonials. |
| `pricingPlans` | Store pricing packages. |
| `settings` | Store global website settings. |

---

## **Collection: `admins`**

### **Purpose**

Store administrator account information used for dashboard authentication and profile management.

### **Fields**

| Field | Description |
|-------|-------------|
| `_id` | Unique MongoDB document ID |
| `name` | Administrator full name |
| `email` | Login email |
| `password` | Hashed password |
| `profileImage` | Profile image URL |
| `role` | Administrator role |
| `lastLogin` | Last successful login |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last update timestamp |

---

## **Collection: `contacts`**

### **Purpose**

Store every inquiry submitted through the website contact form.

### **Fields**

| Field | Description |
|-------|-------------|
| `_id` | Unique document ID |
| `name` | Client name |
| `email` | Client email |
| `phone` | Phone number |
| `company` | Company name |
| `service` | Selected service |
| `budget` | Estimated budget |
| `message` | Client message |
| `status` | Inquiry status |
| `createdAt` | Submission date |

### **Status Values**

| Status |
|--------|
| New |
| Contacted |
| Proposal Sent |
| Won |
| Lost |

---

## **Collection: `services`**

### **Purpose**

Store all services displayed on the public website.

### **Fields**

| Field | Description |
|-------|-------------|
| `_id` | Unique document ID |
| `title` | Service title |
| `slug` | URL slug |
| `shortDescription` | Short summary |
| `description` | Complete description |
| `features[]` | List of service features |
| `image` | Hero image |
| `icon` | Service icon |
| `isActive` | Visibility status |
| `seoTitle` | SEO page title |
| `seoDescription` | SEO description |
| `createdAt` | Creation date |
| `updatedAt` | Last modification date |

---

## **Collection: `projects`**

### **Purpose**

Store agency portfolio projects.

### **Fields**

| Field | Description |
|-------|-------------|
| `_id` | Unique document ID |
| `title` | Project title |
| `slug` | URL slug |
| `client` | Client name |
| `category` | Project category |
| `description` | Project overview |
| `challenge` | Business challenge |
| `solution` | Solution provided |
| `technologies[]` | Technologies used |
| `images[]` | Project gallery |
| `featuredImage` | Primary image |
| `liveUrl` | Live website URL |
| `githubUrl` | GitHub repository |
| `completedDate` | Completion date |
| `featured` | Homepage featured status |
| `createdAt` | Creation timestamp |
| `updatedAt` | Last modification timestamp |

---

## **Collection: `testimonials`**

### **Purpose**

Store customer reviews displayed throughout the website.

### **Fields**

| Field | Description |
|-------|-------------|
| `_id` | Unique document ID |
| `clientName` | Customer name |
| `company` | Company |
| `designation` | Job title |
| `image` | Customer image |
| `review` | Testimonial |
| `rating` | Star rating |
| `isActive` | Visibility status |
| `createdAt` | Creation date |

---

## **Collection: `pricingPlans`**

### **Purpose**

Store pricing packages.

### **Fields**

| Field | Description |
|-------|-------------|
| `_id` | Unique document ID |
| `title` | Plan name |
| `price` | Package price |
| `description` | Short description |
| `features[]` | Included features |
| `popular` | Popular package flag |
| `buttonText` | CTA button text |
| `isActive` | Visibility status |
| `createdAt` | Creation date |

---

## **Collection: `settings`**

### **Purpose**

Store global website settings shared across the entire application.

### **Fields**

| Field | Description |
|-------|-------------|
| `agencyName` | Agency name |
| `logo` | Logo URL |
| `email` | Contact email |
| `phone` | Contact phone number |
| `address` | Office address |
| `googleMap` | Google Maps embed URL |
| `facebook` | Facebook URL |
| `instagram` | Instagram URL |
| `linkedin` | LinkedIn URL |
| `whatsapp` | WhatsApp URL |
| `footerText` | Footer copyright text |
| `seoTitle` | Default SEO title |
| `seoDescription` | Default SEO description |

---

# **13. API Endpoints**

The backend exposes REST APIs for both the public website and the administrator dashboard.

---

## **Authentication**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| POST | `/api/auth/login` | Administrator login |
| POST | `/api/auth/logout` | Logout administrator |
| GET | `/api/auth/profile` | Retrieve logged-in administrator profile |

---

## **Contact APIs**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/admin/contacts` | Retrieve all inquiries |
| GET | `/api/admin/contact/:id` | Retrieve single inquiry |
| PATCH | `/api/admin/contact/:id` | Update inquiry status |
| DELETE | `/api/admin/contact/:id` | Delete inquiry |

---

## **Services APIs**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | `/api/services` | Retrieve all services |
| GET | `/api/services/:slug` | Retrieve service details |
| POST | `/api/admin/services` | Create service |
| PUT | `/api/admin/services/:id` | Update service |
| DELETE | `/api/admin/services/:id` | Delete service |

---

## **Projects APIs**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | `/api/projects` | Retrieve all projects |
| GET | `/api/projects/:slug` | Retrieve project details |
| POST | `/api/admin/projects` | Create project |
| PUT | `/api/admin/projects/:id` | Update project |
| DELETE | `/api/admin/projects/:id` | Delete project |

---

## **Testimonials APIs**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | `/api/testimonials` | Retrieve testimonials |
| POST | `/api/admin/testimonials` | Create testimonial |
| PUT | `/api/admin/testimonials/:id` | Update testimonial |
| DELETE | `/api/admin/testimonials/:id` | Delete testimonial |

---

## **Pricing APIs**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | `/api/pricing` | Retrieve pricing plans |
| POST | `/api/admin/pricing` | Create pricing plan |
| PUT | `/api/admin/pricing/:id` | Update pricing plan |
| DELETE | `/api/admin/pricing/:id` | Delete pricing plan |

---

## **Settings APIs**

| Method | Endpoint | Purpose |
|---------|----------|---------|
| GET | `/api/settings` | Retrieve website settings |
| PUT | `/api/admin/settings` | Update website settings |

---

# **14. Authentication**

Only authenticated administrators can access the Admin Dashboard.

---

## **Authentication Process**

```text
Administrator Login
        │
        ▼
JWT Token Generated
        │
        ▼
Token Stored Securely
        │
        ▼
Protected Dashboard Access
        │
        ▼
Logout
        │
        ▼
Token Removed
```

---

## **Security Features**

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Unauthorized Request Handling

---

# **15. Contact Form Workflow**

```text
Visitor
   │
   ▼
Fill Contact Form
   │
   ▼
Frontend Validation
   │
   ▼
Backend API
   │
   ▼
MongoDB Database
   │
   ▼
Admin Email Notification
   │
   ▼
Dashboard Updated
   │
   ▼
Admin Contacts Client
```

The client inquiry is always stored in **MongoDB** before attempting to send an email notification. This ensures no inquiry is lost even if email delivery fails.

---

# **16. Image Upload Workflow**

## **Image Storage**

**Cloudinary**

---

## **Used For**

- Project Images
- Service Images
- Testimonial Images
- Agency Logo
- Icons

---

## **Workflow**

```text
Administrator Uploads Image
          │
          ▼
Cloudinary
          │
          ▼
Image URL Generated
          │
          ▼
MongoDB Stores URL
          │
          ▼
Frontend Displays Image
```

---

# **17. Dynamic Content Flow**

Whenever an administrator updates website content:

```text
Admin Dashboard
      │
      ▼
REST API
      │
      ▼
MongoDB Database
      │
      ▼
Frontend Fetches Latest Data
      │
      ▼
Website Updates Automatically
```

No source code modifications are required for content updates.

---

# **18. Email System**

## **Email Provider**

- Resend

**or**

- Nodemailer

---

## **Administrator Receives**

```text
New Contact Request
        │
        ▼
Client Name
        │
        ▼
Phone Number
        │
        ▼
Email Address
        │
        ▼
Selected Service
        │
        ▼
Budget
        │
        ▼
Message
```

---

## **Optional Feature**

Automatic Thank You Email

```text
Thank you for contacting ONTO DIGITAL.

We have received your inquiry and will contact you shortly.
```

---

# **19. SEO Strategy**

Every page should include:

- Unique Title
- Meta Description
- Keywords
- Open Graph Tags
- Twitter Cards
- Canonical URL
- Structured Data
- `robots.txt`
- `sitemap.xml`

The **Next.js Metadata API** should be used to generate dynamic SEO metadata.

---

# **20. Performance Optimization**

The website should follow modern optimization practices.

| Optimization Technique |
|------------------------|
| Image Optimization |
| Lazy Loading |
| Dynamic Imports |
| Code Splitting |
| Caching |
| Compression |
| Next.js Image Component |
| Font Optimization |
| Server Components |

---

## **Target Performance**

| Metric | Target |
|---------|--------|
| Google Lighthouse Performance | **90+** |
| SEO | **95+** |
| Accessibility | **95+** |
| Best Practices | **95+** |

---

# **21. Security**

## **Security Measures**

- JWT Authentication
- Password Hashing
- Input Validation
- XSS Protection
- CORS Configuration
- Environment Variables
- Secure Headers
- API Validation
- Rate Limiting

---

## **Never Expose**

- Passwords
- JWT Secret
- MongoDB URI
- Cloudinary Secret
- Email Credentials

All secrets must be stored using environment variables.

---

# **22. Deployment**

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

---

## **Environment Variables**

### **Frontend**

| Variable |
|----------|
| `NEXT_PUBLIC_API_URL` |
| `NEXT_PUBLIC_SITE_URL` |

---

### **Backend**

| Variable |
|----------|
| `MONGODB_URI` |
| `JWT_SECRET` |
| `CLOUDINARY_CLOUD_NAME` |
| `CLOUDINARY_API_KEY` |
| `CLOUDINARY_API_SECRET` |
| `RESEND_API_KEY` |

---

# **23. Admin Workflow**

```text
Administrator Login
        │
        ▼
Dashboard
        │
        ├──► Manage Services
        ├──► Manage Projects
        ├──► Manage Testimonials
        ├──► Manage Pricing
        ├──► Update Website Settings
        ▼
Website Updates Automatically
```

---

# **24. Website Visitor Workflow**

```text
Visitor Opens Website
        │
        ▼
Views Homepage
        │
        ▼
Views Services
        │
        ▼
Reads Service Details
        │
        ▼
Views Projects
        │
        ▼
Reads Project Details
        │
        ▼
Checks Pricing
        │
        ▼
Visits Contact Page
        │
        ▼
Submits Contact Form
        │
        ▼
Information Stored
        │
        ▼
Admin Receives Notification
        │
        ▼
Admin Contacts Client
```

---

# **25. Future Enhancements**

Future versions may include:

- Blog System
- Client Dashboard
- Project Tracking
- Payment Gateway
- Invoice Generator
- Newsletter
- Appointment Booking
- Live Chat
- Analytics Dashboard
- Multiple Admin Roles
- Activity Logs
- Backup System
- AI Chatbot
- CRM Integration
- Team Management

---

# **26. Development Phases**

## **Phase 1**

- UI Design
- Frontend Development
- Responsive Design
- Animations

---

## **Phase 2**

- Backend Development
- MongoDB Integration
- Authentication
- Admin Dashboard
- CRUD APIs

---

## **Phase 3**

- Email Integration
- Cloudinary Integration
- Testing
- SEO
- Performance Optimization

---

## **Phase 4**

- Deployment
- Bug Fixes
- Production Testing
- Project Launch

---

# **27. Estimated Development Timeline**

| Phase | Estimated Duration |
|--------|--------------------|
| Planning | 1–2 Days |
| UI Development | 8–10 Days |
| Backend Development | 5–7 Days |
| Admin Dashboard | 5–6 Days |
| Testing | 2–3 Days |
| Deployment | 1 Day |

---

## **Total Estimated Time**

**20–25 Working Days**

---

# **28. Final Project Workflow**

```text
Visitor
   │
   ▼
Visits Website
   │
   ▼
Views Services
   │
   ▼
Reads Service Details
   │
   ▼
Views Portfolio
   │
   ▼
Reads Project Details
   │
   ▼
Selects Pricing Plan
   │
   ▼
Submits Contact Form
   │
   ▼
Backend API
   │
   ▼
MongoDB Atlas
   │
   ▼
Email Notification Sent
   │
   ▼
Admin Dashboard Updated
   │
   ▼
Admin Contacts Client
   │
   ▼
Project Begins
   │
   ▼
Project Completed
   │
   ▼
Administrator Adds Project
   │
   ▼
Administrator Adds Testimonial
   │
   ▼
Website Updates Automatically
```

---

# **29. Project Conclusion**

ONTO DIGITAL is designed as a **modern, scalable, secure, and maintainable full-stack digital agency platform**. It combines a premium public-facing website with an integrated Content Management System (CMS), allowing administrators to manage services, projects, testimonials, pricing plans, contact inquiries, and website settings without editing the source code.

The architecture emphasizes:

- **High Performance** using Next.js.
- **Scalability** through NestJS and MongoDB Atlas.
- **Easy Content Management** with a custom-built CMS.
- **Security** using JWT authentication and bcrypt password hashing.
- **Professional Cloud Deployment** using Vercel, Render, Cloudinary, and MongoDB Atlas.

The modular architecture ensures the platform is ready for future enhancements such as blogs, client portals, online payments, CRM integration, newsletters, AI-powered assistants, booking systems, and other enterprise features without requiring major architectural changes.

---