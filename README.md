# Cloud Usage Billing Engine

## Overview

A cloud-inspired usage metering and billing system that simulates object storage services like AWS S3.

This project tracks:
- Object uploads and deletions
- API usage (PUT, GET, DELETE, LIST)
- Daily aggregation of requests
- Monthly invoice generation
- API key–based multi-tenant authentication

---

## Architecture

Client (Next.js Frontend)
        ↓
API Key Authentication
        ↓
Node.js Backend (Express)
        ↓
PostgreSQL Database
        ↓
Billing Engine

---

## Tech Stack

### Backend
- Node.js (ES Modules)
- Express.js
- PostgreSQL

### Frontend
- Next.js

---

## Features

- API Key Authentication
- Object metadata simulation
- Usage metering
- Daily aggregation (UPSERT)
- Monthly billing engine
- Invoice generation
- Dashboard UI

---

## Future Enhancements

- Dockerization
- Deployment
- Duration-based storage billing
- Improved UI
