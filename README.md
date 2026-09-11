# SAHYOG (सहयोग) — Cooperative Digital Services Platform

> **“Trusted Services. Fair Work. Stronger Cooperatives.”**  
> *Smart India Hackathon (SIH) 2026 Final Evaluation Project*

---

## 📌 Executive Summary

**SAHYOG** is a production-grade, democratic digital cooperative service marketplace built for Labour Cooperative Federations, Labour Cooperative Societies, and informal gig workers across India. 

Unlike private commercial aggregators that extract 30–35% in commissions and use opaque algorithms that cause worker burnout, **Sahyog** channels **80% directly into worker wages**, automatically allocates **5% to worker health and accident welfare**, and utilizes an **ethical, anti-exhaustion matching algorithm** that distributes work fairly across verified cooperative members.

---

## 🌟 Key Features & Innovations

### 1. 🌐 True Multilingual & Voice-Enabled Interface
* Fully interactive localized experience in **English**, **हिन्दी (Hindi)**, and **मराठी (Marathi)**.
* **AI Speech Engine Simulator**: Citizens and elderly users who cannot type technical terms can speak their issue in everyday language; the engine transcribes and converts local dialect descriptions into formal cooperative service tickets.

### 2. ⚖️ Ethical Anti-Exhaustion Matching Engine
* Conventional gig apps reward only the top 5% of workers ("winner-takes-all"), causing extreme fatigue while starving others of income.
* Sahyog’s **Cooperative Fairness Algorithm** balances:
  * Proximity & Geofencing (15–20 min response)
  * Skill certifications & background verification
  * **Daily Workload Equity** (prevents overbooking any single worker and ensures shared livelihood across all society members)

### 3. 🛡️ Digital Skill Passport & Welfare Shield
* Every certified technician receives a tamper-proof **Skill Passport** showing:
  * Verified Government / NSDC / Cooperative federation credentials
  * Real-time customer ratings & completed jobs
  * Active ₹5 Lakh accident insurance & health cover status
  * Society membership and democratic dividend credits

### 4. 🚨 24/7 Rapid Emergency SOS Dispatch
* Instant beacon for critical emergencies: burst water pipes, sparking circuit breakers, gas leaks, and door lock failures.
* Bypasses standard scheduling queues to lock closest on-duty specialists within a guaranteed **15–20 minute arrival window**.
* Live GPS tracking with real-time ETA updates.

### 5. 💰 80/5/10/5 Transparent Cooperative Escrow
* **80%** — Direct technician wage (settled instantaneously upon completion).
* **5%** — Cooperative Welfare & Medical Reserve Fund.
* **10%** — Society operations, tool pooling, and local administration.
* **5%** — Digital infrastructure maintenance & federated contingency.
* Zero private venture capital extraction or hidden deductions.

### 6. 📊 Federation Command & AI Demand Forecasting
* Complete **Federation Admin Portal** offering:
  * Predictive demand forecasting across municipal wards
  * Real-time society worker utilization graphs
  * Escrow reconciliation & automated tax invoice generator
  * Dispute resolution & customer grievance audit trail

---

## 📱 User Portals & Demo Workflows

The platform includes dedicated portals for all primary stakeholders:

| Portal | URL Route | Target Audience | Key Capabilities |
|---|---|---|---|
| **Public Marketplace** | `/` | Households & Institutions | AI problem description, 12+ categories, rate card transparency, multilingual toggle |
| **11-Step Booking** | `/customer/book` | Citizens & Patrons | Problem triage, slot selection, AI worker match, escrow payment, live order tracking |
| **Emergency SOS** | `/emergency` | Urgent Situations | 1-tap rapid dispatch beacon, nearest certified on-duty specialists |
| **Customer Portal** | `/customer/dashboard` | Registered Customers | Active booking status, history, patron reward points, invoice downloads |
| **Worker Dashboard** | `/worker/dashboard` | Cooperative Technicians | Duty toggle (online/offline), job queue, Skill Passport, earnings ledger |
| **Federation Admin** | `/admin/dashboard` | Society & Federation Admins | Ward metrics, AI demand forecasting, worker approvals, grievance management |

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 19 + TypeScript
* **Build System**: Vite 6
* **Styling**: Tailwind CSS with customized cooperative palette (Teal `#0f766e`, Emerald `#059669`)
* **Design & Icons**: Lucide React icons (strictly zero unicode emojis for professional SIH evaluation standards)
* **Typography**: Plus Jakarta Sans & Outfit (Google Fonts)
* **Deployment Support**: Vercel & Render configuration (`vercel.json`, `render.yaml`)

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harshad5009/sahyog-cooperative.git
   cd sahyog-cooperative
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to: `http://localhost:5173`

4. **Production Build & Verification:**
   ```bash
   npm run build
   ```
   The compiled, minified bundle will be generated in the `dist/` directory with 0 TypeScript errors.

---

## 📂 Project Structure

```text
sahyog-app/
├── public/                     # Static assets & icons
├── src/
│   ├── components/
│   │   ├── booking/            # 11-step interactive booking wizard & escrow
│   │   ├── common/             # Badges, stat cards, language switcher
│   │   ├── home/               # Hero, AI classifier, Fair Allocation, ServiceGrid
│   │   ├── layout/             # Navbar, Footer, WorkerLayout, CustomerLayout
│   │   └── worker/             # Skill Passport card & welfare indicators
│   ├── context/
│   │   ├── BookingContext.tsx  # Global booking state & dispatch pipeline
│   │   └── LanguageContext.tsx # Dynamic EN / HI / MR localization engine
│   ├── data/
│   │   ├── mockServices.ts     # 12+ standard cooperative service categories
│   │   ├── mockTranslations.ts # Multilingual dictionary (EN, HI, MR)
│   │   └── mockWorkers.ts      # Certified cooperative technician records
│   ├── pages/
│   │   ├── admin/              # Federation analytics, demand forecast & ledger
│   │   ├── customer/           # Customer portal & active bookings
│   │   ├── public/             # Landing, Services, How-It-Works, Workers, About
│   │   └── worker/             # Worker duty status, passport & earnings
│   ├── types/                  # TypeScript domain models
│   ├── App.tsx                 # Route declarations & layout wrappers
│   └── main.tsx                # React root mount
├── tailwind.config.js          # Extended cooperative color tokens
├── SIH_PS89_PRESENTATION_DECK.md # Official SIH Presentation Slide Deck
└── package.json
```

---

## 🏆 Smart India Hackathon (SIH 2026) Alignment

* **Problem Statement**: PS-89 — Digital Cooperative Marketplace & Labour Federation Empowerment
* **Ministry / Department**: Ministry of Cooperation / Ministry of Labour & Employment
* **Core Philosophy**: Strengthening formal labour cooperative societies through self-sustaining technology, eradicating gig exploitation, and providing institutional dignity of labour.

---

## 📄 License & Intellectual Property

Developed for the **Smart India Hackathon 2026**.  
© 2026 Sahyog Labour Cooperative Societies Federation. All rights reserved.
