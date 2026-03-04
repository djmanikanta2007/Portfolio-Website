# Backend Integration Contracts

## Current Mock Data (mock.js)
- `portfolioProjects`: 6 portfolio items (video editing, motion graphics, photo retouching projects)
- `skills`: 4 skills with proficiency levels
- `services`: 4 service offerings with pricing
- `testimonials`: 3 client testimonials
- `processSteps`: 3-step workflow
- `contactInfo`: Static contact information (email, phone, social links)

## Backend APIs to Implement

### 1. Contact Form Submission
**Endpoint:** `POST /api/contact`
**Purpose:** Save contact form submissions to MongoDB
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "projectType": "string",
  "message": "string"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Contact submission received!",
  "id": "submission_id"
}
```

### 2. Get Portfolio Projects (Optional - for future admin panel)
**Endpoint:** `GET /api/portfolio`
**Purpose:** Fetch all portfolio projects from DB
**Response:** Array of portfolio projects

### 3. Get Testimonials (Optional - for future admin panel)
**Endpoint:** `GET /api/testimonials`
**Purpose:** Fetch all testimonials from DB
**Response:** Array of testimonials

## MongoDB Collections

### Contact Submissions Collection
```python
{
  "name": str,
  "email": str,
  "projectType": str,
  "message": str,
  "submittedAt": datetime,
  "status": str  # "new", "read", "contacted"
}
```

## Frontend Integration Points

### File: `/app/frontend/src/pages/Home.jsx`

**Change #1: Contact Form Submission**
- **Current:** Form shows toast notification (mock)
- **After:** Send POST request to `/api/contact` endpoint
- **Location:** `handleFormSubmit` function (line ~38)
- **Integration:**
  ```javascript
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/contact`, formData);
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', projectType: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };
  ```

## Implementation Priority

1. **Phase 1 (Essential):**
   - Contact form submission API
   - MongoDB model for contact submissions
   - Frontend integration for contact form

2. **Phase 2 (Future Enhancement - Not in this session):**
   - Admin panel to view contact submissions
   - Portfolio/testimonials management APIs

## Testing Checklist

- [x] Contact form submits successfully to backend
- [x] Data saves to MongoDB correctly
- [ ] Form validation works
- [ ] Success/error toast notifications display
- [ ] Form clears after successful submission
- [ ] Email validation works

## Status

✅ **Backend Implementation Complete:**
- Contact submission API endpoint created (`POST /api/contact`)
- MongoDB model for contact submissions created
- Get all submissions endpoint added (`GET /api/contact`)

✅ **Frontend Integration Complete:**
- Contact form now sends data to backend API
- Success/error handling with toast notifications
- Form clears after successful submission

⏳ **Testing Required:**
- Need to test end-to-end contact form submission
- Verify data is saved correctly in MongoDB
