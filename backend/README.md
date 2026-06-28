# Portfolio Backend API - Frontend Integration Instructions

This document provides clear examples of how your client-side frontend should communicate with the backend API endpoints.

---

## 1. Contact Form Submission (Public)

Submit message payloads via `POST /api/contact`. Note that requests are rate-limited to **3 submissions per hour per IP address**.

```javascript
const submitContactForm = async (formData) => {
  const API_URL = 'http://localhost:5000/api/contact';
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,       // string (required)
        email: formData.email,     // string (required, must include @)
        message: formData.message  // string (required)
      })
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Success:', result.message);
      return result;
    } else {
      console.error('Error:', result.message || result.error);
      alert(`Submission failed: ${result.message}`);
    }
  } catch (err) {
    console.error('Network failure:', err.message);
  }
};
```

---

## 2. Fetch Projects List (Public)

Retrieve all uploaded project nodes via `GET /api/projects`.

```javascript
const loadProjects = async () => {
  const API_URL = 'http://localhost:5000/api/projects';
  
  try {
    const response = await fetch(API_URL);
    const projects = await response.json();
    
    // Serve screenshots using the static uploads server URL
    projects.forEach(project => {
      if (project.screenshot) {
        project.imageUrl = `http://localhost:5000${project.screenshot}`;
      }
    });

    console.log('Project nodes loaded:', projects);
    return projects;
  } catch (err) {
    console.error('Failed to load project database:', err.message);
  }
};
```

---

## 3. Upload a Project (Protected - Session Required)

Upload a project containing text fields and a screenshot image file via `POST /api/projects`. You must pass the JWT session token in the `Authorization` header as a Bearer token.

```javascript
const publishProjectNode = async (projectData, imageFile, token) => {
  const API_URL = 'http://localhost:5000/api/projects';
  
  // Use FormData to support binary file uploads and text parameters together
  const formData = new FormData();
  formData.append('title', projectData.title);
  formData.append('description', projectData.description);
  formData.append('techStack', projectData.techStack); // comma-separated string, e.g., "KiCad, C++, Python"
  formData.append('liveUrl', projectData.liveUrl || '');
  formData.append('repoUrl', projectData.repoUrl || '');
  formData.append('screenshot', imageFile);           // File object from input[type="file"]

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // JWT token retrieved during login
      },
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Project node published successfully:', result.data);
      return result;
    } else {
      console.error('Upload failed:', result.message);
    }
  } catch (err) {
    console.error('Network Error:', err.message);
  }
};
```

---

## 4. Transmit Document (Protected - Session Required)

Store document files (PDF/MD/Doc) in the documentation repository via `POST /api/documents`.

```javascript
const transmitDocumentAsset = async (docFile, token) => {
  const API_URL = 'http://localhost:5000/api/documents';
  
  const formData = new FormData();
  formData.append('document', docFile); // File object from input[type="file"]

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Document signal transmitted successfully:', result.data);
      return result;
    } else {
      console.error('Document upload failed:', result.message);
    }
  } catch (err) {
    console.error('Network Error:', err.message);
  }
};
```

---

## 5. Fetch and Download Documentation (Public)

List documents and construct download links.

- **GET /api/documents**: Returns an array of available files:

  ```json
  [
    {
      "filename": "document-12345.pdf",
      "downloadUrl": "/api/documents/document-12345.pdf"
    }
  ]
  ```

- **GET /api/documents/:filename**: Triggers direct file download.

  ```html
  <!-- Anchor link in frontend to trigger download -->
  <a href="http://localhost:5000/api/documents/document-12345.pdf" download>
    Download Document
  </a>
  ```
