const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();
const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');

// Helper function to read projects list from JSON database
const readProjects = () => {
  try {
    if (!fs.existsSync(projectsPath)) {
      return [];
    }
    const rawData = fs.readFileSync(projectsPath, 'utf8');
    return JSON.parse(rawData || '[]');
  } catch (err) {
    console.error('Error reading projects database:', err);
    return [];
  }
};

// Helper function to write projects list back to JSON database
const writeProjects = (projects) => {
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2), 'utf8');
};

// 1. GET /api/projects — public, returns all projects
router.get('/', (req, res) => {
  const projects = readProjects();
  res.json(projects);
});

// 2. POST /api/projects — protected, owner creates a new project
router.post('/', auth, upload.single('screenshot'), (req, res) => {
  try {
    const { title, tagline, description, techStack, liveUrl, repoUrl } = req.body;

    // Validate inputs
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Validation Error', message: 'Project title is required.' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ error: 'Validation Error', message: 'Project description is required.' });
    }

    let techArray = [];
    if (techStack) {
      techArray = typeof techStack === 'string' 
        ? techStack.split(',').map(tech => tech.trim()).filter(Boolean)
        : techStack;
    }

    // Capture screenshot file path
    let screenshotPath = '';
    if (req.file) {
      // Save relative path for easy serving via static asset route
      screenshotPath = `/uploads/projects/${req.file.filename}`;
    }

    const projects = readProjects();
    const newProject = {
      id: uuidv4(),
      title: title.trim(),
      tagline: tagline ? tagline.trim() : 'Project Telemetry',
      description: description.trim(),
      techStack: techArray,
      liveUrl: liveUrl ? liveUrl.trim() : '',
      repoUrl: repoUrl ? repoUrl.trim() : '',
      screenshot: screenshotPath,
      createdAt: new Date().toISOString()
    };

    projects.push(newProject);
    writeProjects(projects);

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 3. PUT /api/projects/:id — protected, edit project details
router.put('/:id', auth, upload.single('screenshot'), (req, res) => {
  try {
    const { id } = req.params;
    const { title, tagline, description, techStack, liveUrl, repoUrl } = req.body;

    const projects = readProjects();
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      // Cleanup uploaded file if project was not found
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Not Found', message: `Project with ID ${id} not found.` });
    }

    const targetProject = projects[projectIndex];

    // Process techStack parameter
    let techArray = targetProject.techStack;
    if (techStack) {
      techArray = typeof techStack === 'string'
        ? techStack.split(',').map(tech => tech.trim()).filter(Boolean)
        : techStack;
    }

    // Process screenshot file if a new file is uploaded
    let screenshotPath = targetProject.screenshot;
    if (req.file) {
      // Delete old file if it exists
      if (targetProject.screenshot) {
        const oldFilePath = path.join(__dirname, '..', targetProject.screenshot);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      screenshotPath = `/uploads/projects/${req.file.filename}`;
    }

    const updatedProject = {
      ...targetProject,
      title: title !== undefined ? title.trim() : targetProject.title,
      tagline: tagline !== undefined ? tagline.trim() : targetProject.tagline,
      description: description !== undefined ? description.trim() : targetProject.description,
      techStack: techArray,
      liveUrl: liveUrl !== undefined ? liveUrl.trim() : targetProject.liveUrl,
      repoUrl: repoUrl !== undefined ? repoUrl.trim() : targetProject.repoUrl,
      screenshot: screenshotPath,
      updatedAt: new Date().toISOString()
    };

    projects[projectIndex] = updatedProject;
    writeProjects(projects);

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: updatedProject
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 4. DELETE /api/projects/:id — protected, delete project and its image
router.delete('/:id', auth, (req, res) => {
  try {
    const { id } = req.params;
    const projects = readProjects();
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: `Project with ID ${id} not found.` });
    }

    const targetProject = projects[projectIndex];

    // Delete screenshot from disk
    if (targetProject.screenshot) {
      const filePath = path.join(__dirname, '..', targetProject.screenshot);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Remove from array and save
    projects.splice(projectIndex, 1);
    writeProjects(projects);

    res.json({
      success: true,
      message: 'Project and associated screenshot asset deleted successfully.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 5. GET /api/projects/:id — public, returns a single project by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const projects = readProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
      return res.status(404).json({ error: 'Not Found', message: `Project with ID ${id} not found.` });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 6. POST /api/projects/:id/documents — protected, attach a document to a project
router.post('/:id/documents', auth, upload.single('document'), (req, res) => {
  try {
    const { id } = req.params;
    const { label } = req.body;
    const projects = readProjects();
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Not Found', message: `Project with ID ${id} not found.` });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Validation Error', message: 'No document file provided.' });
    }

    const docEntry = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      label: label || req.file.originalname,
      downloadUrl: `/uploads/documents/${req.file.filename}`,
      uploadedAt: new Date().toISOString()
    };

    if (!projects[projectIndex].documents) {
      projects[projectIndex].documents = [];
    }
    projects[projectIndex].documents.push(docEntry);
    writeProjects(projects);

    res.status(201).json({
      success: true,
      message: 'Document attached to project successfully.',
      data: docEntry
    });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

// 7. DELETE /api/projects/:id/documents/:filename — protected, detach a document from a project
router.delete('/:id/documents/:filename', auth, (req, res) => {
  try {
    const { id, filename } = req.params;
    const projects = readProjects();
    const projectIndex = projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: `Project not found.` });
    }

    const docs = projects[projectIndex].documents || [];
    const safeFilename = path.basename(filename);
    const docIndex = docs.findIndex(d => d.filename === safeFilename);

    if (docIndex === -1) {
      return res.status(404).json({ error: 'Not Found', message: `Document not found.` });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '..', 'uploads', 'documents', safeFilename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    projects[projectIndex].documents.splice(docIndex, 1);
    writeProjects(projects);

    res.json({ success: true, message: 'Document detached and deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error', message: err.message });
  }
});

module.exports = router;
