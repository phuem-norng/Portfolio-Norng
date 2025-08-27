// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (filterButtons.length && projectsGrid) {
        // Load projects from JSON file
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                renderProjects(projects);
                
                // Add event listeners to filter buttons
                filterButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Update active button
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        
                        // Filter projects
                        const filter = button.getAttribute('data-filter');
                        filterProjects(filter, projects);
                    });
                });
            })
            .catch(error => console.error('Error loading projects:', error));
    }
    
    // Project modal functionality
    const projectModal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (projectModal && modalClose) {
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Function to render projects
    function renderProjects(projects) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.filter}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <button class="project-overlay-btn view-project" data-project-id="${project.id}" aria-label="View ${project.title} details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <a href="${project.liveLink}" class="project-overlay-btn" aria-label="Visit ${project.title} live site" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-category">${project.category}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="project-link view-project" data-project-id="${project.id}">View Case Study <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to view project buttons
        document.querySelectorAll('.view-project').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project-id');
                openProjectModal(projectId, projects);
            });
        });
    }
    
    // Function to filter projects
    function filterProjects(filter, projects) {
        if (filter === 'all') {
            renderProjects(projects);
        } else {
            const filteredProjects = projects.filter(project => project.filter === filter);
            renderProjects(filteredProjects);
        }
    }
    
    // Function to open project modal
    function openProjectModal(projectId, projects) {
        const project = projects.find(p => p.id == projectId);
        if (!project) return;
        
        // Populate modal with project data
        document.getElementById('modal-img').src = project.image;
        document.getElementById('modal-img').alt = project.title;
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-category').textContent = project.category;
        document.getElementById('modal-description').textContent = project.description;
        
        // Populate technologies list
        const techList = document.getElementById('modal-tech-list');
        techList.innerHTML = project.tags.map(tag => `<li class="modal-tech-item">${tag}</li>`).join('');
        
        // Set links
        document.getElementById('modal-live-link').href = project.liveLink;
        document.getElementById('modal-code-link').href = project.caseStudyLink;
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set focus to modal for accessibility
        setTimeout(() => {
            document.getElementById('modal-close').focus();
        }, 100);
    }
});